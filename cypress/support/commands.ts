/// <reference types="cypress" />
import { Group, User } from "."

Cypress.Commands.add('register', (name: string, email: string, password: string) => {
  cy.get('#register-cy').click()
  cy.get('[data-cy="name"]').clear()
  cy.get('[data-cy="name"]').type(name)
  cy.get('[data-cy="email"]').clear()
  cy.get('[data-cy="email"]').type(email)
  cy.get('[data-cy="password"]').clear()
  cy.get('[data-cy="password"]').type(password)
  cy.intercept('**/auth/v1/signup*').as('register')
  cy.get('[data-cy="createAccount"]').click()
  cy.wait('@register')
  cy.url().should('include', 'login')
})

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.get('#login-cy').click()
  cy.get('[data-cy="email"]').clear();
  cy.get('[data-cy="email"]').type(email);
  cy.get('[data-cy="password"]').clear();
  cy.get('[data-cy="password"]').type(password);
  cy.intercept('**/auth/v1/token*').as('login')
  cy.get('[data-cy="login"]').click();
  cy.wait('@login')
  cy.url().should('include', 'profile')
})

Cypress.Commands.add('logout', () => {
  cy.get('#profile-cy').click()
  cy.get('#edit-cy').click()
  cy.get('[data-cy="logout"]').click()
  cy.url().should('include', 'login')
})

Cypress.Commands.add('navigateFromProfileWikiToEditProfile', () => {
  cy.get('#profile-cy').click()
  cy.get('#edit-cy').click()
  cy.url().should('include', 'profile/edit')
  cy.get('[data-cy="profile-edit"]').click()
})

Cypress.Commands.add('fillChangeProfileForm', (user: User) => {
  cy.get('[data-cy="name"]').clear()
  cy.get('[data-cy="name"]').type(user.name)
  cy.get('[data-cy="website"]').clear()
  cy.get('[data-cy="website"]').type(user.website)
  cy.get('[data-cy="about"]').clear()
  cy.get('[data-cy="about"]').type(user.about)
  cy.get('[data-cy="contactEmail"]').clear()
  cy.get('[data-cy="contactEmail"]').type(user.contactEmail)
  cy.get('[data-cy="contactPhone"]').clear()
  cy.get('[data-cy="contactPhone"]').type(user.contactPhone)
  cy.get('[data-cy="street"]').clear()
  cy.get('[data-cy="street"]').type(user.street)
  cy.get('[data-cy="postCode"]').clear()
  cy.get('[data-cy="postCode"]').type(user.postCode)
  cy.get('[data-cy="city"]').clear()
  cy.get('[data-cy="city"]').type(user.city)
  cy.get('[data-cy="updateProfileInformationButton"]').click()
})

Cypress.Commands.add('fillChangeGroupForm', (group: Group) => {
  cy.get('[data-cy="about"]').clear().type(group.about)
  cy.get('[data-cy="contactEmail"]').clear().type(group.contactEmail)
  cy.get('[data-cy="contactPhone"]').clear().type(group.contactPhone)
  cy.get('[data-cy="street"]').clear().type(group.street)
  cy.get('[data-cy="postCode"]').clear().type(group.postCode)
  cy.get('[data-cy="city"]').clear().type(group.city)
  cy.get('[data-cy="updateGroupInformationButton"]').click()
})

Cypress.Commands.add('checkPopUpMessage', (message: string) => {
  cy.contains(message).parent().parent().find('button').click()
  cy.contains(message).should('not.exist')
})

Cypress.Commands.add('clickBackButton', () => {
  cy.get('[data-cy="backButton"]').click()
})

Cypress.Commands.add('checkIfImageExists', () => {
  cy.get('img').should('exist')
  cy.get('img').invoke('attr', 'src').should('include', 'storage/v1/object/public/avatars')
  cy.get('img')
    .should('be.visible')
    .and(($img: JQuery<HTMLImageElement>) => {
      // "naturalWidth" and "naturalHeight" are set when the image loads
      expect($img[0].naturalWidth).to.be.greaterThan(0)
    })
})

Cypress.Commands.add('uploadImage', (path: string) => {
  cy.contains('Choose').and('be.visible')
  cy.get('input[type=file]').selectFile(path, { force: true })
})

Cypress.Commands.add('openProfileLoggedInUserViaMainMenu', () => {
  cy.intercept('**/rest/v1/rpc/select_profile_and_counters*').as('profiles')
  cy.get('#profile-cy').click()
  cy.wait('@profiles')
})

Cypress.Commands.add('openProfileAndWaitForProfileData', () => {
  cy.intercept('**/rest/v1/rpc/select_profile_and_counters*').as('profiles')
  cy.get('#overview-cy').click()
  cy.wait('@profiles')
})

Cypress.Commands.add('openProfileAndWaitForProfileDataAndImage', () => {
  cy.intercept('**/rest/v1/rpc/select_profile_and_counters*').as('profiles')
  cy.get('#overview-cy').click()
  cy.wait('@profiles')

  // leave profile page and visit it again to stabilize image display test (not needed theoretically)
  cy.intercept('**/rest/v1/group_members?select=id*').as('group_list')
  cy.get('#groups-cy').click()
  cy.wait('@group_list')

  cy.intercept('**/rest/v1/rpc/select_profile_and_counters*').as('profilesSecond')
  cy.get('#profile-cy').click()
  cy.wait('@profilesSecond')
})

Cypress.Commands.add('openGroupProfileAndWaitForGroupData', () => {
  cy.intercept('**/rest/v1/rpc/select_group_and_counters*').as('group')
  cy.get('#overview-cy').click()
  cy.wait('@group')
})

Cypress.Commands.add('openGroupProfileAndWaitForGroupDataAndImage', () => {
  // leave profile page and visit it again to stabilize image display test (not needed theoretically)
  cy.intercept('**/rest/v1/rpc/select_group_and_counters*').as('group')
  cy.get('#overview-cy').click()
  cy.wait('@group')
  cy.get('#edit-cy').click()
  
  cy.intercept('**/rest/v1/rpc/select_group_and_counters*').as('group2')
  cy.get('#overview-cy').click()
  cy.wait('@group2')
})

Cypress.Commands.add('openProfileExteralAndWaitForProfileData', () => {
  cy.intercept('**/rest/v1/profiles*').as('profiles')
  cy.get('#overview-cy-external').click()
  cy.wait('@profiles')
})

Cypress.Commands.add('clickFollowButton', (popUpMessage: string) => {
  cy.intercept('**/rest/v1/rpc/followtransaction*').as('followtransaction')
  cy.get('[data-cy="followButton"]').click()
  cy.checkPopUpMessage(popUpMessage)
  cy.wait('@followtransaction')
})

Cypress.Commands.add('clickFollowGroupButton', (popUpMessage: string) => {
  cy.intercept('**/rest/v1/rpc/followgrouptransaction*').as('followtransaction')
  cy.get('[data-cy="followButton"]').click()
  cy.checkPopUpMessage(popUpMessage)
  cy.wait('@followtransaction')
})

Cypress.Commands.add('clickUnfollowButton', (popUpMessage: string) => {
  cy.intercept('**/rest/v1/rpc/unfollowtransaction*').as('unfollowtransaction')
  cy.contains('Unfollow').click()
  cy.checkPopUpMessage(popUpMessage)
  cy.wait('@unfollowtransaction')
})

Cypress.Commands.add('clickUnfollowGroupButton', (popUpMessage: string) => {
  cy.intercept('**/rest/v1/rpc/unfollowgrouptransaction*').as('unfollowtransaction')
  cy.contains('Unfollow').click()
  cy.checkPopUpMessage(popUpMessage)
  cy.wait('@unfollowtransaction')
})

Cypress.Commands.add('removeFollower', (user: User) => {
  cy.intercept('**/rest/v1/rpc/unfollowtransaction*').as('removeFollowerTransaction')
  cy.get('[data-cy="first-table"]').within(() => {
    cy.contains(user.name).parent().within(() => {
      cy.get('[icon="pi pi-times"]').click()
    })
  })
  cy.wait('@removeFollowerTransaction')
  cy.get('[data-cy="first-table"]').within(() => {
    cy.contains(user.name).should('not.exist')
  })
})

Cypress.Commands.add('removeGroupMembership', (user: User) => {
  cy.intercept('**/rest/v1/rpc/remove_membership_transaction_by_membership_id*').as('removeMembershipTransaction')
  cy.contains('Mitglieder').click()
  cy.filterSecondTab(user)
  cy.contains(user.name).should('be.visible')
    .nextAll('[data-cy="action-column"]')
    .children('[data-cy="removeFromSecondTab"]')
    .click()
  cy.wait('@removeMembershipTransaction')
  cy.contains(user.name).should('not.exist')
})

Cypress.Commands.add('removeMyGroupMembershipFromMyProfile', (group: Group) => {
  cy.get('#edit-cy').click()
  cy.get('[data-cy="groups-edit"]').click()
  cy.clickBackButton()
  cy.get('[data-cy="groups-edit"]').click()
  cy.intercept('**/rest/v1/rpc/remove_membership_transaction_by_membership_id*').as('removeMembershipTransaction')
  cy.filterFirstTabOfGroup(group)
  cy.get('[data-cy="removeFromFirstTab"]').click()
  cy.wait('@removeMembershipTransaction')
  cy.contains(group.name).should('not.exist')
})

Cypress.Commands.add('removeFollowerFromGroupAdmin', (user: User) => {
  cy.intercept('**/rest/v1/rpc/unfollowgrouptransaction*').as('removeGroupFollowingTransaction')
  cy.filterFirstTab(user)
  cy.contains(user.name)
  cy.get('[icon="pi pi-times"]').click()
  cy.wait('@removeGroupFollowingTransaction')
  cy.contains(user.name).should('not.exist')
})

Cypress.Commands.add('requestGroupMembership', () => {
  cy.intercept('**/rest/v1/rpc/request_membership_transaction*').as('requestMembershipTransaction')
  cy.contains('Mitgliedschaft anfragen')
  cy.get('[data-cy="requestedMembershipButton"]').click()
  cy.wait('@requestMembershipTransaction')
  // code does not work: Cypress does not detect the ongoing websocket connection
  // which delivers data to change the button. Therfore, the button check does not work
  // cy.contains('Anfrage zurückziehen')
})

Cypress.Commands.add('removeGroupFollowerFromEditFollower', (group: Group) => {
  cy.contains('Followings').click()
  cy.intercept('**/rest/v1/rpc/unfollowgrouptransaction*').as('removeGroupFollowingTransaction')
  cy.filterSecondTabOfGroup(group)
  cy.get('[data-cy="second-table"]').within(() => {
    cy.contains(group.name).parent().within(() => {
      cy.get('[icon="pi pi-times"]').click()
    })
  })
  cy.wait('@removeGroupFollowingTransaction')
})

Cypress.Commands.add('leaveGroup', () => {
  cy.contains('Austreten')
  cy.intercept('**/rest/v1/rpc/remove_membership_transaction*').as('leaveGroup')
  cy.get('[data-cy="requestedMembershipButton"]').click()
  cy.wait('@leaveGroup')
  cy.wait(1000)
  cy.wait(1000)
  cy.wait(1000)
  cy.wait(1000)
  cy.wait(100)
  cy.wait(100)
  cy.wait(100)
  cy.contains('Mitgliedschaft anfragen')
})

Cypress.Commands.add('openEditFollower', () => {
  cy.intercept('**/rest/v1/following_profile_system?select=follower%*').as('followerData')
  cy.intercept('**/rest/v1/following_profile_system?select=following%*').as('followingData')
  cy.intercept('**/rest/v1/following_group_system?select=id%2Cfollowing%*').as('followingGroupData')
  cy.get('[data-cy="follower-edit"]').click()
  cy.wait('@followingData')
  cy.wait('@followerData')
  cy.wait('@followingGroupData')
  cy.clickBackButton()
  cy.get('[data-cy="follower-edit"]').click()
})

Cypress.Commands.add('openEditFollowerOfGroup', () => {
  cy.intercept('**/rest/v1/following_group_system?select=id%2Cfollower%*').as('followerData')
  cy.get('[data-cy="follower-edit"]').click()
  cy.wait('@followerData')
  cy.clickBackButton()
  cy.get('[data-cy="follower-edit"]').click()
})

Cypress.Commands.add('openManageMembership', () => {
  cy.get('#edit-cy').click()
  cy.intercept('**/rest/v1/group_members?select=id*').as('groupMembers')
  cy.intercept('**/rest/v1/membership_requests?select=id*').as('membershipRequests')
  cy.get('[data-cy="members-edit"]').click()
  cy.wait('@groupMembers')
  cy.wait('@membershipRequests')
  cy.clickBackButton()
  cy.get('[data-cy="members-edit"]').click()
  cy.url().should('include', 'edit-members')
})

Cypress.Commands.add('cancelGroupMembershipRequest', (user: User) => {
  cy.intercept('**/rest/v1/rpc/cancel_membership_request_transaction_by_id*').as('cancelMembershipRequest')
  cy.filterFirstTab(user)
  cy.contains(user.name).parent().within(() => {
    cy.get('[data-cy="removeFromFirstTab"]').click()
    cy.wait('@cancelMembershipRequest')
    // cy.contains(user.name).should('not.exist') // commented out due to cypress issue, therefore no disappearing realtime test
  })
})

Cypress.Commands.add('acceptGroupMembershipRequest', (user: User) => {
  cy.intercept('**/rest/v1/rpc/confirm_membership_transaction*').as('acceptMembershipRequest')
  cy.filterFirstTab(user)
  cy.contains(user.name).parent().within(() => {
    cy.get('[data-cy="acceptFromFirstTab"]').click()
    cy.wait('@acceptMembershipRequest')
    // cy.contains(user.name).should('not.exist') // commented out due to cypress issue, therefore no disappearing realtime test
  })
})

Cypress.Commands.add('rejectChatRequest', (user: User) => {
  cy.intercept('**/rest/v1/rpc/reject_chat_request_transaction*').as('rejectChatRequest')
  cy.contains('Du hast eine neue Chat-Anfrage. Wie möchtest du reagieren?')
  cy.contains('Ablehnen').click()
  cy.url().should('include', 'orga')
  cy.wait('@rejectChatRequest')
  cy.contains(user.name).should('not.exist')
})

Cypress.Commands.add('acceptChatRequest', () => {
  cy.contains('Du hast eine neue Chat-Anfrage. Wie möchtest du reagieren?')
  cy.contains('Nur akzeptieren').click()
  cy.contains('Ihr habt euch noch keine Nachrichten geschrieben')
})

Cypress.Commands.add('filterFirstTab', (user: User) => {
  cy.get('[data-cy="filterFirstTab"]')
  .type(user.name)
  .type('{enter}')
})

Cypress.Commands.add('filterChats', (user: User) => {
  cy.get('[data-cy="filter-chats"]')
  .type(user.name)
  .type('{enter}')
})

Cypress.Commands.add('filterChatsGroup', (group: Group) => {
  cy.get('[data-cy="filter-chats"]')
  .type(group.name)
  .type('{enter}')
})

Cypress.Commands.add('filterFirstTabOfGroup', (group: Group) => {
  cy.get('[data-cy="filterFirstTab"]')
  .type(group.name)
  .type('{enter}')
})

Cypress.Commands.add('filterSecondTab', (user: User) => {
  cy.get('[data-cy="filterSecondTab"]')
  .type(user.name)
  .type('{enter}')
})

Cypress.Commands.add('filterSecondTabOfGroup', (group: Group) => {
  cy.get('[data-cy="filterSecondTab"]')
  .type(group.name)
  .type('{enter}')
})

Cypress.Commands.add('openEditFollowing', () => {
  cy.intercept('**/rest/v1/following_profile_system?select=id%2Cfollowing*').as('followingData')
  cy.get('[data-cy="follower-edit"]').click()
  cy.wait('@followingData')
})

Cypress.Commands.add('checkUserWikiDataAndVisibilityExeptImage', (user: User) => {
  cy.contains(user.name)
  cy.contains(user.about).and('be.visible')
  cy.contains(user.contactEmail).and('not.be.visible')
  cy.contains(user.contactPhone).and('not.be.visible')
  cy.contains(user.street).and('not.be.visible')
  cy.contains(user.postCode).and('not.be.visible')
  cy.contains(user.city).and('not.be.visible')

  cy.contains('Kontakt').click()
  cy.contains(user.about).and('not.be.visible')
  cy.contains(user.contactEmail).and('be.visible')
  cy.contains(user.contactPhone).and('be.visible')
  cy.contains(user.street).and('be.visible')
  cy.contains(user.postCode).and('be.visible')
  cy.contains(user.city).and('be.visible')

  cy.contains('Über').click()
})

Cypress.Commands.add('openGroupAndWaitForGroupData', () => {
  cy.intercept('**/rest/v1/rpc/select_group_and_counters*').as('groups')
  cy.get('#overview-cy').click()
  cy.wait('@groups')
})

Cypress.Commands.add('openGroupList', () => {
  cy.intercept('**/rest/v1/group_members?select=id*').as('group_list')
  cy.get('#groups-cy').click()
  cy.wait('@group_list')
})

Cypress.Commands.add('checkGroupWikiDataAndVisibilityExeptImage', (group: Group) => {
  cy.contains(group.name)
  cy.contains(group.about).and('be.visible')
  cy.contains('Kontakt').click()
  cy.contains(group.contactEmail).and('be.visible')
  cy.contains(group.contactPhone).and('be.visible')
  cy.contains(group.street).and('be.visible')
  cy.contains(group.postCode).and('be.visible')
  cy.contains(group.city).and('be.visible')
  cy.contains('Über').click()
})

Cypress.Commands.add('uploadProfileImage', () => {
  cy.get('#profile-cy').click()
  cy.get('#edit-cy').click()
  cy.get('[data-cy="logout"]').click()
    cy.url().should('include', 'login')
})

Cypress.Commands.add('searchUser', (user: User) => {
  cy.get('#search-cy').click()
  cy.get('[data-cy="searchBar"]').type(user.ftsName).type('{enter}')
  cy.contains(user.name).click()
  cy.url().should('include', 'profile')
  cy.contains(user.name)
  cy.contains(user.about)
})

Cypress.Commands.add('fillCreateGroupForm', (group: Group, user: User) => {
  cy.get('#name-input').clear().type(group.name)
  cy.get('#about-input').clear().type(group.about)
  cy.contains(group.level).click()
  cy.contains('Vorwärts').click()
  cy.contains(group.name)
  cy.contains(group.about)
  cy.contains(group.level)
  cy.contains(user.name)
  cy.get('[data-cy="create-group-button"]').click()
})

Cypress.Commands.add('searchGroup', (group: Group) => {
  cy.get('#search-cy').click()
  cy.get('[data-cy="search-tab-view"]').within((tabView) => {
    cy.contains('span', 'GRUPPEN').parent().click()
  })
  cy.get('[data-cy="searchBar"]').type(group.ftsName).type('{enter}')
  cy.contains(group.name).click()
  cy.url().should('include', 'groups')
  cy.contains(group.name)
  cy.contains(group.about)
})

Cypress.Commands.add('openChatsViaMenu', () => {
  cy.intercept('**/rest/v1/rpc/select_all_rooms_of_user*').as('allRoomsOfUser')
  cy.get('#orga-cy').click()
  cy.wait('@allRoomsOfUser')
})

Cypress.Commands.add('sendMessage', (message: string) => {
  cy.intercept('**/rest/v1/rpc/send_message_transaction*').as('sendMessage')
  cy.get('[data-cy="send-message"]')
  .type(message)
  .type('{enter}')
  cy.wait('@sendMessage')
  cy.contains(message)
})

Cypress.Commands.add('openChatWithUser', (user: User) => {
  cy.filterChats(user)
  cy.contains(user.name).click()
  cy.contains(user.name)
})

Cypress.Commands.add('openChatWithGroup', (group: Group) => {
  cy.filterChatsGroup(group)
  cy.contains(group.name).click()
  cy.contains(group.name)
})

Cypress.Commands.add('removeChat', (user: User) => {
  cy.intercept('**/rest/v1/rpc/reject_chat_request_transaction*').as('removeChat')
  cy.get('[data-cy="delete-chat"]').click()
  cy.wait('@removeChat')
  cy.filterChats(user)
  cy.contains(user.name).should('not.exist')
})

Cypress.Commands.add('openNewsPage', () => {
  cy.openChatsViaMenu()
  cy.intercept('**/rest/v1/rpc/select_notifications_from_groups_user_admin*').as('selectNews')
  cy.intercept('**/rest/v1/rpc/reset_unread_notifications_counter*').as('resetCounter')
  cy.get('#news-cy').click()
  cy.wait('@selectNews')
  cy.wait('@resetCounter')
})

Cypress.Commands.add('checkIfNotificationExists', (numberOfUnreadNotifications: number, notificationMessage: string) => {
  // not needed but makes cypress wait for a while which gives not observed data transfer via websocket a chance to success
  cy.openGroupList()
  cy.openProfileLoggedInUserViaMainMenu()
  cy.get('[data-cy="unreadMessagesCounter"]').contains(numberOfUnreadNotifications)
  cy.openNewsPage()    
  cy.contains(notificationMessage)
})
