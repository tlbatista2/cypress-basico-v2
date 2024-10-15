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
    cy.get('#email').type('tlbatista@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {  
    cy.get('#firstName').type('Tiago')
    cy.get('#lastName').type('Lira')
    cy.get('#email').type('tlbatista@gmail,com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('campo de telefone continua vazio quando preenchido com valor não numérico', function() {
    cy.get('#phone')
      .type('abcdefghijkl')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    
    cy.get('#firstName').type('Tiago')
    cy.get('#lastName').type('Lira')
    cy.get('#email').type('tlbatista@gmail.com')
    cy.get('#phone-checkbox')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    
    cy.get('#firstName')
      .type('Tiago')
      .should('have.value', 'Tiago')
      .clear()
      .should('have.value', '')
     
    cy.get('#lastName')
      .type('Lira')
      .should('have.value', 'Lira')
      .clear()
      .should('have.value', '') 
      
      cy.get('#email')
      .type('tlbatista@gmail.com')
      .should('have.value', 'tlbatista@gmail.com')
      .clear()
      .should('have.value', '')
      
    cy.get('#phone')
      .type('12345678')
      .should('have.value', '12345678')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (Youtube) por seu texto', function() {
    cy.get('#product')
      .select('Youtube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function() {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')

  })

  it('seleciona um produto (Blog) por seu índice', function() {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it.only('marca o tipo de atendimento "Feedback ', function() {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')

  })

})