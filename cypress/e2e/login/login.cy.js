describe('Run Login', () => {
  it('Visits the Login Page and logs in', () => {
    cy.visit('https://d9.airwaycentre.ubc.ca.lndo.site/user/login')
    cy.contains('Sign in')
    cy.get('#edit-name').click().type(Cypress.env('username'))
    cy.get('#edit-pass').click().type(Cypress.env('password'), { log: false })
    cy.get('#edit-submit').click()
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
  })
})
