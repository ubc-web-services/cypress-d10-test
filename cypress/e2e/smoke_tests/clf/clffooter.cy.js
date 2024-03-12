describe('CLF Footer Test Suite', () => {
    beforeEach((() => {
        cy.visit('/');
    }))

    it('contains ubc unit footer', () =>{
        cy.get('[id="unit-footer"]').should('exist');
    })

    it('contains ubc back to the top', () =>{
        cy.get('[id="totop"]').should('exist');
    })

    it('ubc back to the top interactivity test', () =>{
        cy.get('[id="totop"]').click();
        cy.url().should('not.include', '/#')
        cy.get('[id="ubc7-header"]').should('be.visible')

    })

    it('contains ubc footer', () =>{
        cy.get('[id="ubc7-global-footer"]').should('exist');
    })

    it('test ubc global footer color and height', () =>{
        cy.get('[id="ubc7-global-footer"]').should('have.css', 'background-color', 'rgb(0, 33, 69)');
        cy.get('[id="ubc7-global-footer"]').invoke('height').should('be.gt', 100);
    })

    it('contains ubc minimial footer', () =>{
        cy.get('[id="ubc7-minimal-footer"]').should('exist');
    })

    it('test ubc minimal footer css and height', () =>{
        cy.get('[id="ubc7-minimal-footer"]').should('have.css', 'background-color', 'rgb(0, 33, 69)');
        cy.get('[id="ubc7-minimal-footer"]').should('have.css', 'padding-top', '20px');
    })
})