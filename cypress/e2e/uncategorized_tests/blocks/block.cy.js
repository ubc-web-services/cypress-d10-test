import { doLogin } from "../../helpers/helpers.cy.js"

describe('Generic Test Suite - Blocks', () => {
    beforeEach((() => {
        cy.doLogin();
    }))
    
    it('adds a block, places it on frontpage', () => {
        const blockName = 'CypressTestBlock123';

        // ADD A BLOCK
        cy.visit('/block/add/basic');
        
        cy.get('[data-drupal-selector="edit-info-0-value"]').click().type(blockName);
        cy.get('[data-drupal-selector="edit-submit"]').click();

        // Place block on frontpage (NOTE: needs a frontpage to work)
        cy.visit('admin/structure/block');
        cy.get('[data-drupal-selector="edit-blocks-region-content-title"]').click();
        cy.get('input[data-element=".block-add-table"]').type(blockName);
        // TODO: find a way to place the newly made block here


        // NOTE: Deleting the block (cleanup) is unnecessary because this is an isolated environment (lando, gh actions)
    })
})