import { createPlaywrightRouter } from 'crawlee';
import { Page } from 'playwright';

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

export const router = createPlaywrightRouter();

router.addDefaultHandler(async ({ request, page, pushData, log }) => {
  const name = await page
    .$eval('h1[class*=product-card-header_title]', ($h1) => $h1.textContent)
    .catch(() => {
      log.error("Couldn't find product name");
      page.close({ reason: "Couldn't find product name" });
    });
  const price = await page.$eval('div[class*=price-amount_root]', ($div) => $div.textContent);
  const unit = await page.$eval(
    "span[data-testhook='product-unit-size']",
    ($span) => $span.textContent
  );
  const unitPrice = await page
    .$eval('span[class*=product-card-header_unitPrice]', ($span) => $span.textContent)
    .catch(() => {
      log.warning(`Couldn't find unit price for product: ${name}`);
    });

  const nutri = await page
    .$eval('svg[class*=svg_nutriscore] title', ($title) => {
      const title = $title.textContent;
      const score = title?.split(' ')[1];

      return score;
    })
    .catch(() => {
      log.warning(`Couldn't find nutriscore for product: ${name}`);
    });

  if (name) {
    await pushData({ name, price, unit, nutri, url: request.loadedUrl, unitPrice });
  }
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
