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
  })

  it('1. Follows user and unfollow from own following management tab (remove following)', () => {
    cy.visit('')
    cy.login(user1.email, user1.password)
    cy.get('#Following')
    .invoke('text')
    .then(Number)
    .then((following: number) => {
      cy.log(following.toString())
      cy.searchUser(user2)
      cy.get('#Follower')
        .invoke('text')
        .then(Number)
        .then((follower: number) => {
          cy.log(follower.toString())
          cy.clickFollowButton()
          cy.contains('#Follower', (follower + 1).toString())
          cy.openProfileLoggedInUserViaMainMenu()
          cy.contains('#Following', (following + 1).toString())
          cy.get('#edit-cy').click()
          cy.openEditFollower()
/*           cy.clickBackButton()
          cy.get('[data-cy="follower-edit"]').click() */
          cy.contains('Followings').click()
          cy.filterSecondTab(user2)
/*           cy.get('[data-cy="filterSecondTab"]')
            .type(user2.name)
            .type('{enter}') */
          cy.get('[data-cy="second-table"]').within(() => {
            cy.contains(user2.name)
            cy.get('[icon="pi pi-times"]').click()
          })
          cy.openProfileLoggedInUserViaMainMenu()
          cy.contains('#Following', (following).toString())
          cy.searchUser(user2)
          cy.contains('#Follower', (follower).toString())
          cy.logout()
        })
    })
  })

  it('2. Follows user and unfollows user from followed user profile (unfollow button)', () => {
    cy.login(user1.email, user1.password)
    cy.get('#Following')
    .invoke('text')
    .then(Number)
    .then((user1InFollowing: number) => {
      cy.log(user1InFollowing.toString())
      cy.searchUser(user2)
      cy.get('#Follower')
        .invoke('text')
        .then(Number)
        .then((user2OutFollower: number) => {
          cy.log(user2OutFollower.toString())
          cy.clickFollowButton()
          cy.contains('#Follower', (user2OutFollower + 1).toString())
          cy.openProfileLoggedInUserViaMainMenu()
          cy.contains('#Following', (user1InFollowing + 1).toString())
          cy.get('#edit-cy').click()
          cy.openEditFollower()
          cy.contains('Followings').click()
          cy.filterSecondTab(user2)

/*           cy.get('[data-cy="filterSecondTab"]')
            .type(user2.name)
            .type('{enter}') */
          cy.contains(user2.name)
          cy.get('[icon="pi pi-times"]')
          cy.searchUser(user2)
          cy.clickUnfollowButton()
          cy.contains('#Follower', user2OutFollower.toString())
          cy.openProfileLoggedInUserViaMainMenu()
          cy.contains('#Following', (user1InFollowing).toString())
          cy.get('#edit-cy').click()
          cy.get('[data-cy="follower-edit"]').click()
          cy.contains('Followings').click()
          cy.contains(user2.name).should('not.exist')
          cy.logout()
        })
    })
  })

  it('3. Follows user, logs out, logs in in followed account and removes follower from  follower management tab (remove follower)', () => {
    cy.login(user1.email, user1.password)
    cy.get('#Following')
    .invoke('text')
    .then(Number)
    .then((user1Following: number) => {
      cy.log(user1Following.toString())
      cy.searchUser(user2)
      cy.get('#Follower')
        .invoke('text')
        .then(Number)
        .then((user2Follower: number) => {
          cy.log(user2Follower.toString())
          cy.clickFollowButton()
          cy.contains('#Follower', (user2Follower + 1).toString())
          cy.openProfileLoggedInUserViaMainMenu()
          cy.contains('#Following', (user1Following + 1).toString())
          cy.get('#edit-cy').click()
          cy.openEditFollower()
          cy.contains('Followings').click()
          cy.filterSecondTab(user2)

/*           cy.get('[data-cy="filterSecondTab"]')
            .type(user2.name)
            .type('{enter}') */
          cy.contains(user2.name)
          cy.get('[icon="pi pi-times"]')
          cy.logout()
          cy.login(user2.email, user1.password)
          cy.get('#Follower')
          .invoke('text')
          .then(Number)
          .then((user2InFollower: number) => {
            cy.log(user2InFollower.toString())
            cy.get('#edit-cy').click()
            cy.openEditFollower()
            cy.filterFirstTab(user1)
/*             cy.get('[data-cy="filterFirstTab"]')
              .type(user1.name)
              .type('{enter}') */
            cy.contains(user1.name)
            cy.removeFollower(user1)
            cy.openProfileLoggedInUserViaMainMenu()
            cy.contains('#Follower', (user2InFollower-1).toString())
            cy.logout()
            cy.login(user1.email, user2.password)
            cy.contains('#Following', user1Following.toString())
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
