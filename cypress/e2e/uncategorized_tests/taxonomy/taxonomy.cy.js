import { doLogin } from "../../helpers/helpers.cy.js"

describe('Generic Test Suite - Taxonomy', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    beforeEach((() => {
        cy.doLogin();
        cy.visit('admin/structure/taxonomy');
    }))

    it('can access taxonomy page', () => {
        cy.visit('admin/structure/taxonomy');
        cy.get('.page-title').contains('Taxonomy');
    })

    it('assert no errors', () => {
        cy.visit('admin/structure/taxonomy');
        cy.get('.page-title').contains('Taxonomy');
        cy.get('.messages').should('not.exist');
    })

    context('edit an admin taxonomy, and save without making changes', () => {
        beforeEach(() => {
            cy.visit('admin/structure/taxonomy');
            cy.get('.page-title').contains('Taxonomy');
            cy.get('#taxonomy').within(() => {
                cy.get('tbody').within(() => {
                    cy.get('.dropbutton__toggle').first().click();
                    cy.get('a').contains('Edit vocabulary').click();
                })
            })
        })

        it('can edit an admin taxonomy, and save without making changes', () => {

            // Reads the value of the field, and then types it back in
            // TODO: check if this should be disabled, in case it may modify content
            cy.get('#edit-name').invoke('val').then((text) => {
                // cy.wait(1000);
                cy.get('#edit-name').clear().type(text);
            })

            // Reads the value of the field, and then types it back in
            // TODO: check if this should be disabled, in case it may modify content
            cy.get('#edit-description').invoke('val').then((text) => {
                // cy.wait(1000);
                cy.get('#edit-description').clear().type(text);
            })
            cy.get('#edit-submit').click();
            cy.get('.messages').contains('Updated vocabulary').should('exist');
        })
    })
})