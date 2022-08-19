// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

export type User = {
  name: string,
  email: string,
  password: string,
  website: string,
  about: string,
  contactEmail: string,
  contactPhone: string,
  street: string,
  postCode: string,
  city: string
}

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login a user with email and password
       * @example cy.login('test@email', 'safepassword')
       */
      login(email: string, password: string): Chainable<Element>

      /**
       * Custom command to register a user with name, email and password
       * @example cy.register('A name', 'test@email', 'safepassword')
       */
       register(name: string, email: string, password: string): Chainable<Element>

      /**
       * Custom command to logout
       * @example cy.logout()
       */
      logout(): Chainable<Element>

      /**
       * Navigate from profile wiki to edit profile page
       * @param user - User data
       * @example cy.navigateFromProfileWikiToEditProfile()
       */
      navigateFromProfileWikiToEditProfile(): Chainable<Element>

      /**
       * Custom command to fill the ChangeProfile Form
       * @param user - User data
       * @example cy.fillChangeProfileForm(user)
       */
      fillChangeProfileForm(user: User): Chainable<Element>

      /**
       * Custom command to check if the profile update changes are displayed on profile wiki page
       * @param user - User data
       * @example cy.checkUserWikiDataAndVisibilityExeptImage(user)
       */
      checkUserWikiDataAndVisibilityExeptImage(user: User): Chainable<Element>

      /**
       * Custom command to uploadProfileImage
       * @example cy.uploadProfileImage()
       */
      uploadProfileImage(): Chainable<Element>

      /**
       * Custom command to followProfile
       * @example cy.followProfile()
       */
      followProfile(): Chainable<Element>

      /**
       * Custom command to unFollowProfile
       * @example cy.unFollowProfile()
       */
      unFollowProfile(): Chainable<Element>

      /**
       * Custom command to searchProfileFollow
       * @example cy.searchProfileFollow()
       */
      searchProfileFollow(): Chainable<Element>

      /**
       * Custom command to removeProfileFollow
       * @example cy.removeProfileFollow()
       */
      removeProfileFollow(): Chainable<Element>

      /**
       * Custom command to createGroup
       * @example cy.createGroup()
       */
      createGroup(): Chainable<Element>

      /**
       * Custom command to changeGroup
       * @example cy.changeGroup()
       */
      changeGroup(): Chainable<Element>

      /**
       * Custom command to uploadGroupImage
       * @example cy.uploadGroupImage()
       */
      uploadGroupImage(): Chainable<Element>

      /**
       * Custom command to followGroup
       * @example cy.followGroup()
       */
      followGroup(): Chainable<Element>

      /**
       * Custom command to unFollowGroup
       * @example cy.unFollowGroup()
       */
      unFollowGroup(): Chainable<Element>

      /**
       * Custom command to requestGroupMembership
       * @example cy.requestGroupMembership()
       */
      requestGroupMembership(): Chainable<Element>

      /**
       * Custom command to withdrawGroupMembership
       * @example cy.withdrawGroupMembership()
       */
      withdrawGroupMembership(): Chainable<Element>

      /**
       * Custom command to searchGroupMembershipRequest
       * @example cy.searchGroupMembershipRequest()
       */
      searchGroupMembershipRequest(): Chainable<Element>

      /**
       * Custom command to acceptGroupMembership
       * @example cy.acceptGroupMembership()
       */
      acceptGroupMembership(): Chainable<Element>

      /**
       * Custom command to rejectGroupMembership
       * @example cy.rejectGroupMembership()
       */
       rejectGroupMembership(): Chainable<Element>

      /**
       * Custom command to leaveGroup
       * @example cy.leaveGroup()
       */
      leaveGroup(): Chainable<Element>

      /**
       * Custom command to searchGroupMember
       * @example cy.searchGroupMember()
       */
      searchGroupMember(): Chainable<Element>

      /**
       * Custom command to removeGroupMembership
       * @example cy.removeGroupMembership()
       */
      removeGroupMembership(): Chainable<Element>

      /**
       * Custom command to searchGroupFollowing
       * @example cy.searchGroupFollowing()
       */
      searchGroupFollowing(): Chainable<Element>

      /**
       * Custom command to removeGroupFollowing
       * @example cy.removeGroupFollowing()
       */
      removeGroupFollowing(): Chainable<Element>

      /**
       * Custom command to sendChatRequest
       * @example cy.sendChatRequest()
       */
      sendChatRequest(): Chainable<Element>

      /**
       * Custom command to acceptChatRequest
       * @example cy.acceptChatRequest()
       */
      acceptChatRequest(): Chainable<Element>

      /**
       * Custom command to rejectChatRequest
       * @example cy.rejectChatRequest()
       */
      rejectChatRequest(): Chainable<Element>

      /**
       * Custom command to searchChatPartner
       * @example cy.searchChatPartner()
       */
      searchChatPartner(): Chainable<Element>

      /**
       * Custom command to filterChatPartnerForGroups
       * @example cy.filterChatPartnerForGroups()
       */
      filterChatPartnerForGroups(): Chainable<Element>

      /**
       * Custom command to sendMessageToProfile
       * @example cy.sendMessageToProfile()
       */
      sendMessageToProfile(): Chainable<Element>

      /**
       * Custom command to sendMessageToGroup
       * @example cy.sendMessageToGroup()
       */
      sendMessageToGroup(): Chainable<Element>
    }
  }
}
