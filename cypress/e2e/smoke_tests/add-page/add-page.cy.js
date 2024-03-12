import { doLogin } from "../../helpers/helpers.cy.js"

describe("Does add page stuff", {testIsolation: false}, () => {
    
    beforeEach(() => {
        cy.doLogin();
        cy.visit('/node/add/ubc_page');

        // TODO: use this for a site that doesn't have ubc_page
        cy.on('uncaught:exception', (err, runnable) => {
            if(err.message.includes('Page does not exist')){
               console.log("try node/add/page instead?")
            //    return false;
            }
            return true;
        })
    })

    it("Types in the title, summary, and body boxes", () => {
        const titleMessage = "Cypress Test Title";
        // const summaryMessage = "Cypress summary text here";
        const bodyMessage = "Cypress body text";

        cy.get('[data-drupal-selector="edit-title-wrapper"] input').type(titleMessage).should('have.value', titleMessage);
        // cy.get('[data-drupal-selector="edit-body-0-summary"]').type(summaryMessage).should('have.value', summaryMessage);
        cy.get('.ck[role="textbox"]').realClick().realType(bodyMessage, {delay: 0});
        
        // Check body text was typed
        cy.get('.ck[role="textbox"]').then(el => {
            const editor = el[0].ckeditorInstance;
            const data = editor.getData();
            expect(data).to.contain(bodyMessage);
        });

        // Save changes
        cy.get('[data-drupal-selector="edit-submit"]').click();

        // Check that title and body text were saved
        cy.get('.page-title').should("contain", titleMessage);
        cy.get('.node--type-ubc-page').should("contain", bodyMessage);
    })
})
