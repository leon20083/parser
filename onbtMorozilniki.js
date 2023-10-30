const { innerText } = require("domutils");
const puppeteer = require("puppeteer");

(async () => {
  const brouser = await puppeteer.launch({ headless: false });
  const page = await brouser.newPage();
  await page.goto(
    "https://onbt.ru/catalog/331-kholodil-niki/?PAGE_TYPE=list&PAGE_SIZE=100&PAGEN_1=8"
  );
  await page.screenshot({ path: "img.png" });

  let imageUrl = await page.evaluate(() => {
    let text = Array.from(document.querySelectorAll(".item .img a"), (el) =>
      el.style.backgroundImage
        .replace('url("', "https://onbt.ru/")
        .replace('")', "")
    );
    return text;
  });
  let name = await page.evaluate(() => {
    let text = Array.from(
      document.querySelectorAll(".item .name"),
      (el) => el.innerText
    );
    return text;
  });
  let price = await page.evaluate(() => {
    let text = Array.from(
      document.querySelectorAll(".item .price-block .price"),
      (el) => el.innerText.trim().replace(" ", "") * 1
    );
    return text;
  });
  let about = await page.evaluate(() => {
    let text = Array.from(
      document.querySelectorAll(".item .about-block > section"),
      (el) => el.innerText.replace(/\n/g, " ")
    );
    return text;
  });
  let art = await page.evaluate(() => {
    let text = Array.from(
      document.querySelectorAll(".item .about-block"),
      (el) => el.innerText.match(/\d{1,}/).join()
    );
    return text;
  });
  await brouser.close();
  for (let i = 0; i < imageUrl.length; i++) {
    let obj = {
      image: imageUrl[i],
      name: name[i],
      price: price[i],
      about: about[i],
      art: art[i],
    };
    console.log(obj);
    console.log(",");
  }
})();
