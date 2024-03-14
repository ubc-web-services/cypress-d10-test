import { doLogin } from "../../helpers/helpers.cy.js"

describe('Generic Test Suite - Views Editing', () => {

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

    beforeEach(() => {
        // do something before each test
        cy.doLogin()
        cy.viewport(1440, 900)
    })

    // Useful checks (looks for error/warning messages)
    // cy.get('.messages--error').should('not.exist') 
    // cy.get('.messages--warning').should('not.exist')

    it('finds content_items view and clicks on it', () => {

        cy.visit('/admin/structure/views')

        // Check for any errors/warnings (TODO: do this in a different test, or ignore here)
        // cy.get('.messages--error').should('not.exist')
        // cy.get('.messages--warning').should('not.exist')

        // Edit the "content" view
        cy.get('tr.views-ui-list-enabled')
            .contains('td.views-ui-view-machine-name', 'content_alert_banner')
            .parent('tr')
            .contains('a', 'Edit')
            .click();

        // TODO: figure out better error assertions
        // cy.get('.messages--error').should('not.exist')

        // include not js-hide to ignore invisible 'Unsaved Changes' warning
        cy.get('.messages--warning').not('.js-hide').should('not.exist')
    })

    it('edits view_contents name but cancels the edit', () => {

        cy.visit('/admin/structure/views/view/content_items')

        cy.get('.edit-details > .views-ajax-link').click()
        cy.get('[id^=edit-label]').clear().type('HELLO WORLD')

        // click cancel
        cy.get('.ui-dialog-buttonset > :nth-child(2)').click()

        // TODO: figure out better error assertions
        // cy.get('.messages--error').should('not.exist')

        // NOTE: include not js-hide to ignore invisible 'Unsaved Changes' warning 
        cy.get('.messages--warning').not('.js-hide').should('not.exist')
    })

    it('attempts to create a view using a name already in use, checks for errors', () => {

        cy.visit('/admin/structure/views')

        // Click 'Add view'
        cy.get('.local-actions__item > .button').click()

        // Attempt to create a view using a name already in use
        cy.get('#edit-label').type("Content")   // TODO: is "Content" consistent across sites?
        cy.get('#edit-submit').click()
        cy.get('#edit-id').clear().type("content")
        cy.get('#edit-submit').click()

        // TODO: this is a very blunt error check method 
        cy.get('.messages--error').should('exist')
    })

    it('Makes an edit, checks for unsaved changes warning, cancels edit', () => {

        cy.visit('/admin/structure/views/view/content_items')

        // Edit view title
        cy.get('.edit-details > .views-ajax-link').click()
        cy.get('.js-form-item-label > [id^=edit-label]').clear().type('HELLO WORLD')
        cy.get('.ui-dialog-buttonset > :nth-child(1)').click()

        cy.get('.messages--warning').not('.js-hide').should('exist')    // unsaved changes warning 

        // Check that the page title was changed
        cy.get('.page-title').contains('HELLO WORLD')

        cy.get('#edit-actions-cancel').click()
        // Check that the edit made doesn't exist anymore
        cy.visit('/admin/structure/views/view/content_items')
        cy.get('.page-title').contains('HELLO WORLD').should('not.exist')
        cy.get('.page-title').contains('Content Items (Content Item)').should('exist')
    })
})
