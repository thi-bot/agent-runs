import fs from 'node:fs';
import { chromium } from '/home/thibaudcolas/dev/accessibility-agents/mcp-server/node_modules/playwright/index.mjs';
const root='/home/thibaudcolas/dev/guide/.a11y-history/2026-10-06-production';
const axePath='/home/thibaudcolas/dev/accessibility-agents/mcp-server/node_modules/axe-core/axe.min.js';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const context=await browser.newContext({bypassCSP:true,viewport:{width:1440,height:1000},colorScheme:'light'});
const sitemap=await (await fetch('https://guide.wagtail.org/sitemap.xml')).text();
const queue=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
const seen=new Set(), results=[];
function allowed(u){return u.origin==='https://guide.wagtail.org'&&!/^\/(admin|api|documents|media|static|search_json|jsi18n)\//.test(u.pathname)&&!u.pathname.endsWith('/markdown/')&&!u.pathname.match(/\.(pdf|png|jpg|svg|zip|json|txt|xml|webp|mp4)$/i)&& !u.search;}
while(queue.length){
 const url=queue.shift();if(seen.has(url))continue;seen.add(url);
 const page=await context.newPage();
 try{
  const response=await page.goto(url,{waitUntil:'networkidle',timeout:45000});
  const data=await page.evaluate(()=>({url:location.href,title:document.title,lang:document.documentElement.lang,status:null,headings:[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(e=>({tag:e.tagName,text:e.textContent.trim(),id:e.id})),landmarks:[...document.querySelectorAll('main,nav,header,footer,aside,[role="region"],[role="search"]')].map(e=>({tag:e.tagName,role:e.getAttribute('role'),label:e.getAttribute('aria-label')})),images:[...document.images].map(e=>({src:e.src,alt:e.getAttribute('alt'),width:e.naturalWidth,height:e.naturalHeight})),links:[...document.querySelectorAll('a[href]')].map(e=>({href:e.href,text:e.textContent.trim(),label:e.getAttribute('aria-label'),target:e.target})),tables:[...document.querySelectorAll('table')].map(e=>e.outerHTML),media:[...document.querySelectorAll('video,audio,iframe')].map(e=>e.outerHTML),forms:[...document.forms].map(e=>e.outerHTML),meta:{viewport:document.querySelector('meta[name="viewport"]')?.content,description:document.querySelector('meta[name="description"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.href,skip:!!document.querySelector('a[href="#main"]'),main:!!document.querySelector('main')},bodyText:document.body.innerText}));
  data.status=response.status();
  fs.writeFileSync(`${root}/raw/page-${results.length}.html`,await page.content());
  await page.addScriptTag({path:axePath});
  data.axe=await page.evaluate(async()=>await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}}));
  results.push(data);fs.writeFileSync(`${root}/raw/crawl.json`,JSON.stringify(results,null,2));
  for(const l of data.links){const u=new URL(l.href);u.hash='';if(allowed(u)&&!seen.has(u.href)&&!queue.includes(u.href))queue.push(u.href);}
  console.log(JSON.stringify({done:results.length,pending:queue.length,url:data.url,status:data.status,violations:data.axe.violations.map(v=>({id:v.id,n:v.nodes.length}))}));
 }catch(e){results.push({url,error:String(e)});fs.writeFileSync(`${root}/raw/crawl.json`,JSON.stringify(results,null,2));console.log(JSON.stringify({url,error:String(e)}));}
 await page.close();
 if(seen.size>1000){console.log('SAFETY LIMIT 1000');break;}
}
fs.writeFileSync(`${root}/raw/crawl-summary.json`,JSON.stringify({discovered:[...seen],queued:queue,count:results.length,browser:browser.version(),axeVersion:results.find(r=>r.axe)?.axe.testEngine.version},null,2));
await browser.close();
