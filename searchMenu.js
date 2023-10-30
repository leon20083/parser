const { innerText } = require("domutils");
const puppeteer = require("puppeteer");

(async () => {
  const brouser = await puppeteer.launch({ headless: false });
  const page = await brouser.newPage();
  await page.goto("https://onbt.ru/catalog/159-sport-i-khobbi/");
  await page.screenshot({ path: "img.png" });

  let name = await page.evaluate(() => {
    let text = Array.from(document.querySelectorAll(".smol_hide li"), (el) =>
      el.innerText.replace(/\t/g, "").replace(/\n/g, "")
    );
    return text;
  });
  await brouser.close();
  console.log(name);
})();
