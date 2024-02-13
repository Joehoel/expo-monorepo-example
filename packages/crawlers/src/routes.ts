import { createCheerioRouter } from 'crawlee';

interface Supermarket {
  url: string;
  name: string;
  label: string;
}

const supermarkets: Record<string, Supermarket> = {
  ah: {
    url: 'https://ah.nl',
    name: 'Albert Heijn',
    label: 'ah',
  },
  jumbo: {
    url: 'https://jumbo.com',
    name: 'Jumbo',
    label: 'jumbo',
  },
};

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ $, log }) => {
  const name = $('h1[class*=product-card-header_title]').text().trim();
  const price = $('div[class*=price-amount_root]').text().trim();
  const unit = $('span[data-testhook="product-unit-size"]').text().trim();
  const unitPrice = $('span[class*=product-card-header_unitPrice]').text().trim();
  const nutri = $('svg[class*=svg_nutriscore] title').text().trim().split(' ')[1];

  log.info('Pretending to insert product to database', {
    name,
    price,
    unit,
    unitPrice,
    nutri,
  });

  // log.info(`Found product: ${name} (${price} / ${unit})`);
  // const response = await trpc.product.insertOne
  //   .mutate({
  //     name,
  //     price,
  //     nutri,
  //   })
  //   .catch((error) => {
  //     log.error(error, { error });
  //   });

  // log.info(`Inserted product`, { response });

  // await pushData({ name, price, unit, nutriscore, url: request.loadedUrl, unitPrice });
});

// router.addHandler(supermarkets.ah.label, async ({ request, page, pushData, log }) => {
//   log.info(`Scraping ${supermarkets.ah.name} (${request.url})`);

//   await page.waitForSelector('a[class*=taxonomy-card_imageLink]');
//   const categories = await page.$$eval('a[class*=taxonomy-card_imageLink]', ($cards) => {
//     return $cards.map(($card) => {
//       return {
//         url: $card.getAttribute('href')!,
//       };
//     });
//   });

//   const urls = categories.map(
//     (category) => supermarkets.ah.url + category.url.replace('/producten', '')
//   );
//   log.info(`Enqueueing ${urls.length} URLs`);

//   // await enqueueLinks({
//   //   urls,
//   //   label: supermarkets.ah.label,
//   // });
//   await pushData({ urls });
// });

// router.addDefaultHandler(async ({ enqueueLinks, pushData, request, log, page, crawler }) => {
//   const acceptCookies = await page.$('#accept-cookies');
//   if (acceptCookies) {
//     log.info('Accepting cookies');
//     await acceptCookies.click();
//   }

//   log.info(`Scraping ${supermarkets.ah.name} (${request.url})`);

//   await page.waitForSelector('a[class*=taxonomy-card_imageLink]');
//   const urls = await page.$$eval<string[], HTMLAnchorElement>(
//     'a[class*=taxonomy-card_imageLink]',
//     ($links) => $links.map(($link) => $link.href)
//   );

//   log.info(`Adding ${urls.length} urls to the queue`);

//   await enqueueLinks({
//     globs: [supermarkets.ah.url + '/producten/*'],
//     urls: urls,
//     label: 'category',
//   });
// });

// router.addHandler('category', async ({ request, page, log, pushData }) => {
//   log.info(`Scraping ${request.loadedUrl}`);
//   const products = await page.$$eval('a[class*=product-card-portrait_link]', ($$cardLinks) => {
//     return $$cardLinks.map(($cardLink) => {
//       return {
//         text: $cardLink.textContent!,
//         title: $cardLink.getAttribute('title')!,
//         href: $cardLink.getAttribute('href')!,
//       };
//     });
//   });

//   log.info(`Found ${products.length} products`);

//   await pushData({
//     url: request.loadedUrl,
//     products,
//   });
// });
