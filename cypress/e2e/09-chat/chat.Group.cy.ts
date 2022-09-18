/// <reference types="cypress" />
import {Group, Messages, User} from '../../support/index';
describe('Test chat features', () => {
  let user1: User;
  let user2: User;
  let group2: Group;
  let messages: Messages

  before(() => {
    cy.fixture('user1').then((user: User) => {
      user1 = user;
    })
    cy.fixture('user2').then((user: User) => {
      user2 = user;
    })
    cy.fixture('group2').then((group: Group) => {
      group2 = group;
    })
    cy.fixture('messages').then((messagesFromFixture: Messages) => {
      messages = messagesFromFixture;
    })
  })

  beforeEach(() => {
    cy.viewport(1024, 514)
  })

  it('1. Creates a group, creates group chat & sends message', ( )=> {
    cy.visit('')
    cy.login(user1.email, user1.password)
    cy.get('#create-cy').click()
    cy.get('[data-cy="group"]').click()
    cy.fillCreateGroupForm(group2, user1)
    cy.searchGroup(group2)

    cy.get('#groups-cy').click()
    cy.contains(group2.name).click()
    cy.contains('#Mitglieder', group2.numberOfStartMembers)

    cy.openChatWithGroup(group2)
    cy.get('[data-cy="send-message"]')
      .type(messages.messageFromUser1)
      .type('{enter}')
      .wait(4000)
    cy.wait(100)
    cy.wait(100)
    cy.wait(100)
    cy.contains(messages.messageFromUser1)
    cy.logout()
  })

  it('2. Joins a group, gets added to group chat', () => {
    cy.login(user2.email, user2.password)
    cy.searchGroup(group2)
    cy.contains('Mitgliedschaft anfragen')
    cy.wait(100)
    cy.get('[data-cy="requestedMembershipButton"]').click()

    cy.logout()
    cy.login(user1.email, user1.password)

    cy.get('#groups-cy').click()
    cy.contains(group2.name).click()

    cy.get('#edit-cy').click()
    cy.get('[data-cy="members-edit"]').click()

    cy.contains('Beitrittsanfragen').click()
    cy.wait(4000)
    cy.wait(100)
    cy.wait(100)
    cy.wait(100)

    cy.get('[data-cy="filterFirstTab"]')
      .type(user2.name)
      .type('{enter}')
      .wait(2000)
    cy.contains(user2.name)
    cy.get('[data-cy="acceptFromFirstTab"]').click()

    cy.wait(4000)
    cy.wait(100)
    cy.wait(100)
    cy.wait(100)
    cy.pause()
    cy.contains(user2.name).should('not.exist')
    //cy.contains(user2.name).should('not.be.visible')

    cy.logout()


  })

  it('3. Can receive and send messages after joining group', () => {
    cy.login(user2.email, user2.password)

    cy.openChatWithGroup(group2)

    cy.get('[data-cy="send-message"]')
      .type(messages.messageFromUser2)
      .type('{enter}')
    cy.wait(6000)
    cy.wait(100)
    cy.wait(100)
    cy.wait(100)
    cy.contains(messages.messageFromUser2)
    cy.logout()

    cy.login(user1.email, user1.password)
    cy.openChatWithGroup(group2)
    cy.contains(messages.messageFromUser1)
    cy.contains(messages.messageFromUser2)
    cy.logout()
  })


})
