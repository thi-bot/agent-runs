import fs from 'node:fs';
import {chromium} from '/home/thibaudcolas/dev/accessibility-agents/mcp-server/node_modules/playwright/index.mjs';
const root='/home/thibaudcolas/dev/guide/.a11y-history/2026-10-06-production/raw';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const ctx=await browser.newContext({bypassCSP:true,viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']});
const p=await ctx.newPage();const rows=[];
async function capture(name){await p.addScriptTag({path:'/home/thibaudcolas/dev/accessibility-agents/mcp-server/node_modules/axe-core/axe.min.js'});let r=await p.evaluate(async()=>({url:location.href,title:document.title,lang:document.documentElement.lang,focus:document.activeElement.outerHTML,live:[...document.querySelectorAll('[aria-live],[role="status"],[role="alert"]')].map(e=>e.outerHTML),modal:document.querySelector('#search-modal')?.outerHTML,axe:await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}})}));rows.push({name,...r});fs.writeFileSync(`${root}/states.json`,JSON.stringify(rows,null,2));fs.writeFileSync(`${root}/state-${name}.html`,await p.content());console.log(JSON.stringify({name,url:r.url,lang:r.lang,violations:r.axe.violations.map(v=>({id:v.id,n:v.nodes.length}))}));}
for(const u of ['https://guide.wagtail.org/en/search/','https://guide.wagtail.org/en/search/?query=pages','https://guide.wagtail.org/en/search/?query=a11yzzzzunknown','https://guide.wagtail.org/en/a11y-audit-nonexistent-page/']){const r=await p.goto(u,{waitUntil:'networkidle'});await capture(u.includes('nonexistent')?'404':u.includes('unknown')?'search-empty':u.includes('?')?'search-results':'search-blank');}
await p.goto('https://guide.wagtail.org/en/how-to-guides/manage-pages/',{waitUntil:'networkidle'});
await p.locator('[data-search-icon-button]').click();await p.waitForTimeout(500);await capture('modal-open');
await p.locator('[data-search-input]').fill('page');await p.locator('[data-search-input]').press('s');await p.waitForTimeout(3000);await capture('modal-results');
await p.locator('[data-search-input]').fill('a11yzzzzunknown');await p.locator('[data-search-input]').press('n');await p.waitForTimeout(1500);await capture('modal-empty');
await p.keyboard.press('Escape');await p.waitForTimeout(500);
await p.locator('[data-copy-page]').click();await p.waitForTimeout(400);await capture('copy-success');
await p.locator('.copy-button__toggle').click();await p.locator('[data-copy-link]').click();await p.waitForTimeout(300);await capture('copy-link-success');
await p.route('**/*',async route=>{if(route.request().method()==='POST'){await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({pk:999999})});}else await route.continue();});
await p.locator('[data-happy-button]').focus();await p.keyboard.press('Enter');await p.waitForTimeout(500);await capture('feedback-mocked-open');
await p.locator('[data-feedback-text]').fill('Audit mock only: never sent to server');await p.locator('[data-submit-button]').focus();await p.keyboard.press('Enter');await p.waitForTimeout(500);await capture('feedback-mocked-submitted');
await browser.close();
