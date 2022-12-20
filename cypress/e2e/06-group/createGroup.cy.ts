/// <reference types="cypress" />
import {Group, User} from '../../support/index';
describe('Test group edit and create group features', () => {
  let user1: User;
  let user2: User;
  let group1: Group;

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
  })

  it('1. Creates a group', () => {
    cy.visit('')
    cy.login(user1.email, user1.password)
    cy.get('#create-cy').click()
    cy.get('[data-cy="group"]').click()
    cy.fillCreateGroupForm(group1, user1)
    cy.searchGroup(group1)
    cy.openGroupList()
    cy.contains(group1.name).click()
    cy.contains('#Mitglieder', group1.numberOfStartMembers)
  })

  it('2. Changes a groups wiki exept image', () => {
    cy.visit('')
    cy.login(user1.email, user1.password)
    cy.openGroupList()
    cy.contains(group1.name).click()
    cy.get('#edit-cy').click()
    cy.get('[data-cy="group-edit"]').click()
    cy.fillChangeGroupForm(group1)
    cy.get('[data-cy="backButton"]').click()
    cy.openGroupAndWaitForGroupData()
    cy.checkGroupWikiDataAndVisibilityExeptImage(group1)
  })

  it('3. User 1 uploads new group Image & it is displayed on the groups wiki', () => {
    cy.visit('')
    cy.login(user1.email, user1.password)
    cy.openGroupList()
    cy.contains(group1.name).click()
    cy.get('#edit-cy').click()
    cy.get('[data-cy="group-edit"]').click()
    cy.contains('Choose').and('be.visible')
    cy.get('input[type=file]').selectFile('./cypress/images/user2.jpg', { force: true })
    cy.clickBackButton()
    cy.openGroupAndWaitForGroupData()
    cy.checkIfImageExists()
  })

})
