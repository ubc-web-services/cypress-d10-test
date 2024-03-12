import { doLogin } from "../../helpers/helpers.cy.js"

describe("Generic Test Suite - reports/updates", () => {
    beforeEach(() => {
        cy.doLogin();
        cy.visit('/admin/reports/dblog');
    })

    it("Checks that the title loaded (fails if whitescreen)", () => {
        cy.get('#block-gin-page-title').should('contain', 'Recent log messages');
    })
})