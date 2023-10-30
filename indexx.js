// console.log("hello");
const { innerText } = require("domutils");
const puppeteer = require("puppeteer");

(async () => {
  const brouser = await puppeteer.launch({ headless: false });
  const page = await brouser.newPage();
  await page.goto(
    "http://optvideo.com/ns/katalog2.php?step=2&gr2_by_menu=125596&gr_by_menu=1473&zena1=0&zena2=1000000&kategory=%CA%D0%D3%CF%CD%C0%DF%20%C1%DB%D2%CE%C2%C0%DF%20%D2%C5%D5%CD%C8%CA%C0"
  );
  await page.screenshot({ path: "img.png" });

  let arr = await page.evaluate(() => {
    let text = Array.from(
      document.querySelectorAll(
        "#st_1_mt_0_sl_1 > tbody > tr:nth-child(2) > td:nth-child(1) > a"
      ),
      (el) => el.href
    );
    return text;
  });
  let arr2 = await page.evaluate(() => {
    let text = Array.from(
      document.querySelectorAll(
        "#st_1_mt_0_sl_1 > tbody > tr:nth-child(2) > td:nth-child(2) > a"
      ),
      (el) => el.innerText
    );
    return text;
  });
  let arr3 = await page.evaluate(() => {
    let text = Array.from(
      document.querySelectorAll(
        "#st_1_mt_0_sl_1 > tbody > tr:nth-child(2) > td:nth-child(2) > p:nth-child(5)"
      ),
      (el) => el.innerText
    );
    return text;
  });
  let arr4 = await page.evaluate(() => {
    let text = Array.from(
      document.querySelectorAll(
        "#st_1_mt_0_sl_0 > tbody > tr:nth-child(3) > td > p"
      ),
      (el) =>
        el.innerText
          .replace(/Код /, "Код-")
          .replace(/Артикул /, "Артикул-")
          .split(" ")
    );
    return text;
  });
  for (let i = 0; i < arr.length; i++) {
    let cod = arr4[i][0].split(":");
    let art = arr4[i][1].split(":");
    let ob = arr4[i][2].split(":");
    let ves = arr4[i][3].split(":");
    let brend = arr4[i][4].split(":");
    let obj = {
      name: arr2[i],
      image: arr[i],
      characteristics: arr3[i],
      descr: {
        "Код товара": cod[1],
        "Артикул производителя": art[1],
        Объем: ob[1],
        Вес: ves[1],
        Бренд: brend[1],
      },
    };
    console.log(obj);
  }

  // console.log(obj);
  // console.log(arr2);

  await brouser.close();
})();
