/// <reference types="cypress" />

import { User } from "."

Cypress.Commands.add('register', (name: string, email: string, password: string) => {
  // Setup
  cy.get('#register-cy').click()

  // registers a user
  cy.get('[data-cy="name"]').clear()
  cy.get('[data-cy="name"]').type(name)
  cy.get('[data-cy="email"]').clear()
  cy.get('[data-cy="email"]').type(email)
  cy.get('[data-cy="password"]').clear()
  cy.get('[data-cy="password"]').type(password)
  cy.get('[data-cy="createAccount"]').click()

  // Navigate to login
  cy.url().should('include', 'login')
})

Cypress.Commands.add('login', (email: string, password: string) => {
  // Setup
  cy.get('#login-cy').click()

  // Login a user
  cy.get('[data-cy="email"]').clear();
  cy.get('[data-cy="email"]').type(email);
  cy.get('[data-cy="password"]').clear();
  cy.get('[data-cy="password"]').type(password);
  cy.get('[data-cy="login"]').click();

  // Navigate to
  cy.url().should('include', 'profile')
})

Cypress.Commands.add('logout', () => {
  // cy.pause()
  // Setup
  cy.get('#profile-cy').click()
  cy.get('#edit-cy').click()
  cy.get('[data-cy="logout"]').click()

    // Navigate to
    cy.url().should('include', 'login')
})

Cypress.Commands.add('navigateFromProfileWikiToEditProfile', () => {
  cy.get('#profile-cy').click()
  cy.get('#edit-cy').click()
  cy.get('[data-cy="profile-edit"]').click()
})

Cypress.Commands.add('fillChangeProfileForm', (user: User) => {
  cy.get('[data-cy="name"]').clear()
  cy.get('[data-cy="name"]').type(user.name)
  cy.get('[data-cy="website"]').clear()
  cy.get('[data-cy="website"]').type(user.website)
  cy.get('[data-cy="about"]').clear()
  cy.get('[data-cy="about"]').type(user.about)
  cy.get('[data-cy="contactEmail"]').clear()
  cy.get('[data-cy="contactEmail"]').type(user.contactEmail)
  cy.get('[data-cy="contactPhone"]').clear()
  cy.get('[data-cy="contactPhone"]').type(user.contactPhone)
  cy.get('[data-cy="street"]').clear()
  cy.get('[data-cy="street"]').type(user.street)
  cy.get('[data-cy="postCode"]').clear()
  cy.get('[data-cy="postCode"]').type(user.postCode)
  cy.get('[data-cy="city"]').clear()
  cy.get('[data-cy="city"]').type(user.city)
  cy.get('[data-cy="updateProfileInformationButton"]').click()
})

Cypress.Commands.add('checkUserWikiDataAndVisibilityExeptImage', (user: User) => {
  cy.contains(user.name)
  cy.contains(user.about).and('be.visible')
  cy.contains(user.contactEmail).and('not.be.visible')
  cy.contains(user.contactPhone).and('not.be.visible')
  cy.contains(user.street).and('not.be.visible')
  cy.contains(user.postCode).and('not.be.visible')
  cy.contains(user.city).and('not.be.visible')

  cy.contains('Kontakt').click()
  cy.contains(user.about).and('not.be.visible')
  cy.contains(user.contactEmail).and('be.visible')
  cy.contains(user.contactPhone).and('be.visible')
  cy.contains(user.street).and('be.visible')
  cy.contains(user.postCode).and('be.visible')
  cy.contains(user.city).and('be.visible')

  cy.contains('Über').click()
})


Cypress.Commands.add('uploadProfileImage', () => {
  // Setup
  cy.get('#profile-cy').click()
  cy.get('#edit-cy').click()
  cy.get('[data-cy="logout"]').click()

    // Navigate to
    cy.url().should('include', 'login')
})

Cypress.Commands.add('searchUser', (user: User) => {
  cy.get('#search-cy').click()
  // Type searchstring
  cy.get('[data-cy="searchBar"]').type(user.ftsName).type('{enter}')
  // check if search results appear
  cy.contains(user.name).click()
  // checks if click on search result redirects to requested page
  cy.url().should('include', 'profile')
  cy.contains(user.name)
  cy.contains(user.about)
})
