import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { GroupsStore, GroupsState } from './groups.store';
import { Group } from './group.model';
import { createClient, RealtimeSubscription, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { profile_list_item } from './profile_list_item.model';
import { GroupsQuery } from './groups.query';
import { MembershipService } from 'src/app/membership-group-system/services/membership.service';
import { FollowingGroupsService } from 'src/app/following-groups-system/services/following-groups.service';
@Injectable({ providedIn: 'root' })
export class GroupsService extends NgEntityService<GroupsState> {
  private supabaseClient: SupabaseClient;

  constructor(
    private groupsQuery: GroupsQuery,
    private followingGroupsService: FollowingGroupsService,
    private membershipService: MembershipService,
    protected override groupsStore: GroupsStore) {
    super(groupsStore);
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  findGroup(uuid: string): void {
    this.selectGroup(uuid)
    .then((results) => {
      let group: Group = results.data;
      console.log('Data received from backend')
      console.log(group)
      this.groupsStore.add(group);
    })
    .catch((error) => {
      console.log(error);
    })
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

  updateGroup(group: Partial<Group>, id: string | undefined) {
    const update = {
      ...group,
      members: [],
      membership_requests: []
      // updated_at: new Date()
    }
    let updateId = group.id;
    if (id) {
      updateId = id
    }

    console.log('updated')

    return this.supabaseClient
      .from('groups')
      .update(update, {
      returning: 'minimal', // Don't return the value after inserting
      })
      .match({id: updateId})
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
    results.data.members = [];
    results.data.membership_requests = [];
    return results;
  }

  getAllMembers(groupId: string) {
    this.selectAllMembers(groupId).then((response) => {
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
      })
      this.groupsStore.update(groupId, {members: allMembers})
    })
  }

  getAllFollowers(group_id: string): void {
    this.followingGroupsService.getAllFollower(group_id)
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
        user_requests: string
      }) => {
        allFollowers.push(
          {
            id: profile.id,
            user_id: profile.user_requests,
            avatar_url: profile.profiles.avatar_url,
            name: profile.profiles.name
          }
        )
      })
      this.groupsStore.update(group_id, {followers: allFollowers})

    })
    .catch((error) => console.log(error))
  }

  getAllMemberShipRequests(group_id: string): void {
    this.membershipService.getAllMembershipRequests(group_id)
    .then((response) => {
      console.log('response')
      console.log(response)

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
      })
      this.groupsStore.update(group_id, {membership_requests: allMembers})
    })

/*     .then((membershipRequests) => {
      this.membershipRequests = [];
      membershipRequests.data.forEach((profile: any) => {
        let id: any = profile.profiles.id;
        let name: any = profile.profiles.name;
        let avatar_url: any = profile.profiles.avatar_url;
        this.membershipRequests.push({
          'id': id,
          'name': name,
          'avatar_url': avatar_url
        });
      });
    }) */
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
    .eq('group_id', groupId)
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
            membership_requests.splice(requestId);
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
            members.splice(requestId);
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
            followers.splice(requestId);
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

}
