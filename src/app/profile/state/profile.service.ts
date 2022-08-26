import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { createClient, RealtimeSubscription, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { FollowingService } from 'src/app/following-profiles-system/services/following.service';
import { GroupsService } from 'src/app/groups/state/groups.service';
import { profile_list_item } from 'src/app/groups/state/profile_list_item.model';
import { environment } from 'src/environments/environment';
import { ProfileCore } from './profile.model';
import { ProfileQuery } from './profile.query';
import { ProfileStore } from './profile.store';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private supabaseClient: SupabaseClient;

  constructor(
    private profileStore: ProfileStore,
    private profileFollowingService: FollowingService,
    private groupsService: GroupsService,
    private profileQuery: ProfileQuery,
    private authentificationQuery: AuthentificationQuery
    ) {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)

  }

  add(uuid: string) {
    this.selectProfil(uuid)
    .then((results) => {
      const profile: ProfileCore = results.data;
      // console.log(profile);
      this.profileStore.add(profile);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getRealTimeChanges(uuid: string): RealtimeSubscription {
    const subscription = this.supabaseClient
    .from<ProfileCore>(`profiles:id=eq.${uuid}`)
    .on('UPDATE', (payload) => {
      this.profileStore.update(payload.new.id, payload.new)
    })
    .subscribe()
    return subscription;
  }

  update(id: any, profile: Partial<ProfileCore>) {
    console.log('called')
    console.log(profile)
    const update = {
      ...profile,
      id: id,
      fts: undefined,
      updated_at: new Date()
    }
    console.log('update')
    console.log(update)
    return this.supabaseClient.from('profiles').upsert(update, {
      returning: 'minimal', // Don't return the value after inserting
    })
    .then(() => {
      //console.log('worked')
      // this.profileStore.update(id, profile);
    });
  }

  remove(id: ID) {
    this.profileStore.remove(id);
  }

  private async selectProfil(uuid: string): Promise<{data: any, error: any}> {
    const results: {data: any, error: any} = await this.supabaseClient
      .from('profiles')
      .select(
        `id,
        name,
        website,
        avatar_url,
        contact_email,
        contact_phone,
        street,
        post_code,
        city,
        about,
        amendment_counter,
        follower_counter,
        following_counter,
        groups_counter`
      )
      .eq('id', uuid)
      .single()
    // console.log(results);
    return results;
  }

  getAllFollowers(profil_id: string): void {
    this.profileFollowingService.getAllFollower(profil_id)
    .then((response) => {
      console.log('response')
      console.log(response)

      let allFollowers: profile_list_item[] = [];
      response.data.forEach((profile: {
        id: string,
        profiles: {
          avatar_url: string,
          id: string,
          name: string,
        },
        follower: string
      }) => {
        allFollowers.push(
          {
            id: profile.id,
            user_id: profile.follower,
            avatar_url: profile.profiles.avatar_url,
            name: profile.profiles.name
          }
        )
      })
      this.profileStore.update(profil_id, {followers: allFollowers})

    })
    .catch((error) => console.log(error))
  }

  getAllFollowings(profil_id: string): void {
    this.groupsService.getAllFollowings(profil_id)
    .then((groups) => {
      console.log('group followings')
      console.log('response')
      console.log(groups)

      this.profileFollowingService.getAllFollowing(profil_id)
      .then((profiles) => {
        console.log('profile followings')
        console.log('response')
        console.log(profiles)

        let allFollowings: profile_list_item[] = [];
        profiles.data.forEach((profile: {
          id: string,
          profiles: {
            avatar_url: string,
            id: string,
            name: string,
          },
          following: string
        }) => {
          allFollowings.push(
            {
              id: profile.id,
              user_id: profile.following,
              avatar_url: profile.profiles.avatar_url,
              name: profile.profiles.name,
              isGroup: false
            }
          )
        })
        groups.data.forEach((group: {
          id: string,
          groups: {
            avatar_url: string,
            id: string,
            name: string,
          },
          following: string
        }) => {
          allFollowings.push(
            {
              id: group.id,
              user_id: group.following,
              avatar_url: group.groups.avatar_url,
              name: group.groups.name,
              isGroup: true
            }
          )
        })
        this.profileStore.update(profil_id, {followings: allFollowings})

      })
      .catch((error) => console.log(error))
    })
  }

  getRealTimeChangesFollowerSystem(profil_id: string): RealtimeSubscription {
    console.log('test 2 activated')
    const subscription = this.supabaseClient
    .from<any>(`following_profile_system`)
    .on('INSERT', (payload) => {
      console.log('Payload')
      console.log(payload)
      if(payload.new.following === profil_id) {
        this.groupsService.selectProfile(payload.new.follower).then((member) => {
          console.log(member)
          console.log(member.data.id)
          console.log(member.data.name)
          console.log(member.data.avatar_url)
          console.log()
          let memberData: profile_list_item = {
            id: payload.new.id,
            user_id: member.data.id,
            avatar_url: member.data.avatar_url,
            name: member.data.name
          }
          console.log(memberData)
          const entity = this.profileQuery.getEntity(profil_id);
          console.log('oldState');
          console.log(entity?.followers);
          if(entity && entity.followers) {
            const followers: profile_list_item[] = Object.assign([], entity.followers)
            followers.push(memberData);
            console.log('newState');
            console.log(followers)
            this.profileStore.update(profil_id, {followers: followers})
          }
        })
      }
      if(payload.new.follower === profil_id) {
        this.groupsService.selectProfile(payload.new.following).then((member) => {
          console.log(member)
          console.log(member.data.id)
          console.log(member.data.name)
          console.log(member.data.avatar_url)
          console.log()
          let memberData: profile_list_item = {
            id: payload.new.id,
            user_id: member.data.id,
            avatar_url: member.data.avatar_url,
            name: member.data.name
          }
          console.log(memberData)
          const entity = this.profileQuery.getEntity(profil_id);
          console.log('oldState');
          console.log(entity?.followings);
          if(entity && entity.followings) {
            const followings: profile_list_item[] = Object.assign([], entity.followings)
            followings.push(memberData);
            console.log('newState');
            console.log(followings)
            this.profileStore.update(profil_id, {followings: followings})
          }
        })
      }
    })
    .on('DELETE', (payload) => {
      console.log('Payload')
      console.log(payload)
      if(payload.old.following === profil_id) {
          console.log(payload.old.id)
          const entity = this.profileQuery.getEntity(profil_id);
          console.log('oldState');
          console.log(entity);
          if(entity && entity.followers) {
            const followers: profile_list_item[] = Object.assign([], entity.followers)
            let requestId: number = followers.findIndex((request) => request.id === payload.old.id);
            followers.splice(requestId);
            console.log('newState');
            console.log(requestId)
            console.log(payload.old.id)
            console.log(followers);
            this.profileStore.update(profil_id, {followers: followers})
          }
      }
      if(payload.old.follower === profil_id) {
        console.log(payload.old.id)
        const entity = this.profileQuery.getEntity(profil_id);
        console.log('oldState');
        console.log(entity);
        if(entity && entity.followings) {
          const followings: profile_list_item[] = Object.assign([], entity.followers)
          let requestId: number = followings.findIndex((request) => request.id === payload.old.id);
          followings.splice(requestId);
          console.log('newState');
          console.log(requestId)
          console.log(payload.old.id)
          console.log(followings);
          this.profileStore.update(profil_id, {followings: followings})
        }
    }
    })
    .subscribe()
    return subscription;
  }

  getRealTimeChangesGroupFollowerSystem(profil_id: string): RealtimeSubscription {
    console.log('test 2 activated')
    const subscription = this.supabaseClient
    .from<any>(`following_group_system`)
    .on('INSERT', (payload) => {
      console.log('Payload')
      console.log(payload)
      if(payload.new.follower === profil_id) {
        this.groupsService.selectGroup(payload.new.following).then((group) => {
          console.log(group)
          console.log(group.data.id)
          console.log(group.data.name)
          console.log(group.data.avatar_url)
          console.log()
          let groupData: profile_list_item = {
            id: payload.new.id,
            user_id: group.data.id,
            avatar_url: group.data.avatar_url,
            name: group.data.name
          }
          console.log(groupData)
          const entity = this.profileQuery.getEntity(profil_id);
          console.log('oldState');
          console.log(entity?.followings);
          if(entity && entity.followings) {
            const followings: profile_list_item[] = Object.assign([], entity.followings)
            followings.push(groupData);
            console.log('newState');
            console.log(followings)
            this.profileStore.update(profil_id, {followings: followings})
          }
        })
      }
    })
    .on('DELETE', (payload) => {
      console.log('Payload')
      console.log(payload)
      if(payload.old.follower === profil_id) {
        console.log(payload.old.id)
        const entity = this.profileQuery.getEntity(profil_id);
        console.log('oldState');
        console.log(entity);
        if(entity && entity.followings) {
          const followings: profile_list_item[] = Object.assign([], entity.followers)
          let requestId: number = followings.findIndex((request) => request.id === payload.old.id);
          followings.splice(requestId);
          console.log('newState');
          console.log(requestId)
          console.log(payload.old.id)
          console.log(followings);
          this.profileStore.update(profil_id, {followings: followings})
        }
    }
    })
    .subscribe()
    return subscription;
  }

  checkIfIsOwner(profil_id: string): void {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    })

    if(loggedInID === profil_id) {
      this.updateIsProfileOwner(loggedInID, true)
    } else {
      this.updateIsProfileOwner(profil_id, false)
    }
  }

  updateIsFollowing(id: string, valueIsFollowing: boolean): void {
    const update = {isFollowing: valueIsFollowing}
    this.profileStore.ui.upsert(id, update)
  }

  updateIsProfileOwner(id: string, valueIsOwner: boolean): void {
    const update = {isOwner: valueIsOwner}
    this.profileStore.ui.upsert(id, update)
  }

  updateGroupsOfProfile(id: string, groupsOfProfile: profile_list_item[]): void {
    const update = {groups: groupsOfProfile}
    this.profileStore.upsert(id, update)
  }

  getRealTimeChangesIfStillFollower(profile_id: string): RealtimeSubscription {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    })
    console.log('Is still follower called?')
    console.log(loggedInID)
    const subscription = this.supabaseClient
    .from<any>(`following_profile_system`)
    .on('INSERT', (payload) => {
      console.log('Payload')
      console.log(payload)
      if(payload.new.following === profile_id && payload.new.follower === loggedInID) {
        this.updateIsFollowing(profile_id, true);
      }
    })
    .on('DELETE', (payload) => {
      console.log('Payload')
      console.log(payload)
      console.log('profile.id_')
      console.log(payload.old.following)
      console.log(profile_id)
      if(payload.old.following === profile_id && payload.old.follower === loggedInID) {
        this.updateIsFollowing(profile_id, false);
      }
    })
    .subscribe()
    return subscription;
  }

  getRealTimeChangesGroupsOfProfile(user_id: string): RealtimeSubscription {
    console.log('activated Get followers')
    const subscription = this.supabaseClient
    .from<any>(`group_members`)
    .on('INSERT', (payload) => {
      console.log('Payload')
      console.log(payload)
      if(payload.new.user_id === user_id) {
        this.groupsService.selectGroup(payload.new.group_id).then((group) => {
          console.log(group)
          console.log(group.data.id)
          console.log(group.data.name)
          console.log(group.data.avatar_url)
          console.log()

          let groupData: profile_list_item = {
            id: payload.old.id,
            user_id: group.data.id,
            avatar_url: group.data.avatar_url,
            name: group.data.name
          }
          console.log(groupData)
          const entity = this.profileQuery.getEntity(user_id);

          console.log('oldState');
          console.log(entity);
          console.log('oldState followers');
          console.log(entity?.followers);

          if(entity && entity.groups) {
            const groupsOfProfile: profile_list_item[] = Object.assign([], entity.groups)
            groupsOfProfile.push(groupData);
            console.log('newState');
            console.log(groupsOfProfile)
            this.profileStore.update(user_id, {groups: groupsOfProfile})
          }
        })
      }
    })
    .on('DELETE', (payload) => {
      console.log('Payload')
      console.log(payload)
      console.log('group.id_')
      console.log(payload.old.following)
      console.log(user_id)
      if(payload.old.user_id === user_id) {
        this.groupsService.selectGroup(payload.old.group_id).then((group) => {
          console.log(group)
          console.log(group.data.id)
          console.log(group.data.name)
          console.log(group.data.avatar_url)
          console.log()

          let groupData: profile_list_item = {
            id: payload.old.id,
            user_id: group.data.id,
            avatar_url: group.data.avatar_url,
            name: group.data.name
          }
          console.log(groupData)
          const entity = this.profileQuery.getEntity(user_id);
          console.log('oldState');
          console.log(entity?.groups);
          if(entity && entity.groups) {
            const groupsOfProfile: profile_list_item[] = Object.assign([], entity.groups)
            let requestId: number = groupsOfProfile.findIndex((request) => request.id === payload.old.id);
            groupsOfProfile.splice(requestId);
            console.log('newState');
            console.log(requestId)
            console.log(payload.old.id)
            console.log(groupsOfProfile);
            this.profileStore.update(user_id, {groups: groupsOfProfile})
          }
        })
      }
    })
    .subscribe()
    return subscription;
  }

}
