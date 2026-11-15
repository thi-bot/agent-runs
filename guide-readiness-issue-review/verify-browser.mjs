import { chromium } from '/home/thibaudcolas/dev/agentic-web-check/node_modules/playwright/index.mjs';
import AxeBuilder from '/home/thibaudcolas/dev/agentic-web-check/node_modules/@axe-core/playwright/dist/index.mjs';
import { writeFile } from 'node:fs/promises';
const dir = '/home/thibaudcolas/dev/agent-runs/guide-readiness-issue-review';
const browser = await chromium.launch({headless:true});
const context = await browser.newContext({viewport:{width:1280,height:900}});
const page = await context.newPage();
const result = {date:new Date().toISOString(), browser:browser.version(), target:'https://guide.wagtail.org/en/'};
try {
  const response = await page.goto(result.target,{waitUntil:'networkidle'});
  result.httpStatus = response.status();
  result.initialSnapshot = await page.locator('body').ariaSnapshot();
  result.desktop = await page.evaluate(() => ({
    navs:[...document.querySelectorAll('nav')].map(e=>({class:e.className,label:e.getAttribute('aria-label'),labelledby:e.getAttribute('aria-labelledby'),visible:!!e.getClientRects().length,display:getComputedStyle(e).display})),
    newWindowLinks:[...document.querySelectorAll('a[target="_blank"]')].map(e=>({text:e.textContent.trim(),href:e.href,ariaLabel:e.getAttribute('aria-label'),title:e.title,visible:!!e.getClientRects().length})),
    themeLabels:[...document.querySelectorAll('.theme-toggle__label')].map(e=>({text:e.textContent,role:e.getAttribute('role'),cursor:getComputedStyle(e).cursor,onclick:!!e.onclick})),
  }));
  result.axe = await new AxeBuilder({page}).withRules(['landmark-unique','landmark-one-main','region','button-name','link-name']).analyze();
  const search = page.getByRole('button',{name:'Toggle the search form'});
  await search.focus(); await page.keyboard.press('Enter');
  await page.locator('#search-modal').waitFor({state:'visible'});
  result.search = {openedWithKeyboard:true,snapshot:await page.locator('#search-modal').ariaSnapshot()};
  await page.getByLabel('Search',{exact:true}).fill('images');
  await page.keyboard.press('Enter');
  await page.waitForURL(/search/);
  result.search.resultUrl=page.url();
  result.search.resultTitle=await page.title();
  await page.goto(result.target,{waitUntil:'networkidle'});
  const toggle = page.locator('.page-tools').getByRole('button',{name:'Toggle options'});
  await toggle.focus(); await page.keyboard.press('Enter');
  result.copyMenu = {openedWithKeyboard:await toggle.getAttribute('aria-expanded'),visibleLinks:await page.locator('.page-tools .dropdown-menu a:visible').allTextContents()};
  await page.keyboard.press('ArrowDown');
  result.copyMenu.keyboardFocus = await page.evaluate(()=>({tag:document.activeElement.tagName,text:document.activeElement.textContent.trim()}));
  await page.screenshot({path:dir+'/copy-menu.png',fullPage:false});
  await page.setViewportSize({width:390,height:844});
  await page.goto(result.target,{waitUntil:'networkidle'});
  result.mobileSnapshot=await page.locator('body').ariaSnapshot();
  result.mobileNav=await page.locator('.primary-nav').evaluate(e=>({display:getComputedStyle(e).display,classes:e.className}));
} catch(error) {result.error=String(error.stack||error);}
finally {await writeFile(dir+'/browser-verification.json',JSON.stringify(result,null,2)); await browser.close();}
console.log(JSON.stringify({...result,initialSnapshot:undefined,mobileSnapshot:undefined,axe:result.axe?{violations:result.axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))}:undefined},null,2));
