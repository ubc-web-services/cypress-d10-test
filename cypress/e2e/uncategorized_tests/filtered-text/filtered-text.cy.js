import { doLogin } from "../../helpers/helpers.cy.js"

describe('Generic Test Suite - Filtered Text', {testIsolation: false}, () => {

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
        cy.visit('admin/config/content/formats/manage/filtered_text');
    }))

    it('can access filtered text page', () => {
        cy.get('.page-title').contains('Filtered Text');
        // TODO: don't just get any error. We can test for general errors somewhere else
        // cy.get('.messages').should('not.exist');
    })

    it('Anon and Auth users have no access to the text format', () => {
        cy.get('#edit-roles-anonymous').should('not.be.checked');
        cy.get('#edit-roles-authenticated').should('not.be.checked');
        cy.get('#edit-roles-anonymous').click();
        cy.get('#edit-roles-authenticated').click();
        cy.get('#edit-roles-anonymous').should('be.checked');
        cy.get('#edit-roles-authenticated').should('be.checked');
        // EXIT WITHOUT SAVING
    })

    it('Text format is set to CKEditor5', () => {
        cy.get('#edit-editor-editor').should('have.value', 'ckeditor5');
        // tested with both ckeditor5 and 'none', confirmed test works
    })

    it('Styles are configured', () => {
        cy.get('#edit-editor-settings-plugins-stylescombo-styles').should('not.be.empty');
        // Tested with empty and non-empty values, confirmed test works
    })

    it('Link styles are configured', () => {
        // TODO
    })

    it('Linkit profile is set', () => {
        cy.get('#edit-filters-linkit-status').should('be.checked');
        // cy.get('#edit-filters-linkit-status').click();
        // cy.get('#edit-filters-linkit-status').should('not.be.checked');
        // cy.get('#edit-filters-linkit-status').click();

        cy.get('[data-drupal-selector="edit-linkit"] > .tabledrag-cell').should('have.text', 'Linkit URL converter');
        cy.get('#edit-filters-linkit-settings-title').should('be.checked');
    })

    it('Track images uploaded via a text editor is enabled', () => {
        cy.get('#edit-filters-editor-file-reference-status').should('be.checked');
    })

    it('Lazy load images is enabled', () => {
        cy.get('#edit-filters-filter-image-lazy-load-status').should('be.checked');

    })

    it('Button link styles should not exist', () => {
        cy.get('#filter-format-edit-form').should('not.contain', 'Button link styles');
    })
})