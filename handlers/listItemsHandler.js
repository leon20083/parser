import cherio from 'cherio';
import chalk from 'chalk';
import { getPageContent } from '../helpers/puppeteer';

export default function listItemsHandler(data) {
    try {
        for (const initialData of data) {
            console.log(chalk.green('Getting data from: ' + chalk.green.bold(initialData.url)));
            const detailContent = await getPageContent(initialData.url);
            const $ = cherio.load(detailContent);

            const productTitle = $('.product-main .product-info .product-title-text').text();
            const productPrice = $('.product-main .product-info .product-price-value').text();
            const productSizes = $('.product-main .product-info .product-sku .sku-property-list').map(
                (i, item) => $('.sku-property-item .sku-property-text span', item).text()
            );
            const productImageUrl = $('.product-main-wrap .image-cover .maginfier-image').attr('src');

            await saveData({
                initialData.url,
                productTitle,
                productPrice,
                productSizes,
                productImageUrl,
            });
        }
    } catch (err) {
        throw err;
    }
}