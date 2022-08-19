/// <reference types="cypress" />
import {User} from '../../support/index';

describe('Auth lifecycle: Register, login & logout a user', () => {
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

  it('Registers, logs in & logs out a user', () => {
    // sets it up for laptop-screens
    cy.viewport(1024, 514)
    cy.register(user1.name, user1.email, user1.password)
    cy.login(user1.email, user1.password)
    cy.logout()
  })

  it('Registers a user', () => {
    cy.viewport(1024, 514)
    cy.register(user2.name, user2.email, user2.password)
  })

  it('Logs in & out a user', () => {
    cy.viewport(1024, 514)
    cy.login(user2.email, user2.password)
    cy.logout()
  })
})
