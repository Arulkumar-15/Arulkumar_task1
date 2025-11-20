const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Ensure proper resolution of scoped packages
    extraNodeModules: {},
  },
  watchFolders: [],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
