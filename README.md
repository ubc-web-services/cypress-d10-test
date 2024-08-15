# Cypress D10 Testing

Below, you can find instructions on how to set up the Cypress D10 test suite for your project, and how to write tests in Cypress.

> These instructions are also found [on Confluence](https://confluence.it.ubc.ca/display/WebServices/How+to+test+with+Cypress). However,
these two documents are not kept in sync with each other, and this README should be considered the most up-to-date version.


## Minimal setup:

1. Run `composer require ubc-web-services/cypress-d10-test`
2. Start up lando as per normal local development
3. In project root, run `npm install --save-dev cypress && npm install --save-dev cypress-real-events` (should be version 13+, otherwise it should prompt for an update)
4. To start Cypress, run `npx cypress open`
5. If prompted, follow the migration steps by accepting all changes (this is if an older version of cypress was already installed)
6. Overwrite the current cypress.config.js/cypress.json file that is in root with cp -f vendor/ubc-web-services/cypress-d10-test/cypress.config.js . 
7. At this point, we don't need the cypress folder that is in root. Either delete the folder, or rename to cypress_custom so cypress.config.js sees the tests in there.
8. Change cypress.config.js baseUrl to the URL of the lando site (e.g. https://exampleitubcca.lndo.site)

## How to write Cypress tests

A good basic tutorial can be found here: [https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test) 

Cypress has made example tests for reference: [https://github.com/cypress-io/cypress-example-recipes](https://github.com/cypress-io/cypress-example-recipes) 

You can also use the tests in vendor/ubc-web-services/cypress-d10-test/e2e as a reference for your own test writing.

Here is a simple example of a .cy.js file:

```
describe("[Generic] Test Suite - tests related to XYZ", () => {
    beforeEach(() => {
        cy.doLogin();	// triggers login custom helper function, which uses lando drush uli to login
        cy.visit('/admin/reports/dblog');
    })

    it("Checks that the title loaded (fails if whitescreen)", () => {
        // cy.get uses CSS selectors 
        cy.get('#block-gin-page-title').should('contain', 'Recent log messages');

        // using .contains() or .find() are also great ways to "grab hold" of an element, especially if it has bad selector options
        // Alternative approach
        cy.contains("Recent log messages").should("exist");
    })
})
```

## How to add your test as a custom test

Inside cypress.config.js, there is the option 'specPattern', which specifies where tests can be found.

A path for "cypress_custom" has already been added, meaning tests placed inside that folder will be recognized by Cypress (e.g. cypress_custom/test.cy.js or cypress_custom/test/hello.cy.js).

You can also append a path to 'specPattern' to a directory of your choice.

## How to ignore a test

Similar to 'specPattern', inside cypress.config.js there is the option 'excludeSpecPattern', which ignores tests that match a particular path.

There is a path to a file containing helper functions already included, which can be used as reference.

## How to write "good" tests

I don't know!!! However, there are some good resources:

https://cypress.tips/

https://docs.cypress.io/guides/core-concepts/introduction-to-cypress

In general, the docs are quite easy to read: https://docs.cypress.io/guides/

## How to avoid committing sensitive parameters to the repository

See https://docs.cypress.io/guides/guides/environment-variables#Option-2-cypressenvjson on how to add environment variables.

## Project links

Cypress smoke tests ("default" repo): https://github.com/ubc-web-services/cypress-d10-test

Repo from previous co-op student on testing with Cypress: https://github.com/ubc-web-services/cypress-test#introduction

Automation post-mortem: https://github.com/ubc-web-services/cypress-d10-test/blob/master/automation-post-mortem.md
