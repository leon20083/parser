const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto("https://brightdata.com/blog");

  const data = await page.evaluate(() => {
    let data = [];
    const titles = document.querySelectorAll(".brd_post_entry");

    for (const title of titles) {
      const titleText = title.querySelector(".brd_post_title").textContent;
      const titleLink = title.href;

      const article = { title: titleText, link: titleLink };
      data.push(article);
    }

    return data;
  });

  console.log(data);

  await browser.close();
})();
