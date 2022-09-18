import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    excludeSpecPattern: process.env?.['CI'] ? 'cypress/e2e/all.cy.ts': [],
    defaultCommandTimeout: 10000,
    baseUrl: 'http://localhost:4200'
  },

});
