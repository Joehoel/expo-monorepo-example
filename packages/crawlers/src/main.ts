import { CheerioCrawler, Sitemap } from 'crawlee';
import { glob } from 'glob';

import { Actor } from 'apify';
import { readFile, writeFile } from 'fs/promises';
import { router } from './routes.js';

await Actor.init();

interface Input {
  maxRequestsPerCrawl: number;
}

const { urls } = await Sitemap.load('https://www.ah.nl/sitemaps/entities/products/detail.xml');

const { maxRequestsPerCrawl } = (await Actor.getInput<Input>()) ?? {};

const crawler = new CheerioCrawler({
  requestHandler: router,
  maxRequestsPerCrawl: maxRequestsPerCrawl ?? 50,
  maxRequestsPerMinute: 60,
  maxConcurrency: 1,
});

await crawler.run(urls.slice(0, maxRequestsPerCrawl));

await Actor.exit();

if (process.env.NODE_ENV !== 'production') {
  const jsonFiles = await glob('storage/datasets/default/*.json', {
    absolute: true,
  });

  const results = [];
  for (const file of jsonFiles) {
    const data = JSON.parse(await readFile(file, 'utf-8'));
    results.push(data);
  }

  await writeFile('output.json', JSON.stringify(results, null, 2));
}
