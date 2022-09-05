import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { GroupsStore, GroupsState } from './groups.store';
import { Group, GroupCore } from './group.model';
import { createClient, PostgrestResponse, RealtimeSubscription, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { profile_list_item } from './profile_list_item.model';
import { GroupsQuery } from './groups.query';
@Injectable({ providedIn: 'root' })
export class GroupsService extends NgEntityService<GroupsState> {
  private supabaseClient: SupabaseClient;

  constructor(
    private groupsQuery: GroupsQuery,
    protected override groupsStore: GroupsStore) {
    super(groupsStore);
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  async findGroup(uuid: string): Promise<void> {
    try {
      const results: {data: any, error: any} = await this.selectGroup(uuid);
      if(results) {
        let group: Group = results.data;
        this.groupsStore.upsert(group.id, group);
      }
    } catch(error: any) {
      throw new Error(error.message)
    }
  }

  getRealTimeChanges(uuid: string): RealtimeSubscription {
    const subscription = this.supabaseClient
    .from<Group>(`groups:id=eq.${uuid}`)
    .on('UPDATE', (payload) => {
      this.groupsStore.update(payload.new.id, payload.new)
    })
    .subscribe()
    return subscription;
  }

  async updateGroup(group: Partial<GroupCore>, id: string | undefined) {
    const update = {
      ...group
/*       members: [],
      membership_requests: [] */
      // updated_at: new Date()
    }
    let updateId = group.id;
    if (id) {
      updateId = id
    }

    console.log('updated')
    console.log(group)
    console.log(updateId),
    console.log(update)

    const response: PostgrestResponse<any> = await this.supabaseClient
      .from('groups')
      .update(group, {
      returning: 'minimal', // Don't return the value after inserting
      })
      .match({id: updateId});
    if(response.error) throw new Error(response.error.message);
  }

  async selectGroup(uuid: string): Promise<{data: any, error: any}> {
    let results: {data: any, error: any} = await this.supabaseClient
      .from<Group>('groups')
      .select(
        `id,
        name,
        description,
        avatar_url,
        contact_email,
        contact_phone,
        street,
        post_code,
        city,
        level,
        amendment_counter,
        follower_counter,
        events_counter,
        member_counter`
      )
      .eq('id', uuid)
      .single();
    if(results.data) {
      results.data.members = [];
      results.data.membership_requests = [];
    }
    if(results.error) throw new Error(results.error.message);
    return results;
  }

  async getAllMembers(groupId: string): Promise<void> {
    const response: {data: any, error: any} = await this.selectAllMembers(groupId);
    if(response.data) {
      let allMembers: profile_list_item[] = [];
      response.data.forEach((profile: {
        id: string,
        profiles: {
          avatar_url: string,
          id: string,
          name: string,
        },
        user_id: string
      }) => {
        allMembers.push(
          {
            id: profile.id,
            user_id: profile.user_id,
            avatar_url: profile.profiles.avatar_url,
            name: profile.profiles.name
          }
        )
      });
      this.groupsStore.update(groupId, {members: allMembers});
    }
    if(response.error) throw new Error(response.error.message);
  }

  async getAllFollowers(group_id: string): Promise<void> {
    await this.getAllFollower(group_id)
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
      this.groupsStore.update(group_id, {followers: allFollowers})
    })
    .catch((error: any) => {
      throw new Error(error.message);
    })
  }

  getAllGroupFollowingsOfUser(user_id: string): void {
    this.getAllFollowings(user_id)
    .then((response) => {
      console.log('response')
      console.log(response)

      let allFollowings: profile_list_item[] = [];
      response.data.forEach((groupProfile: {
        id: string,
        profiles: {
          avatar_url: string,
          id: string,
          name: string,
        },
        follower: string
      }) => {
        allFollowings.push(
          {
            id: groupProfile.id,
            user_id: groupProfile.follower,
            avatar_url: groupProfile.profiles.avatar_url,
            name: groupProfile.profiles.name
          }
        )
      })
      this.groupsStore.update(user_id, {followers: allFollowings})

    })
    .catch((error) => console.log(error))
  }

  async processGetAllMemberShipRequests(group_id: string): Promise<void> {
    const response: {data: any, error: any} = await this.getAllMembershipRequests(group_id);
    if(response.data) {
      let allMembers: profile_list_item[] = [];
      response.data.forEach((profile: {
        id: string,
        profiles: {
          avatar_url: string,
          id: string,
          name: string,
        },
        user_requests: string
      }) => {
        allMembers.push(
          {
            id: profile.id,
            user_id: profile.user_requests,
            avatar_url: profile.profiles.avatar_url,
            name: profile.profiles.name
          }
        )
      });
      this.groupsStore.update(group_id, {membership_requests: allMembers});
    }
    if(response.error) throw new Error(response.error.message);
  }

  async selectAllMembers(groupId: string): Promise<{data: any, error: any}> {
    const members: {data: any, error: any} = await this.supabaseClient
      .from('group_members')
      .select(
        `id,
        user_id,
        profiles!group_members_user_id_fkey (
          id,
          name,
          avatar_url
        )`
      )
      .eq('group_id', groupId);
    if(members.error) throw new Error(members.error.message);
    return members;
  }

  getRealTimeChangesMembershipRequests(group_id: string): RealtimeSubscription {
    console.log('test 2 activated')
    const subscription = this.supabaseClient
    .from<any>(`membership_requests`)
    .on('INSERT', (payload) => {
      console.log('Payload')
      console.log(payload)
      if(payload.new.group_requested === group_id) {
        this.selectProfile(payload.new.user_requests).then((member) => {
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
          const entity = this.groupsQuery.getEntity(group_id);
          console.log('oldState');
          console.log(entity?.membership_requests);
          if(entity && entity.membership_requests) {
            const membership_requests: profile_list_item[] = Object.assign([], entity.membership_requests)
            membership_requests.push(memberData);
            console.log('newState');
            console.log(membership_requests)
            this.groupsStore.update(group_id, {membership_requests: membership_requests})
          }
        })
      }
    })
    .on('DELETE', (payload) => {
      console.log('Payload')
      console.log(payload)
      if(payload.old.group_requested === group_id) {
          console.log(payload.old.id)
          const entity = this.groupsQuery.getEntity(group_id);
          console.log('oldState');
          console.log(entity);
          if(entity && entity.membership_requests) {
            const membership_requests: profile_list_item[] = Object.assign([], entity.membership_requests)
            let requestId: number = membership_requests.findIndex((request) => request.id === payload.old.id);
            membership_requests.splice(requestId, 1);
            console.log('newState');
            console.log(requestId)
            console.log(payload.old.id)
            console.log(membership_requests);
            this.groupsStore.update(group_id, {membership_requests: membership_requests})
          }
      }
    })
    .subscribe()
    return subscription;
  }



  getRealTimeChangesMembers(group_id: string): RealtimeSubscription {
    console.log('activated Get Members')
    const subscription = this.supabaseClient
    .from<any>(`group_members`)
    .on('INSERT', (payload) => {
      console.log('Payload')
      console.log(payload)
      if(payload.new.group_id === group_id) {
        this.selectMember(group_id, payload.new.user_id).then((member) => {
          console.log(member)
          console.log(member.data[0].id)
          console.log(member.data[0].user_id)
          console.log(member.data[0].profiles.name)
          console.log(member.data[0].profiles.avatar_url)
          console.log()

          let memberData: profile_list_item = {
            id: member.data[0].id,
            user_id: member.data[0].user_id,
            avatar_url: member.data[0].profiles.avatar_url,
            name: member.data[0].profiles.name
          }
          console.log(memberData)
          const entity = this.groupsQuery.getEntity(group_id);

          console.log('oldState');
          console.log(entity);
          if(entity && entity.members) {
            const groupMembers: profile_list_item[] = Object.assign([], entity.members)
            groupMembers.push(memberData);
            console.log('newState');
            console.log(groupMembers)
            this.groupsStore.update(group_id, {members: groupMembers})
          }
        })
      }
    })
    .on('DELETE', (payload) => {
      console.log('Payload')
      console.log(payload)
      console.log('group.id_')
      console.log(payload.old.group_id)
      console.log(group_id)
      if(payload.old.group_id === group_id) {
        this.selectProfile(payload.old.user_id).then((member) => {
          console.log(member)
          console.log(member.data.id)
          console.log(member.data.name)
          console.log(member.data.avatar_url)
          console.log()

          let memberData: profile_list_item = {
            id: payload.old.id,
            user_id: member.data.id,
            avatar_url: member.data.avatar_url,
            name: member.data.name
          }
          console.log(memberData)
          const entity = this.groupsQuery.getEntity(group_id);

          console.log('oldState');
          console.log(entity?.members);
          if(entity && entity.members) {
            const members: profile_list_item[] = Object.assign([], entity.members)
            let requestId: number = members.findIndex((request) => request.id === payload.old.id);
            members.splice(requestId, 1);
            console.log('newState');
            console.log(requestId)
            console.log(payload.old.id)
            console.log(members);
            this.groupsStore.update(group_id, {members: members})
          }
        })
      }
    })
    .subscribe()
    return subscription;
  }

  getRealTimeChangesFollowers(group_id: string): RealtimeSubscription {
    console.log('activated Get followers')
    const subscription = this.supabaseClient
    .from<any>(`following_group_system`)
    .on('INSERT', (payload) => {
      console.log('Payload')
      console.log(payload)
      if(payload.new.following === group_id) {
        this.selectProfile(payload.new.follower).then((member) => {
          console.log(member)
          console.log(member.data.id)
          console.log(member.data.name)
          console.log(member.data.avatar_url)
          console.log()

          let memberData: profile_list_item = {
            id: payload.old.id,
            user_id: member.data.id,
            avatar_url: member.data.avatar_url,
            name: member.data.name
          }
          console.log(memberData)
          const entity = this.groupsQuery.getEntity(group_id);

          console.log('oldState');
          console.log(entity);
          console.log('oldState followers');
          console.log(entity?.followers);

          if(entity && entity.followers) {
            const groupMembers: profile_list_item[] = Object.assign([], entity.followers)
            groupMembers.push(memberData);
            console.log('newState');
            console.log(groupMembers)
            this.groupsStore.update(group_id, {followers: groupMembers})
          }
        })
      }
    })
    .on('DELETE', (payload) => {
      console.log('Payload')
      console.log(payload)
      console.log('group.id_')
      console.log(payload.old.following)
      console.log(group_id)
      if(payload.old.following === group_id) {
        this.selectProfile(payload.old.follower).then((member) => {
          console.log(member)
          console.log(member.data.id)
          console.log(member.data.name)
          console.log(member.data.avatar_url)
          console.log()

          let memberData: profile_list_item = {
            id: payload.old.id,
            user_id: member.data.id,
            avatar_url: member.data.avatar_url,
            name: member.data.name
          }
          console.log(memberData)
          const entity = this.groupsQuery.getEntity(group_id);

          console.log('oldState');
          console.log(entity?.followers);
          if(entity && entity.followers) {
            const followers: profile_list_item[] = Object.assign([], entity.followers)
            let requestId: number = followers.findIndex((request) => request.id === payload.old.id);
            followers.splice(requestId, 1);
            console.log('newState');
            console.log(requestId)
            console.log(payload.old.id)
            console.log(followers);
            this.groupsStore.update(group_id, {followers: followers})
          }
        })
      }
    })
    .subscribe()
    return subscription;
  }

  async selectMember(groupId: string, uuid: string): Promise<{data: any, error: any}> {
    const members: {data: any, error: any} = await this.supabaseClient
    .from('group_members')
    .select(
      `id,
      user_id,
      profiles!group_members_user_id_fkey (
        id,
        name,
        avatar_url
      )`
    )
    .eq('group_id', groupId)
    .eq('user_id', uuid)
    .limit(1)
  return members;
  }

  async selectProfile(uuid: string): Promise<{data: any, error: any}> {
    const member: {data: any, error: any} = await this.supabaseClient
    .from('profiles')
    .select(
      `id,
      name,
      avatar_url
      `
    )
    .eq('id', uuid)
    .single()
  return member;
  }

  updateIsMember(id: string, valueIsMember: boolean): void {
    const update = {isMember: valueIsMember}
    this.groupsStore.ui.upsert(id, update)
  }

  updateIsAdmin(id: string, valueIsAdmin: boolean): void {
    const update = {isAdmin: valueIsAdmin}
    this.groupsStore.ui.upsert(id, update)
  }

  updateIsFollowing(id: string, valueIsFollowing: boolean): void {
    const update = {isFollowing: valueIsFollowing}
    this.groupsStore.ui.upsert(id, update)
  }

  updateRequestedMembership(id: string, valueRequestedMembership: boolean): void {
    const update = {requestedMembership: valueRequestedMembership}
    this.groupsStore.ui.upsert(id, update)
  }

  async getAllFollower(groupId: string): Promise<{data: any, error: any}> {
    const followers: {data: any, error: any} = await this.supabaseClient
      .from('following_group_system')
      .select(
        `id,
        follower,
        profiles!following_group_system_follower_fkey (
          id,
          name,
          avatar_url
        )`
      )
      .eq('following', groupId);
    if(followers.error) throw new Error(followers.error.message);
    return followers;
  }

  async getAllFollowings(userId: string): Promise<{data: any, error: any}> {
    const followers: {data: any, error: any} = await this.supabaseClient
    .from('following_group_system')
    .select(
      `id,
      following,
      groups!following_group_system_following_fkey (
        id,
        name,
        avatar_url
      )`
    )
    .eq('follower', userId)
  return followers;
  }

  async getAllMembershipRequests(groupId: string): Promise<{data: any, error: any}> {
    const membershipRequests: {data: any, error: any} = await this.supabaseClient
      .from('membership_requests')
      .select(
        `id,
        user_requests,
        profiles!membership_requests_user_requests_fkey (
          id,
          name,
          avatar_url
        )`
      )
      .eq('group_requested', groupId)
      if(membershipRequests.error) throw new Error(membershipRequests.error.message);
    return membershipRequests;
  }
}
