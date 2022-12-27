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
  city: string,
  ftsName: string
}

export type Group = {
  name: string,
  level: string,
  about: string,
  contactEmail: string,
  contactPhone: string,
  street: string,
  postCode: string,
  city: string,
  ftsName: string
  numberOfStartMembers: string
}

export type Messages = {
  messageFromUser2: string,
  messageFromUser1: string
}

export type PopUpMessages = {
  followMessage: string,
  unfollowMessage: string,
  requestGroup: string,
  cancelGroupRequest: string,
  leaveGroup: string
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
       * Custom command to open profile and waits to complete a supabase api call to load data
       * @example cy.openProfileAndWaitForProfileData()
       */
       openProfileAndWaitForProfileData(): Chainable<Element>

      /**
       * Custom command to open profile and waits to complete a supabase api call to load data and the profile image
       * @example cy.openProfileAndWaitForProfileDataAndImage()
       */
      openProfileAndWaitForProfileDataAndImage(): Chainable<Element>

       /**
       * Custom command to open group profile and waits to complete a supabase api call to load data
       * @example cy.openGroupProfileAndWaitForGroupData()
       */
      openGroupProfileAndWaitForGroupData(): Chainable<Element>

             /**
       * Custom command to open group profile and waits to complete a supabase api call to load data
       * @example cy.openGroupProfileAndWaitForGroupDataAndImage()
       */
        openGroupProfileAndWaitForGroupDataAndImage(): Chainable<Element>
      
      
      /**
      * Custom command to open profile which belongs not to the authenticated user and waits to complete a supabase api call to load data
      * @example cy.openProfileExteralAndWaitForProfileData()
      */
      openProfileExteralAndWaitForProfileData(): Chainable<Element>

            /**
      * Custom command to open profile which belongs to the authenticated
      * @example cy.openProfileLoggedInUser()
      */
      openProfileLoggedInUserViaMainMenu(): Chainable<Element>
      

      /**
       * Custom command to fill the ChangeGroup Profile Form
       * @param group - User data
       * @example cy.fillChangeGroupForm(group)
       */
       fillChangeGroupForm(group: Group): Chainable<Element>

      /**
      * Custom command to click the standart back button
      * @example cy.clickBackButton()
      */
      clickBackButton(): Chainable<Element>

      /**
      * Custom command to check if an image exists
      * @example cy.checkIfImageExists()
      */
      checkIfImageExists(): Chainable<Element>

      /**
      * Custom command to upload an image
      * @param path - source path of image
      * @example cy.uploadImage()
      */
      uploadImage(path: string): Chainable<Element>

      /**
       * Custom command to check if the group profile update changes are displayed on group wiki page
       * @param group - Group data
       * @example cy.checkGroupWikiDataAndVisibilityExeptImage(group)
       */
       checkGroupWikiDataAndVisibilityExeptImage(group: Group): Chainable<Element>

      /**
       * Custom command to check if the profile update changes are displayed on profile wiki page
       * @param user - User data
       * @example cy.checkUserWikiDataAndVisibilityExeptImage(user)
       */
      checkUserWikiDataAndVisibilityExeptImage(user: User): Chainable<Element>


      /**
       * Custom command to check if a pop up message appears and can be removed by click
       * @param message - PopUp message which should be displayed
       * @example cy.checkPopUpMessage(message)
       */
      checkPopUpMessage(message: string): Chainable<Element>

      /**
       * Custom command to uploadProfileImage
       * @example cy.uploadProfileImage()
       */
      uploadProfileImage(): Chainable<Element>

      /**
       * Custom command to searchUser
       * @param user - User data
       * @example cy.searchUser(user)
       */
      searchUser(user: User): Chainable<Element>

      /**
      * Custom command to click follow button
      * @param popUpMessage - Pop up message to be displayed after click
      * @example cy.clickFollowButton()
      */
       clickFollowButton(popUpMessage: string): Chainable<Element>

      /**
      * Custom command to click follow button of a group
      * @param popUpMessage - Pop up message to be displayed after click
      * @example cy.clickFollowGroupButton()
      */
      clickFollowGroupButton(popUpMessage: string): Chainable<Element>

      /**
      * Custom command to click unfollow button
      * @param popUpMessage - Pop up message to be displayed after click
      * @example cy.clickUnfollowButton()
      */
      clickUnfollowButton(popUpMessage: string): Chainable<Element>

      /**
      * Custom command to click unfollow group button
      * @param popUpMessage - Pop up message to be displayed after click
      * @example cy.clickUnfollowGroupButton()
      */
      clickUnfollowGroupButton(popUpMessage: string): Chainable<Element>

      /**
      * Custom command to remove follower
      * @param user - User data
      * @example cy.removeFollower(user1)
      */
      removeFollower(user: User): Chainable<Element>

      /**
      * Custom command to remove follower from the group admin tab
      * @param user - User data
      * @example cy.removeFollowerFromGroupAdmin(user1)
      */
       removeFollowerFromGroupAdmin(user: User): Chainable<Element>

      /**
      * Custom command to remove follower
      * @param group - Group data
      * @example cy.removeFollower(user1)
      */
      removeGroupFollowerFromEditFollower(group: Group): Chainable<Element>

      /**
      * Custom command to remove follower
      * @param group - Group data
      * @example cy.removeGroupFollower(group1)
      */
      removeGroupFollowing(group: Group): Chainable<Element>

      /**
      * Custom command to request a group membership
      * @example cy.removeGroupFollower(group1)
      */
      requestGroupMembership(): Chainable<Element>

      /**
      * Custom command to cancel group membershiprequest from admin tab
      * @param user - User data
      * @example cy.cancelGroupMembershiprequest(user1)
      */
      cancelGroupMembershipRequest(user: User): Chainable<Element>

      /**
      * Custom command to accept group membershiprequest from admin tab
      * @param user - User data
      * @example cy.acceptGroupMembershipRequest(user1)
      */
      acceptGroupMembershipRequest(user: User): Chainable<Element>

      /**
      * Custom command to filter the first tab for a user
      * @param user - User data
      * @example cy.filterFirstTab(user1)
      */
      filterFirstTab(user: User): Chainable<Element>

      /**
      * Custom command to filter chats
      * @param user - User data
      * @example cy.filterChats(user1)
      */
      filterChats(user: User): Chainable<Element>

      /**
      * Custom command to filter chats
      * @param group - User data
      * @example cy.filterChats(user1)
      */
      filterChatsGroup(group: Group): Chainable<Element>

      /**
      * Custom command to filter the first tab of a group
      * @param group - Group data
      * @example cy.filterFirstTab(user1)
      */
      filterFirstTabOfGroup(group: Group): Chainable<Element>

      /**
      * Custom command to filter the second tab for a user
      * @param user - User data
      * @example cy.filterSecondTab(user1)
      */
      filterSecondTab(user: User): Chainable<Element>

      /**
      * Custom command to filter the second tab of a group
      * @param group - Group data
      * @example cy.filterSecondTab(user1)
      */
      filterSecondTabOfGroup(group: Group): Chainable<Element>

      /**
      * Custom command to leave a group
      * @param user - User data
      * @example cy.leaveGroup()
      */
      leaveGroup(): Chainable<Element>

      /**
      * Custom command to open the admin tab to manage groups members
      * @example cy.openEditMemberhsip(group1)
      */
      openManageMembership(): Chainable<Element>

      /**
      * Custom command to open a group page and wait for data
      * @example cy.openGroupAndWaitForGroupData()
      */
       openGroupAndWaitForGroupData(): Chainable<Element>

      /**
      * Custom command to open a the list of groups and wait for data
      * @example cy.openGroupList()
      */
      openGroupList(): Chainable<Element>


      /**
      * Custom command to open a page to edit follower
      * @example cy.openEditFollower()
      */
      openEditFollower(): Chainable<Element>

      /**
      * Custom command to open a page to edit follower of group
      * @example cy.openEditFollowerOfGroup()
      */
      openEditFollowerOfGroup(): Chainable<Element>
      
      /**
      * Custom command to open a page to edit followings
      * @example cy.openEditFollowing()
      */
      openEditFollowing(): Chainable<Element>
      
      /**
       * Custom command to open news page
       * @example cy.openNewsPage()
       */
      openNewsPage(): Chainable<Element>


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
       * Custom command to fill the create GroupForm
       * @param group - Group to be created
       * @param user - Group creator
       * @example cy.fillCreateGroupForm()
       */
      fillCreateGroupForm(group: Group, user: User): Chainable<Element>

      /**
       * Custom command to createGroup
       * @param group - Group data
       * @example cy.createGroup(group)
       */
      createGroup(): Chainable<Element>

      /**
       * Custom command to search a group
       * @param group - Group data
       * @example cy.searchGroup(group)
       */
      searchGroup(group: Group): Chainable<Element>

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
       * Custom command to open chat with person
       * @param user - User data
       * @example cy.openChatWithUser(user)
       */
      openChatWithUser(user: User): Chainable<Element>

             /**
       * Custom command to open chat with group
       * @param group - Group data
       * @example cy.openChatWithGroup(group)
       */
      openChatWithGroup(group: Group): Chainable<Element>

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
      * @param user - User data
      * @example cy.removeGroupMembership()
      */
      removeGroupMembership(user: User): Chainable<Element>

      /**
      * Custom command to removeMyGroupMembershipFromMyProfile from my profile
      * @param group - Group data
      * @example cy.removeMyGroupMembershipFromMyProfile()
      */
      removeMyGroupMembershipFromMyProfile(group: Group): Chainable<Element>

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
      * Custom command to removeChat
      * @param user - User data
      * @example cy.removeChat()
      */
      removeChat(user: User): Chainable<Element>

      /**
      * Custom command to rejectChatRequest
      * @param user - User data
      * @example cy.rejectChatRequest()
      */
      rejectChatRequest(user: User): Chainable<Element>

      /**
      * Custom command to openChatsViaMenu
      * @example cy.openChatsViaMenu()
      */
      openChatsViaMenu(): Chainable<Element>

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
       * Custom command to sendMessage
       * @param message - Message string
       * @example cy.sendMessage()
       */
      sendMessage(message: string): Chainable<Element>

      /**
      * Custom command to check if a notification with a custom message exists
      * @param numberOfUnreadNotifications - Number of unread notifications after notification event happend
      * @param notificationMessage - Message which should be displayed in the notification tab 
      * @example cy.checkIfNotificationExists(1, 'Du hast einen neuen Follower')
      */
      checkIfNotificationExists(numberOfUnreadNotifications: number, notificationMessage: string): Chainable<Element>

    }
  }
}
