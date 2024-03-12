describe('CLF Header Test Suite', () => {

    beforeEach((() => {
        cy.visit('/');
    }))

    it('contains ubc header', () =>{
        cy.get('[id="ubc7-header"]').should('exist');
    })

    it('contains ubc header top border', () =>{
        cy.get('[id="ubc7-header"]').should('have.css', 'border-top', '3px solid rgb(0, 33, 69)');
    })

    it('ubc logo and banner redirects to ubc.ca', () =>{
        cy.get('[id="ubc7-logo"]').children().should('have.attr', 'href').and('equal', 'https://www.ubc.ca');
        cy.get('[id="ubc7-wordmark"]').children().should('have.attr', 'href').and('equal', 'https://www.ubc.ca');
    })

    it('test header global search button', () =>{
        cy.get('[data-bs-target="#ubc7-global-menu"]').click();
    })

    it('test number of links in header', ()=>{
        cy.get('[data-bs-target="#ubc7-global-menu"]').click();
        cy.get('[id="ubc7-global-header"] > .row-fluid > .offset2 > .reverse').should('exist');
        cy.get('[id="ubc7-global-header"] > .row-fluid > .offset2 > .reverse >').should('have.length', 8);
    })

    it('contains ubc unit', () =>{
        cy.get('[id="ubc7-unit-name"]').should('exist');
    })

    it('test ubc unit redirection', () =>{
        cy.get('[id="ubc7-unit-name"]').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    it('contains ubc unit menu nav bar', () =>{
        cy.get('[id="ubc7-unit-menu"]').should('exist');
    })

})