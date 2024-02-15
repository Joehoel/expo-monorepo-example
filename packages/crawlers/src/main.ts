import { CheerioCrawler, Sitemap } from 'crawlee';
import { glob } from 'glob';

import { Actor } from 'apify';
import { readFile, writeFile } from 'fs/promises';
import { router } from './routes.js';

await Actor.init();

interface Input {
  maxRequests: number;
}

const { urls } = await Sitemap.load('https://www.ah.nl/sitemaps/entities/products/detail.xml');

const { maxRequests } = (await Actor.getInput<Input>()) ?? {};

export const storage = await Actor.openDataset('ah');

const crawler = new CheerioCrawler({
  requestHandler: router,
  maxRequestsPerCrawl: maxRequests ?? 50,
  maxRequestsPerMinute: 60,
  maxConcurrency: 2,
});

await crawler.run(urls.slice(0, 1000));

if (process.env.NODE_ENV !== 'production') {
  const jsonFiles = await glob(`storage/datasets/${storage.name}/*.json`, {
    absolute: true,
  });

  const results = [];
  for (const file of jsonFiles) {
    const data = JSON.parse(await readFile(file, 'utf-8'));
    results.push(data);
  }

  await writeFile('output.json', JSON.stringify(results, null, 2));
}

await Actor.exit();
