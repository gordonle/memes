const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const delay = time => new Promise(resolve => { 
  setTimeout(resolve, time)
});

async function yeet() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://festify.us/party/-L_bwk5fe6ArgA_18f9J');

  // add script
  await page.addScriptTag({ 
    path: path.join(
      __dirname, 
      'node_modules/query-selector-shadow-dom/dist/querySelectorShadowDom.js'
    ) 
  });

  await delay(4000);  

  const b = await page.evaluate(function() {
    const stuff = querySelectorShadowDom.querySelectorDeep(`party-track div.icon-wrapper paper-icon-button[title="Vote for The Climb"]`);
    return stuff.click()
  });

  await browser.close();
}

yeet();
