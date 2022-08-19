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
    cy.visit('http://localhost:4200')
  })

  it('User edits Profile & changes are displayed on profile wiki', () => {
    // sets it up for laptop-screens
    cy.viewport(1024, 514)
    cy.login(user1.email, user1.password)
    // navigate to change Profile Form
    cy.navigateFromProfileWikiToEditProfile()
    // fill form
    cy.fillChangeProfileForm(user1)
    // navigate to profile wiki
    cy.get('[data-cy="backButton"]').click()
    cy.get('#overview-cy').click()
    // check if data is diplayed
    cy.checkUserWikiDataAndVisibilityExeptImage(user1)
  })

  it('User uploads new Profile Image & it is displayed on users profile wiki', () => {
    cy.viewport(1024, 514)
    cy.login(user1.email, user2.password)
    cy.navigateFromProfileWikiToEditProfile()
    // checks if upload button exists and selects a file
    cy.contains('Choose').and('be.visible')
    cy.get('input[type=file]').selectFile('C:/Users/Tobi/polity/src/assets/images/tobi.jpg', { force: true })

    // navigate to profile wiki
    cy.get('[data-cy="backButton"]').click()
    cy.get('#overview-cy').click()

    // check if image exists on profile wiki page
    cy.get('img')
      .should('be.visible')
      .and(($img: JQuery<HTMLImageElement>) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0)
      })
  })
})
