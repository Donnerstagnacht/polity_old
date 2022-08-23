/// <reference types="cypress" />
import {Group, User} from '../../support/index';
describe('Tests Profile following system', () => {
  let user1: User;
  let user2: User;
  let group1: Group

  before(() => {
    cy.fixture('user1').then((user: User) => {
      user1 = user;
    })
    cy.fixture('user2').then((user: User) => {
      user2 = user;
    })
    cy.fixture('group1').then((group: Group) => {
      group1 = group;
    })
  })

  beforeEach(() => {
    cy.viewport(1024, 514)
    cy.visit('http://localhost:4200')
  })

  it('Creates a group', () => {
    cy.login(user1.email, user1.password)
    cy.get('#create-cy').click()
    cy.get('[data-cy="group"]').click()
    cy.fillCreateGroupForm(group1, user1)
    cy.searchGroup(group1)

    cy.get('#groups-cy').click()
    cy.contains(group1.name).click()
    cy.contains('#Mitglieder', group1.numberOfStartMembers)

    cy.get('#edit-cy').click()
    cy.get('[data-cy="group-edit"]').click()
    cy.fillChangeGroupForm(group1)

    cy.get('[data-cy="backButton"]').click()

    cy.get('#overview-cy').click()
    cy.wait(4000)
    cy.wait(100)
    cy.wait(100)
    cy.wait(100)

    cy.checkGroupWikiDataAndVisibilityExeptImage(group1)
  })

})
