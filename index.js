import cherio from "cherio";
import chalk from "chalk";

import { arrayFromLength } from "./helpers/common";
import { getPageContent } from "./helpers/puppeteer";

const SITE = "https://www.aliexpress.com/store/5410049/search/1.html"; // constant with link to catalog

(async function main() {
  try {
    for (const page of arrayFromLength(CATALOG_PAGE_LENGTH)) {
      const url = `${SITE}/${page}.html`;
      const pageContent = await getPageContent(url);
      const $ = cherio.load(pageContent);
      const items = [];

      $("#node-gallery .items-list .item").each((i, item) => {
        console.log(i);
        const url = $(".detail h3 a", header).attr("href");
        const title = $(".detail h3 a", header).attr("title");
        const price = $(".cost b", header).text();
        items.push({
          url,
          title,
          price,
        });
      });

      await listItemsHandler(items);
    }
  } catch (err) {
    console.log(chalk.red("An error has occurred"));
    console.log(err);
  }
})();
