const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./vendor/ubc-web-services/cypress-d10-test/cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost',

    viewportWidth: 1440,
    viewportHeight: 900,  
    
    // Can reduce failure time here
    defaultCommandTimeout: 2000,

    supportFile: "vendor/ubc-web-services/cypress-d10-test/cypress/support/e2e.js",

    specPattern: [
      "vendor/ubc-web-services/**/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
      "cypress_custom/**/*.cy.{js,jsx,ts,tsx}"
    ],

    // Exclude helper commands from potentially being run as tests
    excludeSpecPattern: [
      "vendor/ubc-web-services/**/cypress/e2e/**/helpers.?(cy.)js"
    ],
  },
})