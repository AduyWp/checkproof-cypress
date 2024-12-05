const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {},  // Remove if not needed
    supportFile: false,  // Set to true if you have a custom support file
  },
})