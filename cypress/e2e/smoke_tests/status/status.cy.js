describe('Generic Test Suite - Status Page', {testIsolation: false}, () => {

    // Variables to compare versions
    // ------------------------------------------------------------
    const minDrupalVersion = [9, 5, 0];     // Drupal version 9.5.0
    const maxDrupalVersion = [10, 4, 4];    // Drupal version 10.4.4
    const minPHPVersion = [8, 1, 0];        // PHP version 8.1.0
    const maxPHPVersion = [8, 2, 0];        // PHP version 8.5.0
    // ------------------------------------------------------------

    beforeEach((() => {
        cy.doLogin();
        cy.visit('admin/reports/status');
    }))

    it('Can access status page', () => {
        cy.get('.page-title').contains('Status report');
    })

    it('Checks Drupal version is within range', () => {
        cy.get('.system-status-general-info__items > :nth-child(1)').contains(/[0-9]*\.[0-9]*\.[0-9]*/).then(($version) => {
            const version = $version.text().split('Version')[1];
            cy.compareVersions(version, minDrupalVersion, maxDrupalVersion);
        })
    })

    it('Checks PHP version is within range', () => {
        cy.get('.system-status-general-info__items > :nth-child(4)').contains(/[0-9]*\.[0-9]*\.[0-9]*/).then(($version) => {
            const version = $version.text().match(/\d+\.\d+\.\d+/g)[0];
            cy.compareVersions(version, minPHPVersion, maxPHPVersion);
        })
    })

    // TODO: THERE ARE ALWAYS ERRORS AND WARNINGS!
    
    // it('Checks if there are errors', () => {
    //     cy.get('.system-status-report-counters > :nth-child(1)').contains(/[0-9]* Errors/).should('contain', '0 Errors');
    // })

    // it('Checks if there are warnings', () => {
    //     cy.get('.system-status-report-counters > :nth-child(2)').contains(/[0-9]* Warnings/).should('contain', '0 Warnings');
    // })

    it('Checks that PHP APCu is enabled', () => {
        cy.get('.system-status-report__row')
            .contains('.system-status-report__status-title', 'PHP APCu caching')
            .parent().within(() => {
                cy.get('.system-status-report__entry__value').then(($value) => {
                    const text = $value.text().trim();
                    cy.log(text);
                    expect(text).to.match(/^Enabled/);
                })
            })
    })
})
