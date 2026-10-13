const fs=require('fs');
const {chromium}=require('playwright');
const axePath=require.resolve('axe-core/axe.min.js');
const root='/home/thibaudcolas/dev/djangoproject.com/.a11y-history/20261002T185438Z';
const delay=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const manifest=JSON.parse(fs.readFileSync(root+'/crawl-manifest.json'));
 fs.mkdirSync(root+'/evidence/axe',{recursive:true});
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},colorScheme:'light'});
 const page=await context.newPage();
 const summaries=[];
 for(let i=0;i<manifest.pages.length;i++){
  const item=manifest.pages[i],url=item.final;
  const file=root+'/evidence/axe/page-'+String(i+1).padStart(3,'0')+'.json';
  if(fs.existsSync(file)){ const old=JSON.parse(fs.readFileSync(file));summaries.push(old.summary);continue; }
  try{
   let response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
   if(response.status()===429){await delay(15000);response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});}
   if(response.status()!==200)throw new Error('HTTP '+response.status());
   if(new URL(page.url()).hostname!=='www.djangoproject.com')throw new Error('Off-host redirect');
   await page.waitForTimeout(500);
   await page.addScriptTag({path:axePath});
   const result=await page.evaluate(async()=>await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}}));
   const metadata=await page.evaluate(()=>({title:document.title,lang:document.documentElement.lang,viewport:document.querySelector('meta[name=viewport]')?.content,main:!!document.querySelector('main,[role=main]'),skip:!!document.querySelector('a[href="#main-content"]'),theme:document.documentElement.dataset.theme,h1:[...document.querySelectorAll('h1')].map(e=>e.innerText),forms:[...document.forms].map(f=>({action:f.action,method:f.method})),interactive:document.querySelectorAll('a[href],button,input,select,textarea,[tabindex]').length}));
   const summary={url,status:200,metadata,violations:result.violations.length,instances:result.violations.reduce((n,v)=>n+v.nodes.length,0),rules:result.violations.map(v=>({id:v.id,impact:v.impact,count:v.nodes.length})),passes:result.passes.length,incomplete:result.incomplete.length};
   fs.writeFileSync(file,JSON.stringify({summary,result},null,2));summaries.push(summary);
   console.log(`${i+1}/${manifest.pages.length}: ${summary.violations} failed rules, ${summary.instances} instances ${url}`);
  }catch(e){summaries.push({url,error:String(e)});console.log('ERROR '+url+' '+e);}
  fs.writeFileSync(root+'/runtime-summary.json',JSON.stringify({browser:'Chromium 152.0.7977.82',playwright:require('playwright/package.json').version,axe:require('axe-core/package.json').version,tags:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa'],viewport:'1440x1000',colorScheme:'light',pages:summaries},null,2));
  await delay(1200);
 }
 await browser.close();
})();
