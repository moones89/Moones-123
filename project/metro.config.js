const { getDefaultConfig } = require('@expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true
});

// Clear cache configuration
config.cacheStores = [];

// Set the correct entry point for Expo Router
config.resolver.platforms = ['ios', 'android', 'native', 'web'];
config.resolver.entryPoints = ['expo-router/entry'];

module.exports = config;