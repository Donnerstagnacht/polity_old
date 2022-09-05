/// <reference types="cypress" />
import {Group, User} from '../../support/index';
describe('Tests Group Membership system', () => {
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

  it('User requests group membership and group admin denies membership', () => {
    cy.visit('http://localhost:4200')
    cy.login(user2.email, user2.password)

    cy.searchGroup(group1)
    cy.contains('Mitgliedschaft anfragen')
    cy.wait(4000)
    cy.wait(100)
    cy.wait(100)
    cy.wait(100)
    cy.get('[data-cy="requestedMembershipButton"]').click()
    cy.wait(4000)
    cy.wait(100)
    cy.wait(100)
    cy.wait(100)

    cy.contains('Anfrage zurückziehen')

    cy.logout()
    cy.login(user1.email, user1.password)

    cy.get('#groups-cy').click()
    cy.contains(group1.name).click()
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
    cy.get('[data-cy="removeFromFirstTab"]').click()
    cy.wait(2000)

    cy.logout()
    cy.login(user1.email, user2.password)

    // check the reset follow button value
    cy.searchGroup(group1)

    cy.contains('Mitgliedschaft anfragen')
    cy.logout()
  })

  it('User requests group membership and withdraws it', () => {
    cy.login(user2.email, user2.password)

    cy.searchGroup(group1)
    cy.contains('Mitgliedschaft anfragen')
    cy.wait(100)
    cy.get('[data-cy="requestedMembershipButton"]').click()
    cy.wait(1000)
    cy.wait(100)
    cy.wait(100)
    cy.wait(100)

    cy.contains('Anfrage zurückziehen')

    cy.logout()
    cy.login(user1.email, user1.password)

    cy.get('#groups-cy').click()
    cy.contains(group1.name).click()
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
    cy.get('[data-cy="removeFromFirstTab"]')

    cy.logout()
    cy.login(user2.email, user2.password)

    // check the reset follow button value
    cy.searchGroup(group1)

    cy.contains('Anfrage zurückziehen').click()
    cy.wait(4000)
    cy.contains('Mitgliedschaft anfragen')
    cy.wait(100)
    cy.logout()

    cy.login(user1.email, user1.password)

    cy.get('#groups-cy').click()
    cy.contains(group1.name).click()
    cy.get('#edit-cy').click()
    cy.get('[data-cy="members-edit"]').click()

    cy.get('[data-cy="filterFirstTab"]')
      .type(user2.name)
      .type('{enter}')
      .wait(2000)
    cy.contains(user2.name).should('not.exist')
    cy.logout()
  })

  it('User requests membership, group admin accepts and members counter are incremented', () => {
    cy.login(user2.email, user2.password)

    cy.get('#Gruppen')
    .invoke('text')
    .then(Number)
    .then((user2GroupsBefore: number) => {
      cy.wait(2000)
      cy.wait(100)
      cy.wait(100)
      cy.log(user2GroupsBefore.toString())

      // start
      cy.searchGroup(group1)
      cy.contains('Mitgliedschaft anfragen')
      cy.wait(100)
      cy.get('[data-cy="requestedMembershipButton"]').click()
      cy.wait(1000)
      cy.wait(100)
      cy.wait(100)
      cy.wait(100)

      cy.contains('Anfrage zurückziehen')

      cy.logout()
      cy.login(user1.email, user1.password)

      cy.get('#groups-cy').click()
      cy.contains(group1.name).click()

      cy.get('#Mitglieder')
      .invoke('text')
      .then(Number)
      .then((group1MemberBefore: number) => {
        cy.wait(2000)
        cy.wait(100)
        cy.wait(100)
        cy.log(group1MemberBefore.toString())

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
        cy.contains(user2.name).should('not.be.visible')

        cy.get('[data-cy="backButton"]').click()
        cy.get('#overview-cy').click()
        cy.wait(4000)
        cy.wait(100)
        cy.wait(100)
        cy.wait(100)
        cy.contains('#Mitglieder', (group1MemberBefore + 1).toString())

        cy.logout()
        cy.login(user2.email, user2.password)

        cy.wait(4000)
        cy.wait(100)
        cy.wait(100)
        cy.wait(100)
        cy.contains('#Gruppen', (user2GroupsBefore + 1).toString())

        // check the reset follow button value
        cy.searchGroup(group1)
        cy.wait(1000)
        cy.contains('Austreten')
        cy.wait(1000)

        cy.logout()
        // END
      })
    })
  })

  it('User leaves group and counter are decremented', () => {
    cy.login(user1.email, user1.password)

    cy.get('#groups-cy').click()
    cy.contains(group1.name).click()

    cy.get('#Mitglieder')
    .invoke('text')
    .then(Number)
    .then((group1MemberBefore: number) => {
      cy.wait(2000)
      cy.wait(100)
      cy.wait(100)
      cy.log(group1MemberBefore.toString())

      cy.logout()
      cy.login(user2.email, user2.password)

      cy.get('#Gruppen')
      .invoke('text')
      .then(Number)
      .then((user2GroupsBefore: number) => {
        cy.wait(2000)
        cy.wait(100)
        cy.wait(100)
        cy.log(user2GroupsBefore.toString())

        // start
        cy.searchGroup(group1)
        cy.contains('Austreten')
        cy.wait(100)
        cy.get('[data-cy="requestedMembershipButton"]').click()
        cy.wait(1000)
        cy.wait(100)
        cy.wait(100)
        cy.wait(100)

        cy.contains('Mitgliedschaft anfragen')

        cy.get('#profile-cy').click()
        cy.wait(4000)
        cy.wait(100)
        cy.wait(100)
        cy.wait(100)
        cy.contains('#Gruppen', (user2GroupsBefore -1).toString())

        cy.logout()
        cy.login(user1.email, user1.password)

        cy.get('#groups-cy').click()
        cy.contains(group1.name).click()
        cy.contains('#Mitglieder', (group1MemberBefore -1).toString())

        cy.get('#edit-cy').click()
        cy.get('[data-cy="members-edit"]').click()

        cy.wait(1000)
        cy.contains('Mitglieder').click()
        cy.wait(4000)
        cy.wait(100)
        cy.wait(100)
        cy.wait(100)

        cy.get('[data-cy="filterSecondTab"]')
        .type(user2.name)
        .type('{enter}')
        .wait(2000)
        cy.contains(user2.name).should('not.exist')

        cy.logout()
      })
    })
  })

  it('User leaves group from group overview and counter are decremented', () => {
   /*****************************************************
   *  END ONLY LOGIN, request and accept membership
   * ***********************************************   */
  cy.login(user2.email, user2.password)
  cy.searchGroup(group1)
  cy.contains('Mitgliedschaft anfragen')
  cy.wait(40000)
  cy.wait(100)
  cy.wait(100)
  cy.wait(100)
  cy.get('[data-cy="requestedMembershipButton"]').click()
  cy.wait(10000)
  cy.wait(100)
  cy.wait(100)
  cy.wait(100)

  cy.contains('Anfrage zurückziehen')

  cy.logout()
  cy.login(user1.email, user1.password)

  cy.get('#groups-cy').click()
  cy.contains(group1.name).click()

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
  cy.contains(user2.name).should('not.be.visible')
  cy.logout()
  /*****************************************************
   *  END ONLY LOGIN, request and accept membership
   * ***********************************************   */

    cy.login(user1.email, user1.password)

    cy.get('#groups-cy').click()
    cy.contains(group1.name).click()

    cy.get('#Mitglieder')
    .invoke('text')
    .then(Number)
    .then((group1MemberBefore: number) => {
      cy.wait(2000)
      cy.wait(100)
      cy.wait(100)
      cy.log(group1MemberBefore.toString())

      cy.logout()
      cy.login(user2.email, user2.password)

      cy.get('#Gruppen')
      .invoke('text')
      .then(Number)
      .then((user2GroupsBefore: number) => {
        cy.wait(2000)
        cy.wait(100)
        cy.wait(100)
        cy.log(user2GroupsBefore.toString())

        cy.get('#edit-cy').click()
        cy.get('[data-cy="groups-edit"]').click()

        cy.wait(4000)
        cy.wait(100)
        cy.wait(100)
        cy.wait(100)
        cy.get('[data-cy="filterFirstTab"]')
          .type(group1.name)
          .type('{enter}')
          .wait(2000)
        cy.get('[data-cy="removeFromFirstTab"]').click()
        cy.wait(4000)
        cy.wait(100)
        cy.wait(100)
        cy.wait(100)
        cy.contains(group1.name).should('not.exist')

        cy.get('[data-cy="backButton"]').click()
        cy.get('#overview-cy').click()
        cy.wait(4000)
        cy.wait(100)
        cy.wait(100)
        cy.wait(100)
        cy.contains('#Gruppen', (user2GroupsBefore -1).toString())

        cy.searchGroup(group1)
        cy.wait(4000)
        cy.wait(100)
        cy.wait(100)
        cy.wait(100)
        cy.contains('Mitgliedschaft anfragen')

        cy.logout()
        cy.login(user1.email, user2.password)

        cy.get('#groups-cy').click()
        cy.contains(group1.name).click()
        cy.contains('#Mitglieder', (group1MemberBefore -1).toString())

        cy.get('#edit-cy').click()
        cy.get('[data-cy="members-edit"]').click()

        cy.wait(1000)
        cy.contains('Mitglieder').click()
        cy.wait(4000)
        cy.wait(100)
        cy.wait(100)
        cy.wait(100)

        cy.get('[data-cy="filterSecondTab"]')
        .type(user2.name)
        .type('{enter}')
        .wait(2000)
        cy.contains(user2.name).should('not.exist')

        cy.logout()
      })
    })
  })


  it('Admin removes user from group and counter are decremented', () => {
     /*****************************************************
   *  END ONLY LOGIN, request and accept membership
   * ***********************************************   */  cy.login(user2.email, user2.password)
  cy.searchGroup(group1)
  cy.contains('Mitgliedschaft anfragen')
  cy.wait(100)
  cy.get('[data-cy="requestedMembershipButton"]').click()
  cy.wait(4000)
  cy.wait(100)
  cy.wait(100)
  cy.wait(100)

  cy.contains('Anfrage zurückziehen')

  cy.logout()
  cy.login(user1.email, user1.password)

  cy.get('#groups-cy').click()
  cy.contains(group1.name).click()

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
  cy.contains(user2.name).should('not.be.visible')
  cy.logout()
  /*****************************************************
   *  END ONLY LOGIN, request and accept membership
   * ***********************************************   */
    cy.login(user2.email, user2.password)

    cy.get('#Gruppen')
    .invoke('text')
    .then(Number)
    .then((user2GroupsBefore: number) => {
      cy.wait(2000)
      cy.wait(100)
      cy.wait(100)
      cy.log(user2GroupsBefore.toString())

      cy.logout()
      cy.login(user1.email, user1.password)

      cy.get('#groups-cy').click()
      cy.contains(group1.name).click()

      cy.get('#Mitglieder')
      .invoke('text')
      .then(Number)
      .then((group1MemberBefore: number) => {
        cy.wait(2000)
        cy.wait(100)
        cy.wait(100)
        cy.log(group1MemberBefore.toString())

        cy.get('#edit-cy').click()
        cy.get('[data-cy="members-edit"]').click()

        cy.wait(1000)
        cy.contains('Mitglieder').click()
        cy.wait(4000)
        cy.wait(100)
        cy.wait(100)
        cy.wait(100)

        cy.get('[data-cy="filterSecondTab"]')
        .type(user2.name)
        .type('{enter}')
        .wait(2000)
        cy.contains(user2.name).should('be.visible')

        cy.get('[data-cy="removeFromSecondTab"]').click()
        cy.wait(4000)
        cy.wait(100)
        cy.wait(100)
        cy.wait(100)

        cy.contains(user2.name).should('not.exist')

        cy.logout()
        cy.login(user2.email, user2.password)
        cy.contains('#Gruppen', (user2GroupsBefore -1).toString())

        cy.searchGroup(group1)
        cy.contains('Mitgliedschaft anfragen')

        cy.logout()
      })
    })
  })
})
