import { chromium } from 'playwright';

const outputDir = 'C:/Users/PARSA COMPUTER/Desktop/New folder (2)/public/images/portfolio';

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForVisibleImages(page) {
  await page.evaluate(async () => {
    const images = Array.from(document.images || []).filter((img) => {
      const rect = img.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });

    await Promise.all(
      images.map((img) => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }

        return new Promise((resolve) => {
          const done = () => resolve(true);
          img.addEventListener('load', done, { once: true });
          img.addEventListener('error', done, { once: true });
        });
      })
    );
  });
}

async function slowScroll(page, passes = 2) {
  for (let pass = 0; pass < passes; pass += 1) {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let current = 0;
        const step = Math.max(Math.floor(window.innerHeight * 0.55), 220);
        const timer = setInterval(() => {
          const fullHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight
          );

          window.scrollTo(0, current);
          current += step;

          if (current >= fullHeight) {
            window.scrollTo(0, fullHeight);
            clearInterval(timer);
            resolve(true);
          }
        }, 900);
      });
    });

    await wait(3500);
    await waitForVisibleImages(page);
  }
}

async function waitForPersian(page, regex, timeout = 30000) {
  await page.waitForFunction(
    (patternSource) => new RegExp(patternSource, 'u').test(document.body.innerText),
    regex.source,
    { timeout }
  );
}

async function prepareNoor(page) {
  await waitForPersian(page, /خانه|داکتران|شفاخانه|نوبت دهی/);
}

async function prepareLePetit(page) {
  const faButton = page.locator('text=FA').first();
  await faButton.click();
  await waitForPersian(page, /دستهبندی محصولات|پوشاک|سفارش/);
}

async function captureSite(page, config) {
  await page.setViewportSize(config.viewport);
  await page.goto(config.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await wait(5000);
  await config.prepare(page);
  await wait(5000);
  await waitForVisibleImages(page);
  await slowScroll(page, 2);
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(2500);
  await waitForVisibleImages(page);
  await page.screenshot({ path: `${outputDir}/${config.output}`, fullPage: true, type: 'jpeg', quality: 92 });
}

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
});

try {
  const context = await browser.newContext({
    locale: 'fa-IR',
    extraHTTPHeaders: {
      'Accept-Language': 'fa-IR,fa;q=0.9,en;q=0.8'
    }
  });

  const page = await context.newPage();

  await captureSite(page, {
    url: 'https://nooralmadinahhospital.com/',
    output: 'noor-desktop.jpg',
    viewport: { width: 1600, height: 1000 },
    prepare: prepareNoor
  });

  await captureSite(page, {
    url: 'https://nooralmadinahhospital.com/',
    output: 'noor-mobile.jpg',
    viewport: { width: 390, height: 844 },
    prepare: prepareNoor
  });

  await captureSite(page, {
    url: 'https://lepetit-isenburg.de/',
    output: 'lepetit-desktop.jpg',
    viewport: { width: 1600, height: 1000 },
    prepare: prepareLePetit
  });

  await captureSite(page, {
    url: 'https://lepetit-isenburg.de/',
    output: 'lepetit-mobile.jpg',
    viewport: { width: 390, height: 844 },
    prepare: prepareLePetit
  });

  console.log('Screenshots captured successfully.');
} finally {
  await browser.close();
}