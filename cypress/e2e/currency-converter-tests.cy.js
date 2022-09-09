const CURRENCIES = ["AUD","BRL", "CNY", "EUR", "HKD", "INR", "IDR", "JPY", "MYR", "MXN", "NZD", "NOK", "PEN", "RUB", "SAR", "SGD", "ZAR", "KRW", "SEK", "CHF","TWD", "THB", "TRY", "GBP", "USD", "VND"]

describe ('Currency Converter Test Cases', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/')
    }) 

    it('Verify that dates with no rates available displays the correct error message', () => {
        // Use fixture with no rates
        cy.intercept('GET', '/valet/observations/**', { fixture: 'noRates.json' }).as('getRates')
        cy.wait('@getRates').its('response').then(response => {
            // Assert that the call to https://www.bankofcanada.ca for rates is successfull
            expect(response.statusCode).to.equal(200)
            expect(response.body.observations).to.be.empty
        })

        // Assert that the appropriate error message is displayed when no rates are available
        cy.get('h1').contains('No rates available for the ')
    })
    
    it('Verify that rates used for conversions are done based on the date\'s rate', () => {
        //Use fixture with all rates
        cy.intercept('GET', '/valet/observations/**', { fixture: 'allRates.json' }).as('getRates')
        cy.wait('@getRates').its('response').then(response => {
            // Assert that the call to https://www.bankofcanada.ca for rates is successfull
            expect(response.statusCode).to.equal(200)
            cy.get('select.form-element').select('AUD').should('have.value', 'FXAUDCAD')

            const rate = response.body.observations[0].FXAUDCAD.v

            // Assert that the conversion with 1 unit of the foreign currency to CAD is correct
            cy.get('.converter > :nth-child(1) > input.form-element').click().clear().type('1').should('have.value', '1')
            let conversion = 1 * rate
            cy.get('body > app-root > app-currency-converter > div.converter > div:nth-child(3) > input').should('have.value', Number(conversion.toFixed(4)))
        })

        cy.intercept('/valet/observations/**', (req) => {
            req.continue()
        })

        // Set date picker to use older date's rates
        cy.get('#date').click().type('2022-09-06')

        // Use fixture with old rates that differ from the previously used fixture
        cy.intercept('GET', '/valet/observations/**', { fixture:  'oldRates.json' }).as('getOldRates')
        cy.wait('@getOldRates').its('response').then(response => {
            // Assert that the call to https://www.bankofcanada.ca for rates is successfull
            expect(response.statusCode).to.equal(200)
            cy.get('select.form-element').select('AUD').should('have.value', 'FXAUDCAD')

            const rate = response.body.observations[0].FXAUDCAD.v

            // Assert that the conversion with 1 unit of the foreign currency to CAD is correct
            cy.get('.converter > :nth-child(1) > input.form-element').click().clear().type('1').should('have.value', '1')
            let conversion = 1 * rate
            cy.get('body > app-root > app-currency-converter > div.converter > div:nth-child(3) > input').should('have.value', Number(conversion.toFixed(4)))
        })
    })

    // Create test cases for each currency available
    for (let i = 0; i < CURRENCIES.length; i++) {
        it(`Verify that ${CURRENCIES[i]} converts to CAD with the appropriate rate`, () => {
            cy.intercept('GET', '/valet/observations/**', { fixture: 'allRates.json' }).as('getRates')
            cy.wait('@getRates').its('response').then(response => {
                // Assert that the call to https://www.bankofcanada.ca for rates is successfull
                expect(response.statusCode).to.equal(200)
                const rates = response.body.observations[0]
                let rate = 0
                for (const property in rates) {
                    if (property === `FX${CURRENCIES[i]}CAD`) {
                        rate = rates[property].v
                        break
                    }
                }

                // Assert that there is a rate returned
                expect(rate).to.not.equal(0)
                cy.get('select.form-element').select(CURRENCIES[i]).should('have.value', `FX${CURRENCIES[i]}CAD`)

                // Assert that the conversion with 1 unit of the foreign currency to CAD is correct
                cy.get('.converter > :nth-child(1) > input.form-element').click().clear().type('1').should('have.value', '1')
                let conversion = 1 * rate
                cy.get('body > app-root > app-currency-converter > div.converter > div:nth-child(3) > input').should('have.value', Number(conversion.toFixed(4)))

                // Assert that the conversion with 0 units of the foreign currency to CAD is 0
                cy.get('.converter > :nth-child(1) > input.form-element').click().clear().type('0').should('have.value', '0')
                conversion = 0 * rate
                cy.get('body > app-root > app-currency-converter > div.converter > div:nth-child(3) > input').should('have.value', conversion)

                // Assert that the conversion with a negative amount of units of the foreign currency to CAD is correct
                cy.get('.converter > :nth-child(1) > input.form-element').click().clear().type('-1').should('have.value', '-1')
                conversion = -1 * rate
                cy.get('body > app-root > app-currency-converter > div.converter > div:nth-child(3) > input').should('have.value', Number(conversion.toFixed(4)))

                // Assert that the conversion with a decimal number amount of units of the foreign currecny to CAD is correct
                cy.get('.converter > :nth-child(1) > input.form-element').click().clear().type('.0001').should('have.value', '.0001')
                conversion = .0001 * rate
                cy.get('body > app-root > app-currency-converter > div.converter > div:nth-child(3) > input').should('have.value', Number(conversion.toFixed(4)))
                
                // Assert that when trying to input a non number, that nothing is entered and the converted value is 0
                cy.get('.converter > :nth-child(1) > input.form-element').click().clear().type('a').should('be.empty')
                cy.get('body > app-root > app-currency-converter > div.converter > div:nth-child(3) > input').should('have.value', 0)
                cy.get('.converter > :nth-child(1) > input.form-element').click().clear().type(';').should('be.empty')
                cy.get('body > app-root > app-currency-converter > div.converter > div:nth-child(3) > input').should('have.value', 0)
                cy.get('.converter > :nth-child(1) > input.form-element').click().clear().type('.').should('be.empty')
                cy.get('body > app-root > app-currency-converter > div.converter > div:nth-child(3) > input').should('have.value', 0)
            })

        })

        it(`Verify that CAD converts to ${CURRENCIES[i]} with the appropriate rate`, () => {
            cy.intercept('GET', '/valet/observations/**', { fixture: 'allRates.json' }).as('getRates')
            cy.wait('@getRates').its('response').then(response => {
                // Assert that the call to https://www.bankofcanada.ca for rates is successfull
                expect(response.statusCode).to.equal(200)
                const rates = response.body.observations[0]
                let rate = 0
                for (const property in rates) {
                    if (property === `FX${CURRENCIES[i]}CAD`) {
                        rate = rates[property].v
                        break
                    }
                }

                // Assert that there is a rate returned
                expect(rate).to.not.equal(0)
                cy.get('select.form-element').select(CURRENCIES[i]).should('have.value', `FX${CURRENCIES[i]}CAD`)
                
                cy.get('img').click()
                
                // Assert that the conversion of 1 dollar CAD to the foreign currency is correct
                cy.get('body > app-root > app-currency-converter > div.converter > div:nth-child(3) > input').click().clear().type('1').should('have.value', '1')
                let conversion = 1 / rate
                cy.get('.converter > :nth-child(1) > input.form-element').should('have.value', Number(conversion.toFixed(4)))

                // Assert that the conversion with 0 dollars CAD to the foreign currency is 0
                cy.get('body > app-root > app-currency-converter > div.converter > div:nth-child(3) > input').click().clear().type('0').should('have.value', '0')
                conversion = 0 / rate
                cy.get('.converter > :nth-child(1) > input.form-element').should('have.value', conversion)

                // Assert that the conversion with a negative amount of dollars CAD to the foreign currency is correct
                cy.get('body > app-root > app-currency-converter > div.converter > div:nth-child(3) > input').click().clear().type('-1').should('have.value', '-1')
                conversion = -1 / rate
                cy.get('.converter > :nth-child(1) > input.form-element').should('have.value', Number(conversion.toFixed(4)))

                // Assert that the conversion with a decimal number amount of CAD to the foreign currecny is correct
                cy.get('body > app-root > app-currency-converter > div.converter > div:nth-child(3) > input').click().clear().type('.0001').should('have.value', '.0001')
                conversion = .0001 / rate
                cy.get('.converter > :nth-child(1) > input.form-element').should('have.value', Number(conversion.toFixed(4)))
                
                // Assert that when trying to input a non number, that nothing is entered and the converted value is 0
                cy.get('body > app-root > app-currency-converter > div.converter > div:nth-child(3) > input').click().clear().type('a').should('be.empty')
                cy.get('.converter > :nth-child(1) > input.form-element').should('have.value', 0)
                cy.get('body > app-root > app-currency-converter > div.converter > div:nth-child(3) > input').click().clear().type(';').should('be.empty')
                cy.get('.converter > :nth-child(1) > input.form-element').should('have.value', 0)
                cy.get('body > app-root > app-currency-converter > div.converter > div:nth-child(3) > input').click().clear().type('.').should('be.empty')
                cy.get('.converter > :nth-child(1) > input.form-element').should('have.value', 0)
            })
        })
    }
})