describe("Generic Test Suite - adds a basic page", {testIsolation: false}, () => {
    
    beforeEach(() => {
        cy.doLogin();
        cy.visit('/node/add/ubc_page');
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
        cy.get('#primary-content').should("contain", titleMessage);
        cy.get('#primary-content').should("contain", bodyMessage);
    })
})
