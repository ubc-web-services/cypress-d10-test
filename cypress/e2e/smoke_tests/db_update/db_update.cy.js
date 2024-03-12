import { doLogin } from "../../helpers/helpers.cy.js"

describe("Generic Test Suite - reports/updates", () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    })

    beforeEach(() => {
        // do something before each test
        cy.doLogin();
    })

    it("checks whether database needs an update", () => {
        cy.visit('/update.php')
        cy.get('.button').click()
        cy.get('.messages__content').invoke('text').should('contain', "No pending updates.")
    })
})