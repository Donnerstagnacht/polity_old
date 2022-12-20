/// <reference types="cypress" />
import {Group, PopUpMessages, User} from '../../support/index';
describe('Tests Group following system', () => {
  let user1: User;
  let user2: User;
  let group1: Group
  let popUpMessages1: PopUpMessages;

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
    cy.fixture('popupmessages').then((popUpMessages: PopUpMessages) => {
      popUpMessages1 = popUpMessages;
    })
  })

  beforeEach(() => {
    cy.viewport(1024, 514)
  })

  it('1. Follows group and unfollow from group following management tab (remove following)', () => {
    cy.visit('')
    cy.login(user1.email, user1.password)
    cy.get('#Following')
    .invoke('text')
    .then(Number)
    .then((user1FollowingBefore: number) => {
      cy.log(user1FollowingBefore.toString())
      cy.searchGroup(group1)
      cy.get('#Follower')
        .invoke('text')
        .then(Number)
        .then((group1FollowerBefore: number) => {
          cy.clickFollowGroupButton(popUpMessages1.followMessage)
          cy.searchGroup(group1) // needed to avoid fail due to cypress issues detecting real time, does exclude realtime test
          cy.contains('#Follower', (group1FollowerBefore + 1).toString())
          cy.openProfileLoggedInUserViaMainMenu()
          cy.contains('#Following', (user1FollowingBefore + 1).toString())
          cy.get('#edit-cy').click()
          cy.openEditFollower()
          cy.removeGroupFollowerFromEditFollower(group1)
          cy.openProfileLoggedInUserViaMainMenu()
          cy.contains('#Following', (user1FollowingBefore).toString())
          cy.searchGroup(group1)
          cy.contains('#Follower', (group1FollowerBefore).toString())
        })
    })
  })

  it('2. Follows group and unfollows group with unfollow button of group profile', () => {
    cy.visit('')
    cy.login(user1.email, user1.password)
    cy.get('#Following')
    .invoke('text')
    .then(Number)
    .then((user1FollowingBefore: number) => {
      cy.log(user1FollowingBefore.toString())
      cy.searchGroup(group1)
      cy.get('#Follower')
        .invoke('text')
        .then(Number)
        .then((group1FollowerBefore: number) => {
          cy.log(group1FollowerBefore.toString())
          cy.clickFollowGroupButton(popUpMessages1.followMessage)
          cy.searchGroup(group1) // needed to avoid fail due to cypress issues detecting real time, does exclude realtime test
          cy.contains('#Follower', (group1FollowerBefore + 1).toString())
          cy.openProfileLoggedInUserViaMainMenu()
          cy.contains('#Following', (user1FollowingBefore + 1).toString())
          cy.get('#edit-cy').click()
          cy.openEditFollower()
          cy.contains('Followings').click()
          cy.filterSecondTabOfGroup(group1)
          cy.contains(group1.name)
          cy.get('[icon="pi pi-times"]')
          cy.searchGroup(group1)
          cy.clickUnfollowGroupButton(popUpMessages1.unfollowMessage)
          cy.searchGroup(group1) // needed to avoid fail due to cypress issues detecting real time, does exclude realtime test
          cy.contains('#Follower', group1FollowerBefore.toString())
          cy.openProfileLoggedInUserViaMainMenu()
          cy.contains('#Following', (user1FollowingBefore).toString())
          cy.get('#edit-cy').click()
          cy.openEditFollower()
          cy.contains('Followings').click()
          cy.contains(group1.name).should('not.exist')
        })
    })
  })

  it('3. Follows group and removes follower from group admin follower management tab (remove follower)', () => {
    cy.visit('')
    cy.login(user1.email, user1.password)
    cy.get('#Following')
    .invoke('text')
    .then(Number)
    .then((user1FollowingBefore: number) => {
      cy.log(user1FollowingBefore.toString())
      cy.searchGroup(group1)
      cy.get('#Follower')
        .invoke('text')
        .then(Number)
        .then((group1FollowerBefore: number) => {
          cy.log(group1FollowerBefore.toString())
          cy.clickFollowGroupButton(popUpMessages1.followMessage)
          cy.searchGroup(group1) // needed to avoid fail due to cypress issues detecting real time, does exclude realtime test
          cy.contains('#Follower', (group1FollowerBefore + 1).toString())
          cy.openProfileLoggedInUserViaMainMenu()
          cy.contains('#Following', (user1FollowingBefore + 1).toString())
          cy.get('#edit-cy').click()
          cy.openEditFollower()
          cy.contains('Followings').click()
          cy.filterSecondTabOfGroup(group1)
          cy.contains(group1.name)
          cy.get('[icon="pi pi-times"]')
          cy.openGroupList()
          cy.contains(group1.name).click()
          cy.get('#edit-cy').click()
          cy.openEditFollowerOfGroup()
          cy.removeFollowerFromGroupAdmin(user1)
          cy.get('[data-cy="backButton"]').click()
          cy.openGroupProfileAndWaitForGroupData()
          cy.contains('#Follower', (group1FollowerBefore).toString())
          cy.openProfileLoggedInUserViaMainMenu()
          cy.contains('#Following', user1FollowingBefore.toString())
        })
    })
  })

})
