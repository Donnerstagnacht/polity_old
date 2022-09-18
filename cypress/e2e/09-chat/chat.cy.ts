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

    // Follows user
    cy.clickFollowButtonWithoutCheck(user2)

    cy.openChatWithUser(user2)

    cy.contains('Deine Anfrage wurde noch nicht akzeptiert.')
    cy.get('[data-cy="backButton"]').click()

    cy.logout()
    cy.login(user2.email, user2.password)
    cy.openChatWithUser(user1)
    cy.contains('Du hast eine neue Chat-Anfrage. Wie möchtest du reagieren?')
    cy.logout()
  })

  it('2. Denie chat request', () => {
    cy.login(user2.email, user2.password)
    cy.openChatWithUser(user1)
    cy.contains('Du hast eine neue Chat-Anfrage. Wie möchtest du reagieren?')
    cy.contains('Ablehnen').click()
    cy.wait(2000)
    cy.url().should('include', 'orga')
    cy.contains(user1.name).should('not.exist')
    cy.logout()

    // reset following for next tests
    cy.login(user1.email, user1.password)
    cy.clickFollowButtonWithoutCheck(user2)
    cy.logout()
  })

  it('3. Accept chat request', () => {
    cy.login(user1.email, user1.password)
    cy.clickFollowButtonWithoutCheck(user2)
    // cy.wait(4000)
    cy.openChatWithUser(user2)

    cy.contains('Deine Anfrage wurde noch nicht akzeptiert.')
    cy.get('[data-cy="backButton"]').click()

    cy.logout()
    cy.login(user2.email, user2.password)
    cy.openChatWithUser(user1)
    cy.contains('Du hast eine neue Chat-Anfrage. Wie möchtest du reagieren?')
    cy.contains('Nur akzeptieren').click()
    cy.contains('Ihr habt euch noch keine Nachrichten geschrieben')
  })

  it('4. Deletes chat', () => {
    cy.get('[data-cy="delete-chat"]').click()
    cy.get('[data-cy="filter-chats"]')
      .type(user1.name)
      .type('{enter}')
      .wait(2000)
    cy.contains(user1.name).should('not.exist')
    cy.logout()
    cy.login(user1.email, user1.password)
    cy.get('#orga-cy').click()
    cy.get('[data-cy="filter-chats"]')
      .type(user2.name)
      .type('{enter}')
      .wait(2000)
    cy.contains(user2.name).should('not.exist')
    cy.logout()

    // reset following for next tests
    cy.login(user1.email, user1.password)
    cy.clickFollowButtonWithoutCheck(user2)
    cy.logout()
  })

  it('5. Accept chat message and follows', () => {
    cy.login(user1.email, user1.password)
    cy.clickFollowButtonWithoutCheck(user2)
    //user1: Following: 1, Follower 0
    //user2: Following: 0, Follower 1
    cy.openChatWithUser(user2)
    cy.contains('Deine Anfrage wurde noch nicht akzeptiert.')
    cy.get('[data-cy="backButton"]').click()

    cy.logout()
    cy.login(user2.email, user2.password)
    cy.get('#Following')
      .invoke('text')
      .then(Number)
      .then((user2FollowingBefore: number) => {
        cy.wait(2000)
        cy.wait(100)
        cy.wait(100)
        cy.log(user2FollowingBefore.toString())
        cy.searchUser(user1)
        cy.get('#Follower')
          .invoke('text')
          .then(Number)
          .then((user1FollowerBefore: number) => {
            cy.wait(2000)
            cy.wait(100)
            cy.wait(100)
            cy.log(user1FollowerBefore.toString())

            cy.openChatWithUser(user1)
            cy.contains('Du hast eine neue Chat-Anfrage. Wie möchtest du reagieren?')
            cy.contains('Akzeptieren & Folgen').click()
            //user1: Following: 1, Follower 1 **
            //user2: Following: 1**, Follower 1
            cy.contains('Ihr habt euch noch keine Nachrichten geschrieben')

            cy.get('#profile-cy').click()
            cy.contains('#Following', (user2FollowingBefore + 1).toString())

            cy.searchUser(user1)
            cy.wait(4000)
            cy.contains('#Follower', (user1FollowerBefore + 1).toString())

            cy.logout()
          })
      })
  })

  it('6. Send chat message', () => {
    cy.login(user1.email, user1.password)
    cy.openChatWithUser(user2)
    cy.get('[data-cy="send-message"]')
      .type(messages.messageFromUser1)
      .type('{enter}')
    cy.wait(6000)
    cy.wait(100)
    cy.wait(100)
    cy.wait(100)
    cy.contains(messages.messageFromUser1)
    cy.logout()
  })

  it('Send receive chat message', () => {
    cy.login(user2.email, user2.password)
    cy.get('#orga-cy').click()
    cy.get('[data-cy="filter-chats"]')
      .type(user1.name)
      .type('{enter}')
      .wait(2000)
    cy.wait(4000)
    cy.get('[data-cy="number-of-unread-messages"]').contains('1')
    cy.contains(user1.name).click()
    cy.wait(1000)
    // checks  unread messages counter reset
    cy.get('[data-cy="backButton"]').click()
    cy.wait(10000)
    cy.wait(1000)
    cy.wait(100)
    cy.wait(100)
    cy.wait(100)
    cy.get('[data-cy="number-of-unread-messages"]').should('not.exist')
    cy.contains(user1.name).click()

    cy.contains(messages.messageFromUser1)
    cy.get('[data-cy="send-message"]')
      .type(messages.messageFromUser2)
      .type('{enter}')
      .wait(4000)
    cy.contains(messages.messageFromUser2)
    cy.logout()
  })

  it('7. Remove chat connection by unfollowing', () => {
    cy.login(user1.email, user1.password)
    cy.openChatWithUser(user2)
    cy.get('[data-cy="backButton"]').click()
    cy.searchUser(user2)
    cy.contains('Unfollow').click()
    cy.get('#orga-cy').click()
    cy.contains(user2.name).should('not.exist')

    cy.logout()
    cy.login(user2.email, user2.password)
    cy.get('#orga-cy').click()
    cy.contains(user1.name).should('not.exist')
    cy.logout()
  })
})
