/// <reference types="cypress" />
import {Group, User} from '../../support/index';
describe('Tests search features', () => {
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

  it('1. Searches User and navigates to user Profile', () => {
    cy.visit('')
    // sets it up for laptop-screens
    cy.login(user1.email, user1.password)
    // navigate to change Profile Form
    cy.searchUser(user2)
  })

  it('2. Searches a group and navigates to group Profile', () => {
    // navigate to change Profile Form
    cy.searchGroup(group1)
  })


})
