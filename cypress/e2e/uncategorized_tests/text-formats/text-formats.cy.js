import { doLogin } from "../../helpers/helpers.cy.js"

describe('Generic Test Suite - Text Formats', () => {

    // TODO: Can potentially move these to cypress.env.json
    // Variables to compare formats
    // ------------------------------------------------------------
    const textFormats = ["CKEditor 5", "—"];             // allowed formats for CKEditor 5
    const textFormat9 = ["CKEditor 5", "—", "CKEditor"]; // allowed formats for CKEditor 4
    // ------------------------------------------------------------

    beforeEach((() => {
      Cypress.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes("Failed to execute 'observe' on 'IntersectionObserver'")) {
            return false
        }
        if (err.message.includes("drupalSettings is not defined")) {
            return false
        }
        if (err.message.includes("Drupal is not defined")) {
            return false
        }
        return true;
    })
        cy.doLogin();
        // cy.get('.toolbar-menu-administration').should('exist');
        cy.visit('admin/config/content/formats');
    }))

    it('checks that only cke5 is enabled (or -)', () => {
        
        cy.get('#edit-formats').within(() => {
            cy.get('tbody').within(() => {
                cy.get('td:nth-child(2)').each(($el, index, $list) => {
                    const textEditorValue = $el.text();
                    cy.log(textEditorValue);
                    cy.wrap(textFormats).should('contain', textEditorValue);
                });
            });
        });
    });
    
    it('asserts no errors', () => {
        cy.get('.page-title').contains('Text formats and editors');
        cy.get('.messages').should('not.exist');
    })
})