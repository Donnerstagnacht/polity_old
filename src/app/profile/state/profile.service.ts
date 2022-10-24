import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { createClient, RealtimeChannel, SupabaseClient, PostgrestResponse, RealtimeRemoveChannelResponse, RealtimePostgresChangesPayload, RealtimePostgresUpdatePayload } from '@supabase/supabase-js';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { FollowingService } from 'src/app/following-profiles-system/services/following.service';
import { GroupsService } from 'src/app/groups/state/groups.service';
import { profile_list_item } from 'src/app/groups/state/profile_list_item.model';
import { environment } from 'src/environments/environment';
import { Profile, ProfileCore, ProfileCounters } from './profile.model';
import { ProfileQuery } from './profile.query';
import { ProfileStore } from './profile.store';
import { Subscription } from 'rxjs';
import { Database } from 'lib/database.types';
import { RealtimeChannelSnapshot } from 'lib/realtime';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private supabaseClient: SupabaseClient;
  authSubscription: Subscription | undefined;
  loggedInID: string | null = '';

  constructor(
    private profileStore: ProfileStore,
    private profileFollowingService: FollowingService,
    private groupsService: GroupsService,
    private profileQuery: ProfileQuery,
    private authentificationQuery: AuthentificationQuery
  ) {
    this.supabaseClient = createClient<Database>(environment.supabaseUrl, environment.supabaseKey);
    this.authSubscription = this.authentificationQuery.uuid$.subscribe(uuid => {
      this.loggedInID = uuid;
    })
  }

  ngOnDestroy(): void {
    if(this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  async upsert(uuid: string): Promise<void> {
    await this.selectProfil(uuid)
    .then((results) => {
      console.log('results inner')
      console.log(results)
      const profile: ProfileCore = results;
      console.log('profile data from service');
      console.log(profile);
      this.profileStore.upsert(uuid, profile);
    })
    .catch((error) => {
      // console.log(error);
      throw new Error(error.message);
    })
  }

  getRealTimeChanges(uuid: string): RealtimeChannel {
    console.log('called')
    const subscription = this.supabaseClient
      .channel(`public:profiles:id=eq.${uuid}`)
      .on('postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles'
        },
        (payload: RealtimeChannelSnapshot<any>) => {
          console.log('update')
          console.log(payload)
          this.profileStore.upsert(payload.record.id, payload.record)
        }
      )
      .on('postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'profiles'
      },
      (payload: RealtimeChannelSnapshot<any>) => {
        console.log('insert')
        console.log(payload)
        this.profileStore.upsert(payload.record.id, payload.record)
      }
    )
/*     .from<ProfileCore>(`profiles:id=eq.${uuid}`)
    .on('UPDATE', (payload) => {
      console.log('update')
      console.log(payload)
      this.profileStore.upsert(payload.new.id, payload.new)
    }) */
    // .on('INSERT', (payload) => {
/*       console.log('insert')
      console.log(payload)
      this.profileStore.upsert(payload.new.id, payload.new) */
   // })
    .subscribe()
    return subscription;
  }

  getRealTimeChangesCounters(uuid: string): RealtimeChannel {
    console.log('called counters', uuid)
    const subscription = this.supabaseClient
    .channel(`public:profiles_counters:id=eq.${uuid}`)
    // .channel('*')
    .on('postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'profiles_counters'
      },
      (payload: any) => {
      // (payload: RealtimeChannelSnapshot<ProfileCounters>) => {
        console.log('update after follow')
        console.log(payload)


        if(payload.new) {
          console.log('record exists')
          console.log('id', payload.new.id)
          console.log('record', payload.new)
          this.profileStore.upsert(payload.new.id, payload.new)
        }
/*         console.log(payload.record)
        console.log(payload.record?.amendment_counter)
        console.log(payload.columns)
        console.log(payload.type)
        console.log(payload.old_record)
        console.log(payload.schema)
        console.log(payload.table)
        if(payload.record) {
          this.profileStore.upsert(payload.record.id, payload.record)
        } */
      }
    )
    .subscribe()
    return subscription;
    /*     .from(`profiles_counters`)
    // .from(`profiles_counters:id=eq.${uuid}`)
    .on('UPDATE', (payload) => {
      console.log('update')
      console.log(payload)
      this.profileStore.upsert(payload.new.id, payload.new)
    }) */
/*     .on('INSERT', (payload) => {
      console.log('insert')
      console.log(payload)
      this.profileStore.upsert(payload.new.id, payload.new)
    }) */
  }

  async update(id: any, profile: Partial<ProfileCore>): Promise<PostgrestResponse<any>> {
    const update = {
      ...profile,
      id: id,
      fts: undefined,
      updated_at: new Date()
    }
    console.log('update')
    console.log(update)
    const response: PostgrestResponse<any> = await this.supabaseClient
      .from('profiles')
      .update(update) /* {
        returning: 'minimal', // Don't return the value after inserting
      }) */
      .eq('id', id)
    if (response.error) throw new Error(response.error.message);
    return response;
  }

  remove(id: ID) {
    this.profileStore.remove(id);
  }

  private async selectProfil(uuid: string): Promise<ProfileCore> {
    const results: {data: any, error: any} = await this.supabaseClient
      .rpc('select_profile_and_counters', {
        user_id: uuid
      });
/*       .from('profiles')
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
        profiles_counters (
          amendment_counter,
          follower_counter,
          following_counter,
          groups_counter,
          unread_notifications_counter
        )
        `
      )
      .eq('id', uuid)
      .single(); */
      if(results.error) throw  new Error(results.error.message);
      console.log(results.data);
      console.log(results.data[0]);
      const profileCore: ProfileCore = results.data[0];
      console.log(results.data[0]);
    return profileCore;
  }

  async getAllFollowers(profil_id: string): Promise<void> {
    const response: {data: any, error: any} = await this.profileFollowingService.getAllFollower(profil_id);
    if(response.data) {
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
      this.profileStore.upsert(profil_id, {followers: allFollowers})
    }
    if(response.error) throw new Error(response.error);
  }

  async getAllFollowings(profil_id: string): Promise<void> {
    const groups: {data: any, error: any} = await this.groupsService.getAllFollowings(profil_id);
    const profiles: {data: any, error: any} = await this.profileFollowingService.getAllFollowing(profil_id);
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
    this.profileStore.upsert(profil_id, {followings: allFollowings})
    if(groups.error) throw new Error(groups.error.message);
    if(profiles.error) throw new Error(profiles.error.message);
  }

  getRealTimeChangesFollowerSystem(profil_id: string): RealtimeChannel {
    console.log('test 2 activated')
    const subscription = this.supabaseClient
    .channel(`public:following_profile_system`)
    .on('postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'following_profile_system'
      },
      (payload: RealtimeChannelSnapshot<any>) => {
        console.log('Payload')
        console.log(payload)
        if(payload.record.following === profil_id) {
          this.groupsService.selectProfile(payload.record.follower).then((member) => {
            console.log(member)
            console.log(member.data.id)
            console.log(member.data.name)
            console.log(member.data.avatar_url)
            console.log()
            let memberData: profile_list_item = {
              id: payload.record.id,
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
        if(payload.record.follower === profil_id) {
          this.groupsService.selectProfile(payload.record.following).then((member) => {
            console.log(member)
            console.log(member.data.id)
            console.log(member.data.name)
            console.log(member.data.avatar_url)
            console.log()
            let memberData: profile_list_item = {
              id: payload.record.id,
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
      }
    )
/*     .from<any>(`following_profile_system`)
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
    }) */
    .on('postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'following_profile_system'
      },
      (payload: RealtimeChannelSnapshot<any>) => {
        console.log('Payload')
        console.log(payload)
        if(payload.old_record.following === profil_id) {
            console.log(payload.old_record.id)
            const profile: Profile | undefined = this.profileQuery.getEntity(profil_id);
            console.log('oldState');
            console.log(profile);
            if(profile && profile.followers) {
              const followers: profile_list_item[] = Object.assign([], profile.followers)
              let idToSliceOut: number = followers.findIndex((follower: profile_list_item) => follower.id === payload.old_record.id);
              followers.splice(idToSliceOut, 1);
              console.log('newState');
              console.log(idToSliceOut)
              console.log(payload.old_record.id)
              console.log(followers);
              this.profileStore.update(profil_id, {followers: followers})
            }
        }
        if(payload.old_record.follower === profil_id) {
          console.log('follower')
          const entity = this.profileQuery.getEntity(profil_id);
          console.log('oldState');
          console.log();
          if(entity && entity.followings) {
            const followings: profile_list_item[] = Object.assign([], entity.followings)
            console.log('followings')
            console.log(entity.followings)
            console.log('to Delete')
            console.log()
            let idToSpliceOut: number = followings.findIndex((following: profile_list_item) => following.user_id === payload.old_record.following);
            console.log(idToSpliceOut)
            console.log(payload.old_record.id)
            followings.splice(idToSpliceOut, 1);
            console.log('newState');
            console.log(followings);
            this.profileStore.update(profil_id, {followings: followings})
          }
      }
      }
    )
/*     .on('DELETE', (payload) => {
      console.log('Payload')
      console.log(payload)
      if(payload.old.following === profil_id) {
          console.log(payload.old.id)
          const profile: Profile | undefined = this.profileQuery.getEntity(profil_id);
          console.log('oldState');
          console.log(profile);
          if(profile && profile.followers) {
            const followers: profile_list_item[] = Object.assign([], profile.followers)
            let idToSliceOut: number = followers.findIndex((follower: profile_list_item) => follower.id === payload.old.id);
            followers.splice(idToSliceOut, 1);
            console.log('newState');
            console.log(idToSliceOut)
            console.log(payload.old.id)
            console.log(followers);
            this.profileStore.update(profil_id, {followers: followers})
          }
      }
      if(payload.old.follower === profil_id) {
        console.log('follower')
        const entity = this.profileQuery.getEntity(profil_id);
        console.log('oldState');
        console.log();
        if(entity && entity.followings) {
          const followings: profile_list_item[] = Object.assign([], entity.followings)
          console.log('followings')
          console.log(entity.followings)
          console.log('to Delete')
          console.log()
          let idToSpliceOut: number = followings.findIndex((following: profile_list_item) => following.user_id === payload.old.following);
          console.log(idToSpliceOut)
          console.log(payload.old.id)
          followings.splice(idToSpliceOut, 1);
          console.log('newState');
          console.log(followings);
          this.profileStore.update(profil_id, {followings: followings})
        }
    }
    }) */
    .subscribe()
    return subscription;
  }

  getRealTimeChangesGroupFollowerSystem(profil_id: string): RealtimeChannel {
    console.log('test 2 activated')
    const subscription = this.supabaseClient
      .channel('following_group_system')
      .on('postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'following_group_system'
        },
        (payload: RealtimeChannelSnapshot<any>) => {
          console.log('Payload')
          console.log(payload)
          if(payload.record.follower === profil_id) {
            this.groupsService.selectGroup(payload.record.following).then((group) => {
              console.log(group)
              console.log(group.data.id)
              console.log(group.data.name)
              console.log(group.data.avatar_url)
              console.log()
              let groupData: profile_list_item = {
                id: payload.record.id,
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
        }
      )
      .on('postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'following_group_system'
        },
        (payload: RealtimeChannelSnapshot<any>) => {
          console.log('Payload')
          console.log(payload)
          if(payload.old_record.follower === profil_id) {
            const entity = this.profileQuery.getEntity(profil_id);
            console.log('oldState');
            console.log(entity);
            if(entity && entity.followings) {
              const followings: profile_list_item[] = Object.assign([], entity.followings)
              let requestId: number = followings.findIndex((request) => request.id === payload.old_record.id);
              followings.splice(requestId, 1);
              console.log('newState');
              console.log(requestId)
              console.log(payload.old_record.id)
              console.log(followings);
              this.profileStore.update(profil_id, {followings: followings})
            }
        }
        }
      )
    // .from<any>(`following_group_system`)
/*     .on('INSERT', (payload) => {
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
    }) */
/*     .on('DELETE', (payload) => {
      console.log('Payload')
      console.log(payload)
      if(payload.old.follower === profil_id) {
        const entity = this.profileQuery.getEntity(profil_id);
        console.log('oldState');
        console.log(entity);
        if(entity && entity.followings) {
          const followings: profile_list_item[] = Object.assign([], entity.followings)
          let requestId: number = followings.findIndex((request) => request.id === payload.old.id);
          followings.splice(requestId, 1);
          console.log('newState');
          console.log(requestId)
          console.log(payload.old.id)
          console.log(followings);
          this.profileStore.update(profil_id, {followings: followings})
        }
    }
    }) */
    .subscribe()
    return subscription;
  }

  checkIfIsOwner(profil_id: string): void {
    if(this.loggedInID) {
      if(profil_id === this.loggedInID) {
        this.updateIsProfileOwner(this.loggedInID, true);
        console.log('owner')
      } else {
        this.updateIsProfileOwner(profil_id, false);
        console.log('not owner')
      }
    } else {
      this.updateIsProfileOwner(profil_id, false);
      console.log('not owner')
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

  updateUnreadNotificationCounter(id: string): void {
    const update = {unread_notifications_counter: 0}
    this.profileStore.upsert(id, update)
  }

  updateGroupsOfProfile(id: string, groupsOfProfile: profile_list_item[]): void {
    const update = {groups: groupsOfProfile}
    this.profileStore.upsert(id, update)
  }

  getRealTimeChangesIfStillFollower(profile_id: string): RealtimeChannel {
    console.log('Still follower called')
    let loggedInID: string | null = '';
    if(this.loggedInID) {
      loggedInID = this.loggedInID;
    }
    const subscription = this.supabaseClient
      .channel('public:following_profile_system')
      .on('postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'following_profile_system'
        },
        (payload: RealtimeChannelSnapshot<any>) => {
          console.log('still follower', payload)
          if(payload.record.following === profile_id && payload.record.follower === loggedInID) {
            this.updateIsFollowing(profile_id, true);
          }
        }
      )
      .on('postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'following_profile_system'
      },
      (payload: RealtimeChannelSnapshot<any>) => {
        console.log('Payload')
        console.log(payload)
        console.log('profile.id_')
        console.log(payload.old_record.following)
        console.log(profile_id)
        if(payload.old_record['following'] === profile_id && payload.old_record.follower === loggedInID) {
          this.updateIsFollowing(profile_id, false);
        }
      }
    )
    // .from<any>(`following_profile_system`)
/*     .on('INSERT', (payload) => {
      console.log('Payload')
      console.log(payload)
      if(payload.new.following === profile_id && payload.new.follower === loggedInID) {
        this.updateIsFollowing(profile_id, true);
      }
    }) */
/*     .on('DELETE', (payload) => {
      console.log('Payload')
      console.log(payload)
      console.log('profile.id_')
      console.log(payload.old.following)
      console.log(profile_id)
      if(payload.old.following === profile_id && payload.old.follower === loggedInID) {
        this.updateIsFollowing(profile_id, false);
      }
    })
 */    .subscribe()
    return subscription;
  }

  getRealTimeChangesGroupsOfProfile(user_id: string): RealtimeChannel {
    console.log('activated Get followers')
    const subscription = this.supabaseClient
      .channel(`public:group_members`)
      .on('postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'group_members'
        },
        (payload: RealtimeChannelSnapshot<any>) => {
          console.log('Payload')
          console.log(payload)
          if(payload.record.user_id === user_id) {
            this.groupsService.selectGroup(payload.record.group_id).then((group) => {
              console.log(group)
              console.log(group.data.id)
              console.log(group.data.name)
              console.log(group.data.avatar_url)
              console.log()
    
              let groupData: profile_list_item = {
                // id: payload.old['id'],
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
                this.profileStore.upsert(user_id, {groups: groupsOfProfile})
              }
            })
          }
        })
        .on('postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'group_members'
        },
        (payload: RealtimeChannelSnapshot<any>) => {
          console.log('Payload')
          console.log(payload)
          console.log('group.id_')
          console.log(payload.old_record.following)
          console.log(user_id)
          if(payload.old_record.user_id === user_id) {
            this.groupsService.selectGroup(payload.old_record.group_id).then((group) => {
              console.log(group)
              console.log(group.data.id)
              console.log(group.data.name)
              console.log(group.data.avatar_url)
              console.log()
    
              let groupData: profile_list_item = {
                id: payload.old_record.id,
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
                let requestId: number = groupsOfProfile.findIndex((request) => request.id === payload.old_record.id);
                groupsOfProfile.splice(requestId, 1);
                console.log('newState');
                console.log(requestId)
                console.log(payload.old_record.id)
                console.log(groupsOfProfile);
                this.profileStore.upsert(user_id, {groups: groupsOfProfile})
              }
            })
          }
        }
      )
/*     .from<any>(`group_members`)
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
            this.profileStore.upsert(user_id, {groups: groupsOfProfile})
          }
        })
      }
    }) */
/*     .on('DELETE', (payload) => {
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
            groupsOfProfile.splice(requestId, 1);
            console.log('newState');
            console.log(requestId)
            console.log(payload.old.id)
            console.log(groupsOfProfile);
            this.profileStore.upsert(user_id, {groups: groupsOfProfile})
          }
        })
      }
    }) */
    .subscribe()
    return subscription;
  }

}
