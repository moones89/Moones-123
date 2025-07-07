const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true
});

// Clear cache configuration
config.cacheStores = [];

// Set the correct entry point for Expo Router
config.resolver.platforms = ['ios', 'android', 'native', 'web'];
config.resolver.entryPoints = ['expo-router/entry'];

// Crucial for web builds to ensure problematic node_modules are transpiled
// The default transformIgnorePatterns often excludes too much.
// We need to explicitly include packages that use CommonJS 'require' or need Babel transpilation for web.
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
  // This regex ensures that 'node_modules' are ignored for transpilation,
  // EXCEPT for the listed packages.
  transformIgnorePatterns: [
    'node_modules/(?!(?:react-native|@react-native|expo|@expo|react-native-reanimated|google-map-react|expo-router|@react-navigation|@react-native-async-storage)/)',
  ],
});

// Ensure react-native is aliased to react-native-web for web builds
// This is often handled by getDefaultConfig, but explicit is safer.
config.resolver.extraNodeModules = {
  'react-native': path.resolve(__dirname, 'node_modules/react-native-web'),
};

module.exports = config;