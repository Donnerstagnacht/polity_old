/// <reference types="cypress" />
import {User} from '../../support/index';
describe('Tests Profile following system', () => {
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
    cy.viewport(1024, 514)
    cy.visit('http://localhost:4200')
  })

  it('Follows user and unfollow from own following management tab (remove following)', () => {
    cy.login(user1.email, user1.password)
    cy.get('#Following')
    .invoke('text')
    .then(Number)
    .then((following: number) => {
      cy.log(following.toString())
      // check the incremented value
      cy.searchUser(user2)
      // grab follower counter
      cy.get('#Follower')
        .invoke('text')
        .then(Number)
        .then((follower: number) => {
          cy.log(follower.toString())
          // click follow button
          cy.get('[data-cy="followButton"]').click()
          // check the incremented follower value
          cy.contains('#Follower', (follower + 1).toString())

          // go back to own profile
          cy.get('#profile-cy').click()
          // chat that following is incremented
          cy.contains('#Following', (following + 1).toString())

          // check that new following is listed and can be removed
          cy.get('#edit-cy').click()
          cy.get('[data-cy="follower-edit"]').click()
          cy.contains('Followings').click()
          cy.get('[data-cy="filterSecondTab"]')
            .type(user2.name)
            .type('{enter}')
            .wait(2000)
          cy.contains(user2.name)
          cy.get('[icon="pi pi-times"]').click()

          // checks that counter got reduced again after removing following
          cy.get('#profile-cy').click()
          cy.contains('#Following', (following).toString())

          // checks that follower counter got decremented, too
          cy.searchUser(user2)
          cy.contains('#Follower', (follower).toString())

          cy.logout()
        })
    })
  })

  it('Follows user and unfollows user from followed user profile (unfollow button)', () => {
    cy.login(user1.email, user1.password)
    // cy.pause()
    cy.get('#Following')
    .invoke('text')
    .then(Number)
    .then((user1InFollowing: number) => {
      cy.log(user1InFollowing.toString())
      // check the incremented value
      cy.searchUser(user2)
      // grab follower counter
      cy.get('#Follower')
        .invoke('text')
        .then(Number)
        .then((user2OutFollower: number) => {
          cy.log(user2OutFollower.toString())
          // click follow button
          cy.get('[data-cy="followButton"]').click()
          // check the incremented follower value
          cy.contains('#Follower', (user2OutFollower + 1).toString())

          // go back to own profile
          cy.get('#profile-cy').click()
          // chat that following is incremented
          cy.contains('#Following', (user1InFollowing + 1).toString())

          // check that new following is listed and can be removed
          cy.get('#edit-cy').click()
          cy.get('[data-cy="follower-edit"]').click()
          cy.contains('Followings').click()
          cy.get('[data-cy="filterSecondTab"]')
            .type(user2.name)
            .type('{enter}')
            .wait(2000)
          cy.contains(user2.name)
          cy.get('[icon="pi pi-times"]')

          // clicks unfollow button
          cy.searchUser(user2)
          cy.contains('Unfollow').click()
          cy.wait(2000)
          cy.contains('#Follower', user2OutFollower.toString())
          cy.wait(2000)
          cy.wait(500)
          // checks that counter got reduced again after removing following
          cy.get('#profile-cy').click()
          cy.contains('#Following', (user1InFollowing).toString())
          // checks that following disappeared
          cy.get('#edit-cy').click()
          cy.get('[data-cy="follower-edit"]').click()
          cy.contains('Followings').click()
          cy.contains(user2.name).should('not.exist')

          cy.logout()
        })
    })
  })

  it('Follows user, logs out, logs in in followed account and removes follower from  follower management tab (remove follower)', () => {
    cy.login(user1.email, user1.password)
    cy.get('#Following')
    .invoke('text')
    .then(Number)
    .then((user1Following: number) => {
      cy.log(user1Following.toString())
      // check the incremented value
      cy.searchUser(user2)
      // grab follower counter
      cy.get('#Follower')
        .invoke('text')
        .then(Number)
        .then((user2Follower: number) => {
          cy.log(user2Follower.toString())
          // click follow button
          cy.get('[data-cy="followButton"]').click()
          // check the incremented follower value
          cy.contains('#Follower', (user2Follower + 1).toString())

          // go back to own profile
          cy.get('#profile-cy').click()
          // chat that following is incremented
          cy.contains('#Following', (user1Following + 1).toString())

          // check that new following is listed and can be removed
          cy.get('#edit-cy').click()
          cy.get('[data-cy="follower-edit"]').click()
          cy.contains('Followings').click()
          cy.get('[data-cy="filterSecondTab"]')
            .type(user2.name)
            .type('{enter}')
            .wait(2000)
          cy.contains(user2.name)
          cy.get('[icon="pi pi-times"]')

          //logsout and in other account
          cy.logout()
          cy.login(user2.email, user1.password)
          cy.get('#Follower')
          .invoke('text')
          .then(Number)
          .then((user2InFollower: number) => {
            cy.log(user2InFollower.toString())

            cy.get('#edit-cy').click()
            cy.get('[data-cy="follower-edit"]').click()
            cy.contains('Follower').click()
            cy.get('[data-cy="filterFirstTab"]')
              .type(user1.name)
              .type('{enter}')
              .wait(2000)
            cy.contains(user1.name)
            cy.get('[icon="pi pi-times"]').click()

            cy.get('#profile-cy').click()
            cy.contains('#Follower', (user2InFollower-1).toString())
            cy.logout()
            cy.login(user1.email, user2.password)

            cy.contains('#Following', user1Following.toString())
            // checks that counter got reduced again after removing following
            cy.get('#edit-cy').click()
            cy.get('[data-cy="follower-edit"]').click()
            cy.contains('Followings').click()
            cy.contains(user2.name).should('not.exist')

            cy.logout()
          })
        })
    })
  })

})
