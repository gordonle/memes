const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const delay = time => new Promise(resolve => { 
  setTimeout(resolve, time)
});

async function yeet(songName) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://festify.us/party/-L_bwk5fe6ArgA_18f9J');

  // add script
  await page.addScriptTag({ 
    path: path.join(
      __dirname, 
      'node_modules/query-selector-shadow-dom/dist/querySelectorShadowDom.js'
    ) 
  });

  await delay(2000);  

  const b = await page.evaluate(function() {
    const stuff = Array.from(querySelectorShadowDom.querySelectorAllDeep('party-track div.icon-wrapper paper-icon-button'));
    return stuff.map(thing => {
      if (thing.title === `Vote for Despacito`) {
        thing.click(); 
      }
    })
  });

  await browser.close();
}

yeet();
