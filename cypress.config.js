const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://example.it.ubc.ca.lndo.site',

    viewportWidth: 1440,
    viewportHeight: 900,  
    
    // Can reduce failure time here
    defaultCommandTimeout: 2000,

    // Exclude helper commands from potentially being run
    excludeSpecPattern: [
      "cypress/e2e/helpers/"
    ],
  },
})