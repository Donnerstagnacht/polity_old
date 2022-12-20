/// <reference types="cypress" />
import {Group, Messages, PopUpMessages, User} from '../../support/index';
describe('Test group chat features', () => {
  let user1: User;
  let user2: User;
  let group2: Group;
  let messages1: Messages;
  let popUpMessages1: PopUpMessages

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
      messages1 = messagesFromFixture;
    })
    cy.fixture('popUpMessages').then((popUpMessages: PopUpMessages) => {
      popUpMessages1 = popUpMessages;
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
    cy.openGroupList()
    cy.contains(group2.name).click()
    cy.contains('#Mitglieder', group2.numberOfStartMembers)
    cy.openChatsViaMenu()
    cy.openChatWithGroup(group2)
    cy.sendMessage(messages1.messageFromUser1)
    cy.contains(messages1.messageFromUser1)
  })

  it('2. Joins a group, gets added to group chat', () => {
    cy.visit('')
    cy.login(user2.email, user2.password)
    cy.searchGroup(group2)
    cy.requestGroupMembership()
    cy.logout()
    cy.login(user1.email, user1.password)
    cy.openGroupList()
    cy.contains(group2.name).click()
    cy.openManageMembership()
    cy.acceptGroupMembershipRequest(user2)
  })

  it('3. Can receive and send messages after joining group', () => {
    cy.visit('')
    cy.login(user2.email, user2.password)
    cy.openChatsViaMenu()
    cy.openChatWithGroup(group2)
    cy.sendMessage(messages1.messageFromUser2)
    cy.contains(messages1.messageFromUser2)
    cy.logout()
    cy.login(user1.email, user1.password)
    cy.openChatsViaMenu()
    cy.openChatWithGroup(group2)
    cy.contains(messages1.messageFromUser1)
    cy.contains(messages1.messageFromUser2)
  })
})
