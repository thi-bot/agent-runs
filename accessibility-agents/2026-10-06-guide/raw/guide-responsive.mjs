import fs from 'node:fs';
import {chromium} from '/home/thibaudcolas/dev/accessibility-agents/mcp-server/node_modules/playwright/index.mjs';
const root='/home/thibaudcolas/dev/guide/.a11y-history/2026-10-06-production/raw';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const results=[];const claimed=new Set();
async function worker(){const c=await browser.newContext({bypassCSP:true});const p=await c.newPage();while(true){let crawl;try{crawl=JSON.parse(fs.readFileSync(`${root}/crawl.json`));}catch{await new Promise(r=>setTimeout(r,2000));continue;}
 const next=crawl.find(r=>r.status===200&&!claimed.has(r.url));if(!next){if(fs.existsSync(`${root}/crawl-summary.json`))break;await new Promise(r=>setTimeout(r,2000));continue;}claimed.add(next.url);
 try{await p.setViewportSize({width:1440,height:1000});await p.emulateMedia({colorScheme:'dark'});await p.goto(next.url,{waitUntil:'networkidle',timeout:45000});await p.evaluate(()=>{localStorage.removeItem('theme');});await p.reload({waitUntil:'networkidle'});await p.addScriptTag({path:'/home/thibaudcolas/dev/accessibility-agents/mcp-server/node_modules/axe-core/axe.min.js'});
 const dark=await p.evaluate(async()=>({theme:document.documentElement.outerHTML.slice(0,200),axe:await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}})}));
 await p.emulateMedia({colorScheme:'light'});await p.setViewportSize({width:320,height:800});await p.reload({waitUntil:'networkidle'});
 const mobile=await p.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left< -1)}).slice(0,12).map(e=>({tag:e.tagName,class:e.className,text:e.textContent.slice(0,100),rect:e.getBoundingClientRect().toJSON()})),smallControls:[...document.querySelectorAll('button,input,select,textarea')].map(e=>({tag:e.tagName,cls:e.className,label:e.getAttribute('aria-label')||e.textContent.trim(),r:e.getBoundingClientRect().toJSON()})).filter(e=>e.r.width>0&&e.r.height>0&&(e.r.width<24||e.r.height<24))}));
 await p.addScriptTag({path:'/home/thibaudcolas/dev/accessibility-agents/mcp-server/node_modules/axe-core/axe.min.js'});mobile.axe=await p.evaluate(async()=>await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}}));
 await p.addStyleTag({content:'*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}'});const spacing=await p.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth}));
 results.push({url:next.url,dark,mobile,spacing});fs.writeFileSync(`${root}/responsive.json`,JSON.stringify(results,null,2));console.log(JSON.stringify({done:results.length,url:next.url,dark:dark.axe.violations.map(v=>({id:v.id,n:v.nodes.length})),mobile:mobile.axe.violations.map(v=>({id:v.id,n:v.nodes.length})),overflow:mobile.scrollWidth,spacing:spacing.scrollWidth}));
 }catch(e){results.push({url:next.url,error:String(e)});fs.writeFileSync(`${root}/responsive.json`,JSON.stringify(results,null,2));console.log(String(e));}
 }await c.close();}
await Promise.all([worker(),worker()]);await browser.close();
