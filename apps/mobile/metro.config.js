// Learn more: https://docs.expo.dev/guides/monorepos/
const { getDefaultConfig } = require('expo/metro-config');
const { FileStore } = require('metro-cache');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

module.exports = withTurborepoManagedCache(
  withSourceExtensions(
    withMonorepoPaths(
      withNativeWind(getDefaultConfig(__dirname), {
        input: './global.css',
        configPath: './tailwind.config.js',
      })
    ),
    ['mjs', 'cjs']
  )
);

/**
 * Add the monorepo paths to the Metro config.
 * This allows Metro to resolve modules from the monorepo.
 *
 * @see https://docs.expo.dev/guides/monorepos/#modify-the-metro-config
 * @param {import('expo/metro-config').MetroConfig} config
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withMonorepoPaths(config) {
  const projectRoot = __dirname;
  const workspaceRoot = path.resolve(projectRoot, '../..');

  // #1 - Watch all files in the monorepo
  config.watchFolders = [workspaceRoot];

  // #2 - Resolve modules within the project's `node_modules` first, then all monorepo modules
  config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
  ];

  return config;
}

/**
 * Move the Metro cache to the `node_modules/.cache/metro` folder.
 * This repository configured Turborepo to use this cache location as well.
 * If you have any environment variables, you can configure Turborepo to invalidate it when needed.
 *
 * @see https://turbo.build/repo/docs/reference/configuration#env
 * @param {import('expo/metro-config').MetroConfig} config
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withTurborepoManagedCache(config) {
  config.cacheStores = [new FileStore({ root: path.join(__dirname, 'node_modules/.cache/metro') })];
  return config;
}

/**
 * Add source extensions file types
 *
 * @see https://docs.expo.dev/guides/monorepos/#modify-the-metro-config
 * @param {import('expo/metro-config').MetroConfig} config
 * @param {string[]} sourceExts
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withSourceExtensions(config, sourceExts) {
  config.resolver.sourceExts = [...config.resolver.sourceExts, ...sourceExts];
  config.watcher.additionalExts = [...config.watcher.additionalExts, ...sourceExts];

  return config;
}
