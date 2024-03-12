# Cypress Automated Testing


## Table of Contents

  * [Introduction](#introduction)
  * [Architecture](#architecture)
  * [Project Setup](#project-setup)
  * [Writing Tests for Cypress](#writing-tests-for-cypress)
  * [Replacing Default Tests With Custom Ones](#replacing-default-tests-with-custom-ones)
  * [FAQ & Troubleshooting](#faq--troubleshooting)
  * [Resources](#resources)

## Introduction

Cypress is an end to end (E2E) testing framework that allows you to test live websites.

## Architecture

* Technologies Used

    * Javascript
    * Cypress
    * Bash Scripts
    * Github Actions
    * Platform.sh Activity Scripts

* User Workflow Diagram

  ![Alt Text](https://github.com/ubc-web-services/cypress-test/blob/master/readmeGifs/Presentation%20.png)


## Project Setup

1. Install Cypress:
    
    * Ensure you include node_modules in your `.gitignore` file in your root directory
    
    * At the root directory of your project, run:  `npm install cypress --save-dev`

2. Setup inital run:
    
    * In the root directory, add the following code in the `package.json` file

        ```json
        "scripts": {

            "cypress:open": "cypress open"

            }
        
        ```

    * Ensure that your `package.json` file is well-formed, it should look something like this if you have other dependencies

        ```json
        {
            "devDependencies": {
                "cypress": "^8.2.0"
            },
                "scripts": {
                "cypress:open": "cypress open"
                }
            
        }
        ```
    * Run `npm run cypress:open` to open Cypress

3. Setup recording for test runs

    * Login into UBC Web Services Cypress account on the top right corner
    
    * Select Runs in the taskbar and click on "Connect to dashboard" to follow prompts to setup recording for the project

    ![Alt Text](https://github.com/ubc-web-services/cypress-test/blob/master/readmeGifs/step3setuprun.gif)

    * Ensure the projectID exists in `cypress.json` file, in addition, copy down the Cypress record key (it should say something like this: `541add07-daee-47c1-851b-73d056ac9963`)

4. Insert the Cypress record key as a Secret in project repo:

    ![Alt Text](https://github.com/ubc-web-services/cypress-test/blob/master/readmeGifs/step4github.gif)

    
    * Navigate to https://github.com/ubc-web-services/{reponame}/settings/secrets/actions

    * Select "New repository secret"

    * Set name to be: `CYPRESS_RECORD_KEY`

    * Set value to be the Cypress record key

    * Hit add secret to save

5. Setup Platform.sh

    * Add the Github token into your project's environmental variables with the following settings:
           
        * Name: `GITHUB_AUTH`
        * Visible during build
        * Visible during runtime

    * Edit the activity script

        ![Alt Text](https://github.com/ubc-web-services/cypress-test/blob/master/readmeGifs/step5activityscript.gif)

        * Open the `trigger_cypress_testing.js` file in your editor

        * Update the `const ghRepo` field to your project's Github repo's name eg: `example.ubc.ca`

    * Add the activty script to Platform.sh

        ![Alt Text](https://github.com/ubc-web-services/cypress-test/blob/master/readmeGifs/step5addactivityscript.gif)
    
        * Head to the project's page, select integrations then `Add integration`

        * Scroll down to the bottom of the page and select `add` under the activity scripts

        * Copy and paste the javascript code from   `trigger_cypress_testing.js` into Javascript code field

        * Insert `environment.push,environment.redeploy` in the Events to report field

        * Insert `complete` in the States to report field

        * Insert * Included environments field

        * Hit save

    * Note: It is possible to add the activity script over the command line, for more infomation please check the documentation https://docs.platform.sh/integrations/activity.html

6. Running the tests
    
    * Local: 

        * Ensure you are running the project locally using Lando, as the script only works with Lando
                 
        * CD into your project directory and run ` ./runlandotest.sh ` in your terminal

    * Remote:

        * Ensure you have committed the files during the setup steps to master. As Github Action script will not run until its pushed to the master branch

        * Cypress tests will run when Platform.sh projects builds or redeployed

        * Runs can be be manually trigged right https://github.com/ubc-web-services/{YourProjectRepo}/actions/workflows/cypress.yml

## Writing Tests for Cypress

* When writing tests locally, you can replace the domain in `cy.visit('/')` in each of the test files to a domain you want, but ensure not to push this to the remote repo.

* Cypress will automatically re-run the tests the moment you save any changes on your test files

* Examples:
    
    1. ```javascript it('contains ubc footer', () =>{
        cy.get('[id="ubc7-footer"]').should('exist');})
        ```
         * The above test is an assertion to see if the ubc footer exists within the DOM
         * We can use the `cy.get` function to obtain DOM elements and use `should()` to see if the element exists or not

    2. ```javascript  it('contains ubc header top border', () =>{
        cy.get('[id="ubc7-header"]').should('have.css', 'border-top', '3px');
        cy.get('[id="ubc7-header"]').should('have.css', 'border-top', 'rgb(0, 33, 69)'); })
       ```
         * The second test asserts if the website has the ubc header with the correct border on top
         * You can also test CSS classes of DOM elements and what they contain in the `should()` function

    3. ``` javascript  it('test number of links in header', ()=>{
        cy.get('[data-target="#ubc7-global-menu"]').click();
        cy.get('[id="ubc7-global-header"] > .row-fluid > .offset2 > .reverse').should('exist');
        cy.get('[id="ubc7-global-header"] > .row-fluid > .offset2 > .reverse >').should('have.length', 8);
        })
       ```
       * The third test asserts the number of links in the UBC search header
       * You can use CSS selectors as in order to target classes as well when looking for DOM element

* You can check out more examples of Cypress tests by looking at the `spec.js` files in the `tests` folder of this repo 

* You can also see more examples here https://docs.cypress.io/guides/getting-started/writing-your-first-test#Write-your-first-test


## Replacing Default Tests With Custom Ones

* Navigate to the `cypress/e2e` folder of your project

* Replace the files with the `spec.js` files found in the `tests` folder in this repo

* You can also write your custom tests and add it to the folder, the files much end with `spec.js` or else Cypress will not execute the tests


## FAQ & Troubleshooting

* How do I run tests to different Cypress accounts?

    * Follow step 3 and 4 of the setup process with a different Cypress account 

* How can I migrate tests to different Cypress accounts?

    * You can replace the files in `cypress/e2e` folder with your own spec.js files

* Will my Platform.sh project stop building when tests fail?

    * No, the Cypress tests runs independently from Platform.sh, which means websites will build regardless of the number of tests failed

## Resources

* Platform.sh Activity Scripts documentation

    * https://docs.platform.sh/integrations/activity.html

* Cypress testing documentation

    * https://docs.cypress.io/api/table-of-contents
