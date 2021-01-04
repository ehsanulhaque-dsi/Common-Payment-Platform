import 'cypress-iframe'
// https://customer-cpp.labs.bka.sh/ehsan/cokeshop/

describe('The Home Page', () => {

  for (var i = 0; i < 2 ; i++) {

    it('successfully loads', () => {
      cy.visit('https://customer-cpp.labs.bka.sh/ehsan/ca-cricket/', { 
        failOnStatusCode: false
      })
    })

    it('Click the pay now button', () => {
      cy.get('.v-btn').click()
    })

    it('Fill valid payment information ', () => {
      var amount = Math.floor((Math.random() * 2000) + 1);

      cy.get('[name=amount]').type(amount)
      cy.get('[name=customerPhoneNumber]').type("01987603822")
      cy.get('.v-btn').click()

    })

    it('Process payment using bkash', () => {

      cy.wait(5000)
      cy.frameLoaded()

      cy.get('iframe')
        .then(($iframe) => {
          const $body = $iframe.contents().find('body')

          cy.wrap($body)
            .find('#wallet')
            .type('01770618575')

          cy.wrap($body)
            .find('#submit_button')
            .click()

          cy.wrap($body)
            .find('#otp')
            .type('123456')

          cy.wrap($body)
            .find('#submit_button')
            .click()

          cy.wrap($body)
            .find('#pin')
            .should('be.visible')
            .type('12121')

          cy.wrap($body)
            .find('#submit_button')
            .click()
        })

      cy.get('.v-btn--contained', {
        timeout: 15000
      }).should('be.visible').click()

    })
  }


})