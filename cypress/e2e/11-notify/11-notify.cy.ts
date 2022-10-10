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
    cy.logout()
    cy.login(user2.email, user2.password)
    cy.openNewsPage()    
    cy.logout()
  })

  it('2. Follows User and notifies followed user', () => {
    cy.login(user1.email, user1.password)
    cy.searchUser(user2)
    cy.clickFollowButton()
    cy.logout()
    cy.login(user2.email, user2.password)
    cy.checkIfNotificationExists(1, NEWSCONTENTS.followUser)
    cy.logout()
  })

  it('3. Request group membership and notifies admins of requested group', () => {
    cy.login(user2.email, user2.password)
    cy.searchGroup(group1)
    cy.requestGroupMembership()
    cy.logout()
    cy.login(user1.email, user1.password)
    cy.checkIfNotificationExists(1, NEWSCONTENTS.requestGroupForAdmins)
    cy.logout()
  })

  it('4. Admins cancels group membership request and notifies admins of group and inquirer', () => {
    cy.login(user1.email, user1.password)
    cy.searchGroup(group1)
    cy.openManageMembership()
    cy.cancelGroupMembershipRequest(user2)
    cy.checkIfNotificationExists(1, NEWSCONTENTS.cancelGroupRequestForAdmins)
    cy.logout()
    cy.login(user2.email, user2.password)
    cy.checkIfNotificationExists(1, NEWSCONTENTS.cancelGroupRequestForInquirer)
    cy.logout()
  })

  it('5. Accept group membership, notifies admins of group and new group member', () => {
    cy.login(user2.email, user2.password)
    cy.searchGroup(group1)
    cy.requestGroupMembership()
    cy.logout()
    cy.login(user1.email, user1.password)
    cy.openNewsPage()
    cy.searchGroup(group1)
    cy.openManageMembership()
    cy.acceptGroupMembershipRequest(user2)
    cy.checkIfNotificationExists(1, NEWSCONTENTS.acceptGroupRequestForAdmins)
    cy.logout()
    cy.login(user2.email, user2.password)
    cy.checkIfNotificationExists(1, NEWSCONTENTS.acceptGroupRequestForInquirer)
    cy.logout()
  })

  it('6. Member leaves group and notifies admins of group', () => {
    cy.login(user2.email, user2.password)
    cy.openNewsPage()
    cy.searchGroup(group1)
    cy.leaveGroup()
    cy.checkIfNotificationExists(1, NEWSCONTENTS.leaveGroupForInquirer)
    cy.logout()
    cy.login(user1.email, user1.password)
    cy.checkIfNotificationExists(1, NEWSCONTENTS.leaveGroupForAdmins)
    cy.logout()
  })

  it('7. Admin deletes user, notifies other admin and deleted user', () => {
    cy.login(user2.email, user2.password)
    cy.searchGroup(group1)
    cy.requestGroupMembership()
    cy.logout()
    cy.login(user1.email, user1.password)
    cy.searchGroup(group1)
    cy.openManageMembership()
    cy.acceptGroupMembershipRequest(user2)
    cy.searchGroup(group1)
    cy.openManageMembership()
    cy.removeGroupMembership(user2)
    cy.checkIfNotificationExists(3, NEWSCONTENTS.removeMemberForAdmins)
    cy.logout()
    cy.login(user2.email, user2.password)
    cy.checkIfNotificationExists(2, NEWSCONTENTS.removeMemberForDeletedUser)
    cy.logout()
  })

  it('8. Reset notifications coutner after visiting news"', () => {
    cy.login(user2.email, user2.password)
    cy.openNewsPage()
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
