describe('/employees', () => {
  before(() => {
    cy.request('DELETE', `${Cypress.env('apiUrl')}/reset-db`)
  })

  it('Should return a empty list of employees', () => {
    cy.visit(`${Cypress.env('baseUrl')}/employees`)
    cy.get('p').contains('Nenhum registro encontrado')
  })

  it('Should create a new employee fails', () => {
    cy.visit(`${Cypress.env('baseUrl')}/employees/new`)
    cy.get('button').contains('Salvar').click()
    cy.get('p').contains('Nome é obrigatório')
  })

  it('Should navigate to the new employee page and creates a new employee successfully', () => {
    cy.intercept('GET', '**/employees/new**').as('new-employee-page')
    cy.intercept('POST', '**/employees').as('create-employee')
    cy.intercept('GET', '**/employees').as('get-employees')
    cy.visit(`${Cypress.env('baseUrl')}/employees`)
    cy.get('a').contains('Novo Funcionário').click()
    cy.wait('@new-employee-page')
    cy.location('pathname').should('eq', '/employees/new')
    cy.get('input[name="name"]').type('John Doe')
    cy.get('button').contains('Salvar').click()
    cy.wait('@create-employee')
    cy.wait('@get-employees')
    cy.get('td').contains('John Doe')
  })

  it('Should navigate to the edit employee page and update the employee successfully', () => {
    cy.intercept('GET', '**/employees/1**').as('get-employee')
    cy.intercept('PUT', '**/employees/1').as('update-employee')
    cy.intercept('GET', '**/employees').as('get-employees')
    cy.visit(`${Cypress.env('baseUrl')}/employees`)
    cy.get('td').contains('John Doe').click()
    cy.wait('@get-employee')
    cy.location('pathname').should('eq', '/employees/1')
    cy.get('input[name="name"]').clear().type('Jane Doe')
    cy.get('button').contains('Salvar').click()
    cy.wait('@update-employee')
    cy.wait('@get-employees')
    cy.get('td').contains('Jane Doe')
  })
})
