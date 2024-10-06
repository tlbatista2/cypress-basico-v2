/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
 beforeEach(function() {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.visit('./src/index.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it.only('preenche os campos obrigatórios e envia formulário', function() {
    cy.get('#firstName').type('Tiago')
    cy.get('#lastName').type('Lira')
    cy.get('#email').type('tlbatista2@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })
})