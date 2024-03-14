import { doLogin } from "../../helpers/helpers.cy.js" 

describe("Sends email through SMTP, checks Drupal messages", () => {
    
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes("Failed to execute 'observe' on 'IntersectionObserver'")) {
                return false
            }
            return true;
        })
        
        cy.doLogin();
        cy.visit("/admin/config/system/smtp");
    })

    it("Sends test email to fake email, checks Drupal messages", () => {

        const email = 'test_email@example.com'


        // Catch exception for if status message box has more than one message
        // Cypress.on('fail', (error, runnable) => {
        //     if (error.message.includes('.messages--status')) {
        //         cy.get('.messages__list').should('contain', "SMTP module is active.")
        //     } else return false;
        // })
        // TODO: If there are multiple (green) status messages, the next line will fail
        cy.get('.messages--status > .messages__content').should('contain', 'SMTP module is active.')
        cy.get('#edit-smtp-test-address').type(email)
        cy.get('#edit-submit').click()
        
        cy.get('.messages__list').should('contain', 'SMTP module is active.')
        cy.get('.messages__list').should('contain', `A test e-mail has been sent to ${email} via SMTP.`)
        cy.get('.messages--error').should('not.exist') 
    })

    it("Attempts to send a message to an invalid test email; checks for errors", () => {
        
        const email = 'asdf'
        
        cy.get('#edit-smtp-test-address').type(email)
        cy.get('#edit-submit').click()

        cy.get('.messages--error').should('have.length', 1)
        cy.get('.messages--error').should('contain', 'The provided test e-mail address is not valid.')
        cy.get('.messages--status > .messages__content').should('contain', 'SMTP module is active.')
    })

    it("Resets smtp test email address so it's not captured by config", () => {
        // cy.get('#edit-smtp-test-address').type('');
        cy.get('#edit-submit').click();
    })
})