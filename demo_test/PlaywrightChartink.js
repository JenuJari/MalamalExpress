const { chromium } = require('playwright');
const num = require('numeral');

const parseChartinkCopyString = (str) => {
  const responseArr = [];
  const resp = str.split("\n");
  const header = resp[2];

  const headerCols = header.split("\t");
  const chunks = resp.slice(3, resp.length);

  chunks.forEach(el => {
    const rwCols = el.split("\t");
    const t = {};
    headerCols.forEach((c, i) => {
      if (c === "Links:") return;
      if (c === "Sr.") {
        t['sr'] = parseInt(rwCols[i]);
      }
      else if (c === "Stock Name") {
        t["stock_name"] = rwCols[i];
      }
      else if (c === "Symbol") {
        t["symbol"] = rwCols[i];
      }
      else if (c === "% Chg") {
        t["percent_change"] = parseFloat(parseFloat(num(rwCols[i]).value()).toFixed(4));
      }
      else if (c === "Price") {
        t["price"] = num(rwCols[i]).value();
      }
      else if (c === "Volume") {
        t["volume"] = num(rwCols[i]).value();
      }
    });
    responseArr.push(t);
  });

  return responseArr.sort((a, b) => (a.sr - b.sr));
};

const visitAndGetCopyFromChartinkUrl = async (url) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  const page = await context.newPage();
  await page.goto(url);
  await page.click('//button[normalize-space(.)=\'Copy\']');
  await sleep(1000);
  const text = await page.evaluate(async () => {
    const response = await navigator.clipboard.readText();
    return response;
  }, []);
  await context.close();
  await browser.close();
  return text;
};

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

(async () => {
  const resp = await visitAndGetCopyFromChartinkUrl('https://chartink.com/screener/tempo-test');
  const parsedObj = parseChartinkCopyString(resp);
  console.log("🚀 ~ file: index.js ~ line 68 ~ parsedObj", parsedObj)
})();


// const { chromium } = require('playwright-core');
// const awsChromium = require('chrome-aws-lambda');

// const browser = await chromium.launch({
//   headless: false,
//   executablePath: awsChromium.executablePath,
// });
