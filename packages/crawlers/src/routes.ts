import { createCheerioRouter } from 'crawlee';
import { storage } from './main.js';

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

router.addDefaultHandler(async ({ $, log, request }) => {
  const name = $('h1[class*=product-card-header_title]').text().trim();
  const price = $('div[class*=price-amount_root]').text().trim();
  const unit = $('span[data-testhook="product-unit-size"]').text().trim();
  const unitPrice = $('span[class*=product-card-header_unitPrice]').text().trim();
  const nutri = $('svg[class*=svg_nutriscore] title').text().trim().split(' ')[1];

  log.info(`Found product: ${name}`);

  await storage.pushData({ name, price, unit, nutri, url: request.loadedUrl, unitPrice });
});
