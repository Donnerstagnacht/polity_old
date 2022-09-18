/// <reference types="cypress" />
import {Group, User} from '../../support/index';
import { NEWSCONTENTS } from '../../../src/app/news/state/news.model';

describe('Tests notify features', () => {
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

  it('1. Resets counter', () => {
    cy.visit('')
    cy.login(user1.email, user1.password)
    cy.openNewsPage()
    cy.get('#profile-cy').click()
    cy.wait(1000)
    cy.logout()
    cy.login(user1.email, user1.password)
    cy.openNewsPage()    
    cy.get('#profile-cy').click()
    cy.wait(1000)
    cy.logout()
  })

  it('2. Follows User and notifies followed user', () => {
    cy.login(user1.email, user1.password)
    cy.searchUser(user2)
    cy.contains('Follow')
    cy.get('[data-cy="followButton"]').click()
    cy.logout()
    cy.login(user2.email, user2.password)
    cy.openNewsPage()
    cy.get('[data-cy="unreadMessagesCounter"]').contains('1')
    cy.contains(NEWSCONTENTS.followUser)
    cy.logout()
})

  it('3. Request group membership and notifies admins of requested group', () => {
    cy.login(user2.email, user2.password)
    cy.searchGroup(group1)
    cy.get('[data-cy="requestedMembershipButton"]').click()
    cy.logout()

    cy.login(user1.email, user1.password)
    cy.get('[data-cy="unreadMessagesCounter"]').contains('1')
    cy.openNewsPage()    
    cy.contains(NEWSCONTENTS.requestGroupForAdmins)
    cy.logout()
  })

  it('4. Admins cancels group membership request and notifies admins of group and inquirer', () => {
    cy.login(user1.email, user1.password)

    cy.searchGroup(group1)

    cy.get('#edit-cy').click()
    cy.get('[data-cy="members-edit"]').click()

    cy.contains('Beitrittsanfragen').click()
    cy.get('[data-cy="filterFirstTab"]')
      .type(user2.name)
      .type('{enter}')
      .wait(2000)
    cy.contains(user2.name)
    cy.get('[data-cy="removeFromFirstTab"]').click()
    cy.wait(200)
    cy.get('#profile-cy').click()

    cy.get('[data-cy="unreadMessagesCounter"]').contains('1')
    cy.openNewsPage()
    cy.contains(NEWSCONTENTS.cancelGroupRequestForAdmins)
    cy.logout()

    cy.login(user2.email, user2.password)
    cy.get('[data-cy="unreadMessagesCounter"]').contains('1')
    cy.openNewsPage()
    cy.contains(NEWSCONTENTS.cancelGroupRequestForInquirer)
    cy.logout()
  })

  it('5. Accept group membership, notifies admins of group and new group member', () => {
    cy.login(user2.email, user2.password)
    cy.searchGroup(group1)
    cy.get('[data-cy="requestedMembershipButton"]').click()
    cy.logout()

    cy.login(user1.email, user1.password)
    cy.openNewsPage()

    cy.searchGroup(group1)
    cy.get('#edit-cy').click()
    cy.get('[data-cy="members-edit"]').click()

    cy.contains('Beitrittsanfragen').click()
    cy.get('[data-cy="filterFirstTab"]')
      .type(user2.name)
      .type('{enter}')
      .wait(2000)
    cy.contains(user2.name)
    cy.get('[data-cy="acceptFromFirstTab"]').click()

    cy.get('[data-cy="unreadMessagesCounter"]').contains('1')
    cy.openNewsPage()
    cy.contains(NEWSCONTENTS.acceptGroupRequestForAdmins)
    cy.logout()

    cy.login(user2.email, user2.password)
    cy.get('[data-cy="unreadMessagesCounter"]').contains('1')
    cy.openNewsPage()
    cy.contains(NEWSCONTENTS.acceptGroupRequestForInquirer)
    cy.logout()
  })

  it('6. Member leaves group and notifies admins of group', () => {
    cy.login(user2.email, user2.password)
    cy.openNewsPage()
    cy.get('#profile-cy').click()
    cy.searchGroup(group1)
    cy.contains('Austreten').should('be.visible')
    cy.contains('Austreten').should('be.visible').click()

    cy.get('[data-cy="unreadMessagesCounter"]').contains('1')
    cy.openNewsPage()
    cy.contains(NEWSCONTENTS.leaveGroupForInquirer)

    cy.logout()

    cy.login(user1.email, user1.password)
    cy.get('[data-cy="unreadMessagesCounter"]').contains('1')
    cy.openNewsPage()
    cy.wait(4000)
    cy.wait(100)
    cy.wait(100)
    cy.wait(100)
    cy.contains(NEWSCONTENTS.leaveGroupForAdmins)
    cy.logout()
  })

  it('7. Admin deletes user, notifies other admin and deleted user', () => {
    cy.login(user2.email, user2.password)
    cy.searchGroup(group1)
    cy.get('[data-cy="requestedMembershipButton"]').click()
    cy.logout()

    cy.login(user1.email, user1.password)

    cy.searchGroup(group1)
    cy.get('#edit-cy').click()
    cy.get('[data-cy="members-edit"]').click()

    cy.contains('Beitrittsanfragen').click()
    cy.get('[data-cy="filterFirstTab"]')
      .type(user2.name)
      .type('{enter}')
      .wait(2000)
    cy.contains(user2.name)
    cy.get('[data-cy="acceptFromFirstTab"]').click()

    cy.openNewsPage()
    cy.searchGroup(group1)
    cy.get('#edit-cy').click()
    cy.get('[data-cy="members-edit"]').click()
    cy.wait(1000)
    cy.contains('Mitglieder').click()
    cy.get('[data-cy="filterSecondTab"]')
      .type(user2.name)
      .type('{enter}')
      .wait(2000)
    cy.contains(user2.name)
    cy.get('[data-cy="removeFromSecondTab"]').click()

    cy.get('[data-cy="unreadMessagesCounter"]').contains('1')
    cy.get('#profile-cy').click()
    cy.openNewsPage()
    cy.wait(2000)
    cy.contains(NEWSCONTENTS.removeMemberForAdmins)
    cy.logout()

    cy.login(user2.email, user2.password)
    cy.get('[data-cy="unreadMessagesCounter"]').contains('2')
    cy.openNewsPage()
    cy.contains(NEWSCONTENTS.removeMemberForDeletedUser)
    cy.logout()
  })

  it('8. Reset notifications coutner after visiting news"', () => {
    cy.login(user2.email, user2.password)
    cy.openNewsPage()
    cy.wait(2000)
    cy.get('#profile-cy').click()
    cy.get('[data-cy="unreadMessagesCounter"]').should('not.exist')
    cy.openNewsPage()
    cy.get('[data-cy="newsContainer"]').within(() => {
      cy.contains('NEW').should('not.exist')
    })
    cy.logout()
  })

  it('9. Reset follower buttonsications and notifications are marked as "old/read"', () => {
    cy.login(user1.email, user1.password)
    cy.searchUser(user2)
    cy.contains('Unfollow').should('be.visible').click()
    cy.logout()
  })

})
