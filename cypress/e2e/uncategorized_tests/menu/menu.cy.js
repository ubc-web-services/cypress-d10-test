import { doLogin } from "../../helpers/helpers.cy.js"

describe('Generic Test Suite - Menu', () => {

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
    }))

    it('can access menu page', () => {
        cy.visit('admin/structure/menu/manage/main');
        cy.get('.page-title').contains('Edit menu Main navigation');
    })

    it('assert no errors in main menu page', () => {
        cy.visit('admin/structure/menu/manage/main');
        cy.get('.page-title').contains('Edit menu Main navigation');
        cy.get('.messages').should('not.exist');
    })

    it('can access menu list', () => {
        cy.visit('admin/structure/menu');
        cy.get('.page-title').contains('Menus');
    })

    it('assert no errors in menu list page', () => {
        cy.visit('admin/structure/menu');
        cy.get('.page-title').contains('Menus');
        cy.get('.messages').should('not.exist');
    })
})