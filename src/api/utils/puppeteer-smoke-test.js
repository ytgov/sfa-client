const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--headless", "--disable-gpu"],
  });
  const page = await browser.newPage();
  await page.goto("https://example.com");
  await browser.close();
  console.log("done");
})();
