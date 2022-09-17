/// <reference types="cypress" />
import {Group, User} from '../../support/index';
describe('Tests Group following system', () => {
  let user1: User;
  let user2: User;
  let group1: Group

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

  it('Follows group and unfollow from group following management tab (remove following)', () => {
    cy.visit('http://localhost:4200')
    cy.login(user1.email, user1.password)
    cy.get('#Following')
    .invoke('text')
    .then(Number)
    .then((user1FollowingBefore: number) => {
      cy.wait(2000)
      cy.wait(100)
      cy.wait(100)
      cy.log(user1FollowingBefore.toString())
      // check the incremented value
      cy.searchGroup(group1)
      // grab follower counter
      cy.get('#Follower')
        .invoke('text')
        .then(Number)
        .then((group1FollowerBefore: number) => {
          cy.wait(2000)
          cy.wait(100)
          cy.wait(100)
          cy.log(group1FollowerBefore.toString())
          // click follow button
          cy.get('[data-cy="followButton"]').click()
          cy.wait(1000)
          cy.wait(100)
          cy.wait(100)
          // check the incremented follower value
          cy.contains('#Follower', (group1FollowerBefore + 1).toString())

          // go back to own profile
          cy.get('#profile-cy').click()
          // chat that following is incremented
          cy.wait(2000)
          cy.wait(100)
          cy.wait(100)
          cy.contains('#Following', (user1FollowingBefore + 1).toString())

          // check that new following is listed and can be removed
          cy.get('#edit-cy').click()
          cy.get('[data-cy="follower-edit"]').click()
          cy.get('[data-cy="backButton"]').click()
          cy.get('[data-cy="follower-edit"]').click()
          cy.contains('Followings').click()
          cy.get('[data-cy="filterSecondTab"]')
            .type(group1.name)
            .type('{enter}')
            .wait(2000)
          cy.get('[data-cy="second-table"]').within(() => {
            cy.contains(group1.name)
            cy.get('[icon="pi pi-times"]').click()
          })

          // checks that counter got reduced again after removing following
          cy.get('#profile-cy').click()

          cy.wait(4000)
          cy.wait(100)
          cy.wait(100)
          cy.wait(100)
          cy.contains('#Following', (user1FollowingBefore).toString())

          // checks that follower counter got decremented, too
          cy.searchGroup(group1)
          cy.wait(4000)
          cy.wait(100)
          cy.wait(100)
          cy.wait(100)
          cy.contains('#Follower', (group1FollowerBefore).toString())

          cy.logout()
        })
    })
  })

  it('Follows group and unfollows group with unfollow button of group profile', () => {
    cy.login(user1.email, user1.password)
    cy.get('#Following')
    .invoke('text')
    .then(Number)
    .then((user1FollowingBefore: number) => {
      cy.wait(2000)
      cy.wait(100)
      cy.wait(100)
      cy.log(user1FollowingBefore.toString())
      // check the incremented value
      cy.searchGroup(group1)
      // grab follower counter
      cy.get('#Follower')
        .invoke('text')
        .then(Number)
        .then((group1FollowerBefore: number) => {
          cy.wait(2000)
          cy.wait(100)
          cy.wait(100)
          cy.log(group1FollowerBefore.toString())
          // click follow button
          cy.get('[data-cy="followButton"]').click()
          // check the incremented follower value
          cy.wait(4000)
          cy.wait(100)
          cy.wait(100)
          cy.wait(100)
          cy.wait(100)
          cy.contains('#Follower', (group1FollowerBefore + 1).toString())

          // go back to own profile
          cy.get('#profile-cy').click()
          // chat that following is incremented
          cy.wait(6000)
          cy.wait(100)
          cy.wait(100)
          cy.wait(100)
          cy.contains('#Following', (user1FollowingBefore + 1).toString())

          // check that new following is listed and can be removed
          cy.get('#edit-cy').click()
          cy.get('[data-cy="follower-edit"]').click()
          cy.get('[data-cy="backButton"]').click()
          cy.get('[data-cy="follower-edit"]').click()
          cy.contains('Followings').click()
          cy.get('[data-cy="filterSecondTab"]')
            .type(group1.name)
            .type('{enter}')
            .wait(2000)
          cy.contains(group1.name)
          cy.get('[icon="pi pi-times"]')

          // clicks unfollow button
          cy.searchGroup(group1)
          cy.wait(100)
          cy.contains('Unfollow').click()
          cy.wait(10000)
          cy.wait(500)
          cy.wait(100)
          cy.wait(100)
          cy.wait(100)
          cy.contains('#Follower', group1FollowerBefore.toString())
          cy.wait(2000)
          cy.wait(500)
          // checks that counter got reduced again after removing following
          cy.get('#profile-cy').click()
          cy.wait(10000)
          cy.wait(500)
          cy.wait(100)
          cy.wait(100)
          cy.contains('#Following', (user1FollowingBefore).toString())
          // checks that following disappeared
          cy.get('#edit-cy').click()
          cy.get('[data-cy="follower-edit"]').click()
          cy.get('[data-cy="backButton"]').click()
          cy.get('[data-cy="follower-edit"]').click()
          cy.contains('Followings').click()
          cy.contains(group1.name).should('not.exist')

          cy.logout()
        })
    })
  })

  it('Follows group and removes follower from group admin follower management tab (remove follower)', () => {
    cy.login(user1.email, user1.password)
    cy.get('#Following')
    .invoke('text')
    .then(Number)
    .then((user1FollowingBefore: number) => {
      cy.wait(2000)
      cy.wait(100)
      cy.wait(100)
      cy.log(user1FollowingBefore.toString())
      // check the incremented value
      cy.searchGroup(group1)
      // grab follower counter
      cy.get('#Follower')
        .invoke('text')
        .then(Number)
        .then((group1FollowerBefore: number) => {
          cy.wait(2000)
          cy.wait(100)
          cy.wait(100)
          cy.log(group1FollowerBefore.toString())
          // click follow button
          cy.get('[data-cy="followButton"]').click()
          // check the incremented follower value
          cy.wait(4000)
          cy.wait(100)
          cy.wait(100)
          cy.wait(100)
          cy.contains('#Follower', (group1FollowerBefore + 1).toString())
          cy.wait(4000)
          // go back to own profile
          cy.get('#profile-cy').click()
          // chat that following is incremented
          cy.wait(10000)
          cy.wait(100)
          cy.wait(100)
          cy.wait(100)

          cy.contains('#Following', (user1FollowingBefore + 1).toString())

          // check that new following is listed and can be removed
          cy.get('#edit-cy').click()
          cy.get('[data-cy="follower-edit"]').click()
          cy.get('[data-cy="backButton"]').click()
          cy.get('[data-cy="follower-edit"]').click()
          cy.contains('Followings').click()
          cy.get('[data-cy="filterSecondTab"]')
            .type(group1.name)
            .type('{enter}')
            .wait(2000)
          cy.contains(group1.name)
          cy.get('[icon="pi pi-times"]')

          //goes back to groups
          cy.get('#groups-cy').click()
          cy.contains(group1.name).click()
          cy.get('#edit-cy').click()
          cy.get('[data-cy="follower-edit"]').click()
          cy.get('[data-cy="backButton"]').click()
          cy.get('[data-cy="follower-edit"]').click()

          cy.contains('Follower').click()
          cy.get('[data-cy="filterFirstTab"]')
            .type(user1.name)
            .type('{enter}')
            .wait(2000)
          cy.contains(user1.name)
          cy.get('[icon="pi pi-times"]').click()
          cy.wait(2000)
          cy.wait(100)
          cy.wait(100)
          cy.contains(user1.name).should('not.exist')

          cy.get('[data-cy="backButton"]').click()
          cy.get('#overview-cy').click()
          cy.wait(4000)
          cy.wait(100)
          cy.wait(100)
          cy.wait(100)
          cy.contains('#Follower', (group1FollowerBefore).toString())

          // checks that counter got reduced again after removing following
          cy.get('#profile-cy').click()
          cy.wait(10000)
          cy.wait(100)
          cy.wait(100)
          cy.wait(100)
          cy.contains('#Following', user1FollowingBefore.toString())

          cy.logout()
        })
    })
  })

})
