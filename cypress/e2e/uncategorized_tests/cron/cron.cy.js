import { doLogin } from "../../helpers/helpers.cy.js"

describe('Generic Test Suite - Cron', () => {
    beforeEach((() => {
        cy.doLogin();
        cy.visit('admin/config/system/cron');
    }))

    it('Runs cron -> checks whether run was completed (admin)', () => {
        // TODO: make ALL cy.get selectors better (minimum use ids)

        cy.get('.page-title').contains('Cron');
        cy.get('#edit-run').click();
        cy.get('.messages').contains('Cron ran successfully.');
        cy.visit('admin/reports/dblog');
        cy.contains('td.views-field.views-field-message a', 'Cron run completed.', { first: true });
    })
})