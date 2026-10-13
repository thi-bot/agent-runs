import concurrent.futures, json, pathlib, re, time, urllib.request, urllib.parse
from html.parser import HTMLParser
ROOT = pathlib.Path('/home/thibaudcolas/dev/djangoproject.com/.a11y-history/20261002T185438Z')
START = 'https://www.djangoproject.com/'
class Links(HTMLParser):
    def __init__(self): super().__init__(); self.links=[]
    def handle_starttag(self, tag, attrs):
        if tag=='a':
            href=dict(attrs).get('href')
            if href: self.links.append(href)
def normalize(href, base):
    url=urllib.parse.urlsplit(urllib.parse.urljoin(base,href))
    if url.scheme not in ('http','https') or url.hostname!='www.djangoproject.com': return None
    if re.search(r'\.(pdf|zip|gz|bz2|xz|png|jpg|jpeg|svg|gif|ico|eps|rss|xml|txt|whl)$',url.path,re.I): return None
    if re.search(r'^/(admin|checklists)(/|$)|logout|delete|cancel|unsubscribe|activate|reset/confirm',url.path,re.I): return None
    if url.query: return None
    return urllib.parse.urlunsplit(('https','www.djangoproject.com',url.path or '/','',''))
def fetch(pair):
    url, depth=pair
    try:
        req=urllib.request.Request(url,headers={'User-Agent':'DjangoAccessibilityAudit/1.0 (read-only; bounded 100-page audit)'})
        with urllib.request.urlopen(req,timeout=25) as r:
            if 'text/html' not in r.headers.get('Content-Type',''): return {'url':url,'depth':depth,'skip':'non-HTML'}
            body=r.read().decode('utf-8','replace'); final=r.url
            if urllib.parse.urlsplit(final).hostname!='www.djangoproject.com': return {'url':url,'depth':depth,'skip':'off-host redirect','final':final}
            return {'url':url,'depth':depth,'final':final,'status':r.status,'html':body}
    except Exception as e: return {'url':url,'depth':depth,'error':str(e)}
pending={START:0}; seen=set(); pages=[]; skipped=[]; family_count={}
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
    while pending and len(pages)<100:
        def priority(url):
            parts=urllib.parse.urlsplit(url).path.strip('/').split('/')
            family=parts[0]
            return (pending[url], family_count.get(family,0), len(parts),url)
        batch=sorted(pending,key=priority)[:min(3,100-len(pages))]
        pairs=[(u,pending.pop(u)) for u in batch]; seen.update(batch)
        for result in pool.map(fetch,pairs):
            if 'html' not in result: skipped.append(result); continue
            final=normalize(result['final'],START)
            if not final or any(p['final']==final for p in pages): skipped.append({**{k:v for k,v in result.items() if k!='html'},'skip':'duplicate canonical URL'});continue
            index=len(pages)+1; body=result.pop('html'); result['file']=f'evidence/page-{index:03}.html'
            (ROOT/result['file']).write_text(body); pages.append(result)
            family=urllib.parse.urlsplit(final).path.strip('/').split('/')[0]; family_count[family]=family_count.get(family,0)+1
            parser=Links();parser.feed(body)
            for link in parser.links:
                nxt=normalize(link,final)
                if nxt and nxt not in seen and nxt not in pending: pending[nxt]=result['depth']+1
        (ROOT/'crawl-manifest.json').write_text(json.dumps({'start':START,'maxPages':100,'pages':pages,'skipped':skipped,'remaining':len(pending),'families':family_count},indent=2))
        print(f'Crawled {len(pages)}/100 HTML pages; {len(pending)} queued',flush=True); time.sleep(.2)
print(json.dumps({'pages':len(pages),'families':family_count,'skipped':len(skipped)}))
