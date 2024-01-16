import { cases } from '../../src/app/analyzer/cases';

describe('Analyzer main screen', () => {

  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains("Upcoming Analyzer")
  })

  it('Should toggle the visibility result depending on the card description', () => {
    cy.visit('/');
    cy.contains("Card is not visible")
    cy.get('[formControlName="hasDueDate"]').click()
    cy.contains("Card is visible")
    cy.get('[formControlName="hasDueDate"]').click()
    cy.contains("Card is not visible")
  })

  it('Should en/disable options dynamically which do not make sense', () => {
    cy.visit('/');
    cy.get('[formControlName="someoneElseAssigned"] button').should('be.disabled')
    cy.get('[formControlName="isSharedBoard"]').click()
    cy.get('[formControlName="someoneElseAssigned"] button').should('be.enabled')
    cy.get('[formControlName="isSharedBoard"]').click()
    cy.get('[formControlName="someoneElseAssigned"] button').should('be.disabled')
  })

  it('Should clear options which got disabled, no matter what they were set before', () => {
    cy.visit('/');

    cy.get('[formControlName="someoneElseAssigned"] button').should('be.disabled')
    cy.get('[formControlName="someoneElseAssigned"] button').invoke('attr', 'aria-checked').should('not.eq', 'true')

    cy.get('[formControlName="isSharedBoard"] button').click()
    cy.get('[formControlName="someoneElseAssigned"] button').should('be.enabled')
    cy.get('[formControlName="someoneElseAssigned"] button').invoke('attr', 'aria-checked').should('not.eq', 'true')

    cy.get('[formControlName="isSharedBoard"] button').click()
    cy.get('[formControlName="someoneElseAssigned"] button').should('be.disabled')
    cy.get('[formControlName="someoneElseAssigned"] button').invoke('attr', 'aria-checked').should('not.eq', 'true')

    cy.get('[formControlName="isSharedBoard"] button').click()
    cy.get('[formControlName="someoneElseAssigned"] button').click()
    cy.get('[formControlName="someoneElseAssigned"] button').should('be.enabled')
    cy.get('[formControlName="someoneElseAssigned"] button').invoke('attr', 'aria-checked').should('eq', 'true')

    cy.get('[formControlName="isSharedBoard"] button').click()
    cy.get('[formControlName="someoneElseAssigned"] button').should('be.disabled')
    cy.get('[formControlName="someoneElseAssigned"] button').invoke('attr', 'aria-checked').should('not.eq', 'true')
  })

  it('Should display appropriate hints for input', () => {
    cases.forEach(([description, expected]) => {
      cy.visit('/');

      if (description.isDone) {
        cy.get('[formControlName="isDone"] button').click()
      }
      if (description.isSharedBoard) {
        cy.get('[formControlName="isSharedBoard"] button').click()
      }
      if (description.hasDueDate) {
        cy.get('[formControlName="hasDueDate"] button').click()
      }
      if (description.youAssigned) {
        cy.get('[formControlName="youAssigned"] button').click()
      }
      if (description.someoneElseAssigned) {
        cy.get('[formControlName="someoneElseAssigned"] button').click({ force: true })
      }

      cy.contains(expected);
    });
  })
})