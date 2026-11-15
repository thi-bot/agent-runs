import { chromium } from '/home/thibaudcolas/dev/agentic-web-check/node_modules/playwright/index.mjs';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch();
const page=await browser.newPage({viewport:{width:390,height:844}});
try {
 await page.goto('https://guide.wagtail.org/en/',{waitUntil:'networkidle'});
 const menu=page.getByRole('button',{name:'Mobile menu toggle'});
 await menu.focus(); await page.keyboard.press('Enter');
 const toggle=page.locator('.primary-nav').getByRole('button',{name:'Toggle options'});
 await toggle.focus(); await page.keyboard.press('Enter');
 const result={date:new Date().toISOString(),page:page.url(),mobileNavDisplay:await page.locator('.primary-nav').evaluate(e=>getComputedStyle(e).display),menuExpanded:await toggle.getAttribute('aria-expanded'),markdownLink:await page.locator('.primary-nav').getByRole('link',{name:'View page Markdown'}).getAttribute('href'),headAlternate:await page.locator('head link[rel="alternate"][type^="text/markdown"]').getAttribute('href'),snapshot:await page.locator('.primary-nav__tools').ariaSnapshot()};
 await page.screenshot({path:'/home/thibaudcolas/dev/agent-runs/guide-readiness-issue-review/mobile-copy-menu.png'});
 await writeFile('/home/thibaudcolas/dev/agent-runs/guide-readiness-issue-review/mobile-verification.json',JSON.stringify(result,null,2));
 console.log(JSON.stringify(result,null,2));
} finally {await browser.close();}
