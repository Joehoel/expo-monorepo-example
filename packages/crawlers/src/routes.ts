import { createCheerioRouter } from 'crawlee';
import { storage } from './main';
import { trpc } from './lib/trpc';

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ $, log, request }) => {
  const name = $('h1[class*=product-card-header_title]').text().trim();
  const price = +$('div[class*=product-card-hero-price_now]').text().trim();
  const unitSize = $('span[class*=product-card-hero-price_unitSize]').text().trim();
  const unitPrice = +$('span[class*=product-card-header_unitPrice]').text().trim();
  const nutri = $('svg[class*=svg_nutriscore] title').text().trim().split(' ')[1];
  const image = $('img[data-testhook=product-image]').attr('src')!;

  log.info('Found product', { name, price, unitSize, unitPrice, nutri, image });

  const response = await trpc.product.insertOne.mutate({
    name,
    price,
    // @ts-expect-error
    nutri,
    image,
    url: request.loadedUrl,
    unitSize,
  });

  log.info('Inserted product', response);

  await storage.pushData({
    name,
    price,
    unitPrice,
    unitSize,
    nutri,
    image,
    url: request.loadedUrl,
  });
});
