/// <reference types="cypress" />
import {Group, User} from '../../support/index';
describe('Test group edit and create group features', () => {
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
  })

  it('1. Creates a group', () => {
    cy.visit('')
    cy.login(user1.email, user1.password)
    cy.get('#create-cy').click()
    cy.get('[data-cy="group"]').click()
    cy.fillCreateGroupForm(group1, user1)
    cy.searchGroup(group1)

    cy.get('#groups-cy').click()
    cy.contains(group1.name).click()
    cy.contains('#Mitglieder', group1.numberOfStartMembers)

/*     cy.get('#edit-cy').click()
    cy.get('[data-cy="group-edit"]').click()
    cy.fillChangeGroupForm(group1)

    cy.get('[data-cy="backButton"]').click()

    cy.get('#overview-cy').click()
    cy.wait(4000)
    cy.wait(100)
    cy.wait(100)
    cy.wait(100)

    cy.checkGroupWikiDataAndVisibilityExeptImage(group1) */
  })

  it('2. Changes a groups wiki exept image', () => {
    cy.get('#groups-cy').click()
    cy.contains(group1.name).click()
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

  it('3. User 1 uploads new group Image & it is displayed on the groups wiki', () => {
    cy.get('#profile-cy')
    cy.contains(group1.name).click()
    cy.get('#edit-cy').click()
    cy.get('[data-cy="group-edit"]').click()
    // checks if upload button exists and selects a file
    cy.contains('Choose').and('be.visible')
    cy.get('input[type=file]').selectFile('C:/Users/Tobi/polity/src/assets/images/tobi2.jpg', { force: true })

    // navigate to profile wiki
    cy.get('[data-cy="backButton"]').click()
    cy.get('#overview-cy').click()
    cy.wait(6000)
    .wait(100)
    .wait(100)
    .wait(100)

    // check if image exists on profile wiki page
    cy.get('img')
    .wait(5000)
    .wait(100)
    .wait(100)
    .wait(100)
      .should('be.visible')
      .and(($img: JQuery<HTMLImageElement>) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0)
      })
    cy.logout()
  })

})
