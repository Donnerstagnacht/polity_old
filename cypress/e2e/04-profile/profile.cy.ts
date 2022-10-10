/// <reference types="cypress" />
import {User} from '../../support/index';
describe('Tests Profile features', () => {
  let user1: User;
  let user2: User;

  before(() => {
    cy.fixture('user1').then((user: User) => {
      user1 = user;
    })
    cy.fixture('user2').then((user: User) => {
      user2 = user;
    })
  })

  beforeEach(() => {
    cy.viewport(1024, 514)
  })

  it('1. User 1 edits Profile & changes are displayed on profile wiki', () => {
    cy.visit('')
    cy.login(user1.email, user1.password)
    cy.navigateFromProfileWikiToEditProfile()
    cy.fillChangeProfileForm(user1)
    cy.clickBackButton()
    cy.openProfileAndWaitForProfileData()
    cy.checkUserWikiDataAndVisibilityExeptImage(user1)
  })

  it('2. User 1 uploads new Profile Image & it is displayed on users profile wiki', () => {
    cy.get('#profile-cy')
    cy.navigateFromProfileWikiToEditProfile()
    cy.uploadImage('C:/Users/Tobi/polity/src/assets/images/tobi1.jpg')
    cy.clickBackButton()
    cy.openProfileAndWaitForProfileData()
    cy.checkIfImageExists()
  })

  it('3. Logs user 1 out', () => {
    cy.logout();
  })

  it('4. User 2 edits Profile & changes are displayed on profile wiki', () => {
    cy.login(user2.email, user2.password)
    cy.navigateFromProfileWikiToEditProfile()
    cy.fillChangeProfileForm(user2)
    cy.clickBackButton()
    cy.openProfileAndWaitForProfileData()
    cy.checkUserWikiDataAndVisibilityExeptImage(user2)
  })

  it('5. User 2 uploads new Profile Image & it is displayed on users profile wiki', () => {
    cy.get('#profile-cy')
    cy.navigateFromProfileWikiToEditProfile()
    cy.uploadImage('C:/Users/Tobi/polity/src/assets/images/tobi2.jpg')
    cy.clickBackButton()
    cy.openProfileAndWaitForProfileData()
    cy.checkIfImageExists()
  })

  it('Logs user 2 out', () => {
    cy.logout();
  })
})