/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
 beforeEach(function() {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.visit('./src/index.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia formulário', function() {
    const longText = 'lorem ipsum teste lorem ipsum teste lorem ipsum teste lorem ipsum teste lorem ipsum teste'
    cy.get('#firstName').type('Tiago')
    cy.get('#lastName').type('Lira')
    cy.get('#email').type('tlbatista2@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    
    cy.get('#firstName').type('Tiago')
    cy.get('#lastName').type('Lira')
    cy.get('#email').type('tlbatista2@gmail,com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })


})