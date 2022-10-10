/// <reference types="cypress" />
import {Group, Messages, User} from '../../support/index';
describe('Test chat features', () => {
  let user1: User;
  let user2: User;
  let group1: Group;
  let messages: Messages

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
    cy.fixture('messages').then((messagesFromFixture: Messages) => {
      messages = messagesFromFixture;
    })
  })

  beforeEach(() => {
    cy.viewport(1024, 514)
  })

  it('1. Request Chat', () => {
    cy.visit('')
    cy.login(user1.email, user1.password)
    cy.get('#orga-cy').click()
    cy.contains(user2.name).should('not.exist')
    cy.searchUser(user2)
    cy.clickFollowButton()
    cy.openChatsViaMenu()
    cy.openChatWithUser(user2)
    cy.contains('Deine Anfrage wurde noch nicht akzeptiert.')
    cy.clickBackButton()
    cy.logout()
    cy.login(user2.email, user2.password)
    cy.openChatsViaMenu()
    cy.openChatWithUser(user1)
    cy.contains('Du hast eine neue Chat-Anfrage. Wie möchtest du reagieren?')
    cy.logout()
  })

  it('2. Denie chat request', () => {
    cy.login(user2.email, user2.password)
    cy.openChatsViaMenu()
    cy.openChatWithUser(user1)
    cy.rejectChatRequest(user1)
    cy.logout()
    cy.login(user1.email, user1.password)
    cy.searchUser(user2)
    cy.clickUnfollowButton()
    cy.logout()
  })

  it('3. Accept chat request', () => {
    cy.visit('')
    cy.login(user1.email, user1.password)
    cy.searchUser(user2)
    cy.clickFollowButton()
    cy.openChatsViaMenu()
    cy.openChatWithUser(user2)
    cy.contains('Deine Anfrage wurde noch nicht akzeptiert.')
    cy.clickBackButton()
    cy.logout()
    cy.login(user2.email, user2.password)
    cy.openChatsViaMenu()
    cy.openChatWithUser(user1)
    cy.acceptChatRequest()
  })

  it('4. Deletes chat', () => {
    cy.removeChat(user1)
    cy.logout()
    cy.login(user1.email, user1.password)
    cy.get('#orga-cy').click()
    cy.filterChats(user2)
    cy.contains(user2.name).should('not.exist')
    cy.logout()
    cy.login(user1.email, user1.password)
    cy.searchUser(user2)
    cy.clickUnfollowButton()
    cy.logout()
  })

  it('5. Accept chat message and follows', () => {
    cy.visit('')
    cy.login(user1.email, user1.password)
    cy.searchUser(user2)
    cy.clickFollowButton()
    cy.openChatsViaMenu()
    cy.openChatWithUser(user2)
    cy.contains('Deine Anfrage wurde noch nicht akzeptiert.')
    cy.clickBackButton()
    cy.logout()
    cy.login(user2.email, user2.password)
    cy.get('#Following')
      .invoke('text')
      .then(Number)
      .then((user2FollowingBefore: number) => {
        cy.log(user2FollowingBefore.toString())
        cy.searchUser(user1)
        cy.get('#Follower')
          .invoke('text')
          .then(Number)
          .then((user1FollowerBefore: number) => {
            cy.log(user1FollowerBefore.toString())
            cy.openChatsViaMenu()
            cy.openChatWithUser(user1)
            cy.contains('Du hast eine neue Chat-Anfrage. Wie möchtest du reagieren?')
            cy.contains('Akzeptieren & Folgen').click()
            cy.contains('Ihr habt euch noch keine Nachrichten geschrieben')
            cy.get('#profile-cy').click()
            cy.contains('#Following', (user2FollowingBefore + 1).toString())
            cy.searchUser(user1)
            cy.contains('#Follower', (user1FollowerBefore + 1).toString())
            cy.logout()
          })
      })
  })

  it('6. Send chat message', () => {
    cy.login(user1.email, user1.password)
    cy.openChatsViaMenu()
    cy.openChatWithUser(user2)
    cy.sendMessageToProfile(messages.messageFromUser1)
    cy.logout()
  })

  it('7. Send receive chat message', () => {
    cy.login(user2.email, user2.password)
    cy.openChatsViaMenu()
    cy.filterChats(user1)
    cy.get('[data-cy="number-of-unread-messages"]').contains('1')
    cy.get('[data-cy="filter-chats"]').clear()
    cy.openChatWithUser(user1)
    cy.openChatsViaMenu()
    cy.get('[data-cy="number-of-unread-messages"]').should('not.exist')
    cy.openChatWithUser(user1)
    cy.sendMessageToProfile(messages.messageFromUser2)
    cy.logout()
  })

  it('8. Remove chat connection by unfollowing', () => {
    cy.login(user1.email, user1.password)
    cy.openChatsViaMenu()
    cy.openChatWithUser(user2)
    cy.clickBackButton()
    cy.searchUser(user2)
    cy.clickUnfollowButton()
    cy.openChatsViaMenu()
    cy.contains(user2.name).should('not.exist')
    cy.logout()
    cy.login(user2.email, user2.password)
    cy.openChatsViaMenu()
    cy.contains(user1.name).should('not.exist')
    cy.logout()
  })
})
