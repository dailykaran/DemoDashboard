const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false,
  pageLoadTimeout: 90000,
  defaultCommandTimeout: 6000,
  viewportWidth: 1366,
  viewportHeight: 768,
  projectId: 'mzmz6h',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:5000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
