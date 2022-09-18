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
    // sets it up for laptop-screens
    cy.login(user1.email, user1.password)
    // navigate to change Profile Form
    cy.navigateFromProfileWikiToEditProfile()
    // fill form
    cy.wait(2000)
    cy.wait(100)
    cy.wait(100)
    cy.wait(100)
    cy.fillChangeProfileForm(user1)
    // navigate to profile wiki
    cy.get('[data-cy="backButton"]').click()
    cy.get('#overview-cy').click()
    // check if data is diplayed
    cy.wait(2000)
    cy.wait(100)
    cy.wait(100)
    cy.wait(100)
    cy.checkUserWikiDataAndVisibilityExeptImage(user1)
  })

  it('2. User 1 uploads new Profile Image & it is displayed on users profile wiki', () => {
    cy.get('#profile-cy')
    cy.navigateFromProfileWikiToEditProfile()
    // checks if upload button exists and selects a file
    cy.contains('Choose').and('be.visible')
    cy.get('input[type=file]').selectFile('C:/Users/Tobi/polity/src/assets/images/tobi.jpg', { force: true })

    // navigate to profile wiki
    cy.get('[data-cy="backButton"]').click()
    cy.get('#overview-cy').click()

    cy.wait(10000)
    cy.wait(100)
    cy.wait(100)
    cy.wait(100)


    // check if image exists on profile wiki page
    cy.get('img')
      .wait(10000)
      .wait(100)
      .wait(100)
      .wait(100)
      .should('be.visible')
      .and(($img: JQuery<HTMLImageElement>) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0)
      })
  })

  // repeating code to setup user 2 (no test - more a setup for other tests )
  // code could be refactored
  it('3. Logs user 1 out', () => {
    cy.logout();
    cy.wait(4000)
  })

  it('4. User 2 edits Profile & changes are displayed on profile wiki', () => {
    // sets it up for laptop-screens
    cy.wait(1000)

    cy.login(user2.email, user2.password)
    // navigate to change Profile Form
    cy.navigateFromProfileWikiToEditProfile()
    // fill form
    cy.wait(2000)
    cy.wait(100)
    cy.wait(100)
    cy.wait(100)
    cy.fillChangeProfileForm(user2)
    // navigate to profile wiki
    cy.get('[data-cy="backButton"]').click()
    cy.get('#overview-cy').click()
    // check if data is diplayed
    cy.wait(2000)
    cy.wait(100)
    cy.wait(100)
    cy.wait(100)
    cy.checkUserWikiDataAndVisibilityExeptImage(user2)
  })

  it('5. User 2 uploads new Profile Image & it is displayed on users profile wiki', () => {
    cy.get('#profile-cy')
    cy.navigateFromProfileWikiToEditProfile()
    // checks if upload button exists and selects a file
    cy.contains('Choose').and('be.visible')
    cy.get('input[type=file]').selectFile('C:/Users/Tobi/polity/src/assets/images/tobi2.jpg', { force: true })

    // navigate to profile wiki
    cy.get('[data-cy="backButton"]').click()
    cy.get('#overview-cy').click()
    cy.wait(10000)
    .wait(100)
    .wait(100)
    .wait(100)

    // check if image exists on profile wiki page
    cy.get('img')
    .wait(10000)
    .wait(100)
    .wait(100)
    .wait(100)
      .should('be.visible')
      .and(($img: JQuery<HTMLImageElement>) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0)
      })
  })

  it('Logs user 2 out', () => {
    cy.logout();
  })
})
