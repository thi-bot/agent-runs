import json,pathlib,urllib.request,urllib.error,concurrent.futures
out=pathlib.Path(__file__).parent/'http'
urls={'home':'https://guide.wagtail.org/en/','markdown':'https://guide.wagtail.org/en/markdown/','catalog':'https://guide.wagtail.org/.well-known/ai-catalog.json','api-catalog':'https://guide.wagtail.org/.well-known/api-catalog','openapi':'https://guide.wagtail.org/api/v3-preview/openapi.json'}
def get(item):
 name,url=item
 try:
  r=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'GuideReadinessReview/1.0'}),timeout=30)
 except urllib.error.HTTPError as e:r=e
 body=r.read();(out/(name+'.body')).write_bytes(body)
 meta={'url':url,'final_url':r.url,'status':r.status,'headers':dict(r.headers)};(out/(name+'.json')).write_text(json.dumps(meta,indent=2));return name,meta,len(body)
for row in concurrent.futures.ThreadPoolExecutor().map(get,urls.items()):print(row)
