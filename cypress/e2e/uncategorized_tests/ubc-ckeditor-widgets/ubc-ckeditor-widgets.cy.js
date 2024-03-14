import { doLogin } from "../../helpers/helpers.cy.js"

describe("Checks for ckeditor widget stuff", {testIsolation: false}, () => {
    
    beforeEach(() => {
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
        cy.visit('/admin/config/content/ubc-ckeditor-widgets');
    })

    it("Checks whether ckeditor widgets have any configuration at all", () => {
        cy.get('#edit-background-colors').should('not.be.empty');     
        cy.get('#edit-padding-styles').should('not.be.empty');         
        cy.get('#edit-margin-styles').should('not.be.empty');          
        cy.get('#edit-gap-styles').should('not.be.empty');     
        cy.get('#edit-table-styles').should('not.be.empty');     
        cy.get('#edit-three-column-layout-styles').should('not.be.empty');     
        cy.get('#edit-two-column-layout-styles').should('not.be.empty');     
        cy.get('#edit-width-styles').should('not.be.empty');     
    })

    it("Checks that the background color configuration is correct", () => {
        // Check to see whether text box contains all necessary configuration (Case sensitive, order insensitive)
        cy.get('#edit-background-colors').should(($ebc) => {
            expect($ebc).contains(/bg-transparent ?| ?None/);
            expect($ebc).contains(/bg-white ?| ?White/);
            expect($ebc).contains(/bg-grey-100 ?| ?Light Grey/);
            expect($ebc).contains(/bg-unit-primary ?| ?Unit Primary/);
            expect($ebc).contains(/bg-unit-secondary ?| ?Unit Secondary/);
            expect($ebc).contains(/bg-unit-tertiary ?| ?Unit Tertiary/);
            expect($ebc).contains(/bg-unit-accent ?| ?Unit Accent/);
            expect($ebc).contains(/bg-ubc-blue ?| ?UBC Blue/);
            expect($ebc).contains(/bg-ubc-blue-sea ?| ?UBC Blue Sea/);
            expect($ebc).contains(/bg-ubc-blue-cobalt ?| ?UBC Blue Cobalt/);
            expect($ebc).contains(/bg-ubc-blue-neptune ?| ?UBC Blue Neptune/);
            expect($ebc).contains(/bg-ubc-blue-cornflower ?| ?UBC Blue Cornflower/);
            expect($ebc).contains(/bg-ubc-blue-polar ?| ?UBC Blue Polar/);
            expect($ebc).contains(/bg-ubc-blue-frost ?| ?UBC Blue Frost/);
        })
    })

    it("Checks padding styles", () => {
        cy.visit('/admin/config/content/ubc-ckeditor-widgets');

        cy.get('#edit-padding-styles').should(($eps) => {
            expect($eps).contains(/p-0 ?| ?None/);
            expect($eps).contains(/p-4 ?| ?Small/);
            expect($eps).contains(/p-6 ?| ?Normal/);
            expect($eps).contains(/p-12 ?| ?Large/);
            expect($eps).contains(/p-16 ?| ?Extra Large/);
        })
    })
    
    it("Checks margin styles", () => {
        cy.visit('/admin/config/content/ubc-ckeditor-widgets');

        cy.get('#edit-margin-styles').should(($egs) => {
            expect($egs).contains(/my-0 ?| ?None/);
            expect($egs).contains(/my-4 ?| ?Small/);
            expect($egs).contains(/my-6 ?| ?Normal/);
            expect($egs).contains(/my-12 ?| ?Large/);
            expect($egs).contains(/my-16 ?| ?Extra Large/);
        })
    })

    it("Checks gap styles", () => {
        cy.visit('/admin/config/content/ubc-ckeditor-widgets');

        cy.get('#edit-gap-styles').should(($ems) => {
            expect($ems).contains(/gap-0 ?| ?None/);
            expect($ems).contains(/gap-4 ?| ?Small/);
            expect($ems).contains(/gap-6 ?| ?Normal/);
            expect($ems).contains(/gap-12 ?| ?Large/);
            expect($ems).contains(/gap-16 ?| ?Extra Large/);
        })
    })

    it("Checks table styles", () => {
        cy.visit('/admin/config/content/ubc-ckeditor-widgets');

        cy.get('#edit-table-styles').should(($ets) => {
            expect($ets).contains(/table--nostyle ?| ?None/);
            expect($ets).contains(/table--plain ?| ?Plain/);
            expect($ets).contains(/table--condensed ?| ?Condensed/);
            expect($ets).contains(/table--striped ?| ?Striped/);
            expect($ets).contains(/table--hover ?| ?Stripe on hover/);
        })
    })

    it("Checks three column layout styles", () => {
        cy.visit('/admin/config/content/ubc-ckeditor-widgets');

        cy.get('#edit-three-column-layout-styles').should(($etcls) => {
            expect($etcls).contains(/align-equal ?| ?Equal Width/);
            expect($etcls).contains(/align-large-left ?| ?Align Large Left/);
            expect($etcls).contains(/align-large-center ?| ?Align Large Center/);
            expect($etcls).contains(/align-large-right ?| ?Align Large Right/);
        })
    })

    it("Checks two column layout styles", () => {
        cy.visit('/admin/config/content/ubc-ckeditor-widgets');

        cy.get('#edit-two-column-layout-styles').should(($etcls) => {
            expect($etcls).contains(/align-equal ?| ?Equal Width/);
            expect($etcls).contains(/align-large-left ?| ?Align Large Left/);
            expect($etcls).contains(/align-large-right ?| ?Align Large Right/);
        })
    })

    it("Checks width styles", () => {
        cy.visit('/admin/config/content/ubc-ckeditor-widgets');

        cy.get('#edit-width-styles').should(($ews) => {
            expect($ews).contains(/w-auto ?| ?Column width: Auto/);
            expect($ews).contains(/w-half ?| ?Column width: 1\/2/);
            expect($ews).contains(/w-one-third ?| ?Column width: 1\/3/);
            expect($ews).contains(/w-one-quarter ?| ?Column width: 1\/4/);
            expect($ews).contains(/w-one-fifth ?| ?Column width: 1\/5/);
            expect($ews).contains(/w-one-sixth ?| ?Column width: 1\/6/);
        })
    })
})