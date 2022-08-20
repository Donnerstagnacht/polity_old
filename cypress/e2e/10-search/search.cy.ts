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
    cy.visit('http://localhost:4200')
  })

  it('Searches User and navigates to user Profile', () => {
    // sets it up for laptop-screens
    cy.login(user1.email, user1.password)
    // navigate to change Profile Form
    cy.searchUser(user2)
  })


})
