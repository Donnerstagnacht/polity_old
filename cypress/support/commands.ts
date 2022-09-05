/// <reference types="cypress" />
import { Group, User } from "."

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
  cy.wait(2000)
  // Navigate to
  cy.url().should('include', 'profile')
  cy.wait(2000)
})

Cypress.Commands.add('logout', () => {
  // Setup
  cy.get('#profile-cy').click()
  cy.get('#edit-cy').click()
  cy.get('[data-cy="logout"]').click()

    // Navigate to
    cy.url().should('include', 'login')
})

Cypress.Commands.add('navigateFromProfileWikiToEditProfile', () => {
  cy.get('#profile-cy').click()
  cy.wait(1000)
  cy.get('#edit-cy').click()
  cy.wait(1000)
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
  cy.wait(1000)
})

Cypress.Commands.add('fillChangeGroupForm', (group: Group) => {
  cy.get('[data-cy="about"]').clear().type(group.about)
  cy.get('[data-cy="contactEmail"]').clear().type(group.contactEmail)
  cy.get('[data-cy="contactPhone"]').clear().type(group.contactPhone)
  cy.get('[data-cy="street"]').clear().type(group.street)
  cy.get('[data-cy="postCode"]').clear().type(group.postCode)
  cy.get('[data-cy="city"]').clear().type(group.city)
  cy.get('[data-cy="updateGroupInformationButton"]').click()
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

Cypress.Commands.add('checkGroupWikiDataAndVisibilityExeptImage', (group: Group) => {
  cy.contains(group.name)
  cy.wait(4000)
  cy.wait(100)
  cy.wait(100)
  cy.wait(100)

  cy.contains(group.about).and('be.visible')

  cy.contains('Kontakt').click()
  cy.wait(4000)
  cy.wait(100)
  cy.wait(100)
  cy.wait(100)

  cy.contains(group.contactEmail).and('be.visible')
  cy.contains(group.contactPhone).and('be.visible')
  cy.contains(group.street).and('be.visible')
  cy.contains(group.postCode).and('be.visible')
  cy.contains(group.city).and('be.visible')

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

Cypress.Commands.add('fillCreateGroupForm', (group: Group, user: User) => {
 // cy.get('[data-cy="name"]').clear()
  cy.get('#name-input').clear().type(group.name)
  // cy.get('[data-cy="about"]').clear()
  cy.get('#about-input').clear().type(group.about)
  cy.contains(group.level).click()
  cy.contains('Vorwärts').click()

  cy.contains(group.name)
  cy.contains(group.about)
  cy.contains(group.level)
  cy.contains(user.name)
  // cy.contains('ERSTELLEN').click()
  cy.get('[data-cy="create-group-button"]').click()
})

Cypress.Commands.add('searchGroup', (group: Group) => {
  cy.get('#search-cy').click()
  cy.get('[data-cy="search-tab-view"]').within((tabView) => {
    cy.contains('span', 'GRUPPEN').parent().click()
  })
  // cy.contains('span', 'GRUPPEN').click()
  // Type searchstring
  cy.get('[data-cy="searchBar"]').type(group.ftsName).type('{enter}')
  // check if search results appear
  cy.contains(group.name).click()
  // checks if click on search result redirects to requested page
  cy.url().should('include', 'groups')
  cy.contains(group.name)
  cy.contains(group.about)
})

Cypress.Commands.add('openChatWithUser', (user: User) => {
  cy.get('#orga-cy').click()
  cy.get('[data-cy="filter-chats"]')
    .type(user.name)
    .type('{enter}')
  cy.wait(4000)
  cy.wait(100)
  cy.wait(100)
  cy.wait(100)
  cy.contains(user.name).click()
  cy.wait(1000)
  cy.contains(user.name)
})

Cypress.Commands.add('openChatWithGroup', (group: Group) => {
  cy.get('#orga-cy').click()
  cy.get('[data-cy="filter-chats"]')
    .type(group.name)
    .type('{enter}')
  cy.wait(4000)
  cy.wait(100)
  cy.wait(100)
  cy.wait(100)
  cy.contains(group.name).click()
  cy.wait(1000)
  cy.contains(group.name)
})

Cypress.Commands.add('clickFollowButtonWithoutCheck', (user: User) => {
  cy.get('#search-cy').click()
  cy.searchUser(user)
  cy.wait(4000)
  cy.get('[data-cy="followButton"]').click()
})
