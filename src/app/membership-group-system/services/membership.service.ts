import { Injectable } from '@angular/core';
import { createClient, RealtimeSubscription, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { GroupsService } from 'src/app/groups/state/groups.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private supabaseClient: SupabaseClient;

  constructor(
    private authentificationQuery: AuthentificationQuery,
    private groupsService: GroupsService
    ) {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

   async membershipAlreadyRequested(group_requested: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    });
    const results: {data: any, error: any} = await this.supabaseClient
      .from('membership_requests')
      .select(
        `id,
        user_requests,
        group_requested`
      )
      .eq('user_requests', loggedInID)
      .eq('group_requested', group_requested)
    return results;
  }

  async alreadyMember(group_requested: string, user_requests?: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    });
    let user_id = loggedInID;
    if (user_requests) {
      user_id = user_requests;
    }
    const results: {data: any, error: any} = await this.supabaseClient
      .from('group_members')
      .select(
        `id,
        user_id,
        group_id`
      )
      .eq('user_id', user_id)
      .eq('group_id', group_requested)
    return results;
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
  return membershipRequests;
  }

  async confirmMembershipRequest(user_requests: string, group_requested: string, requested_id_in: string): Promise<{data: any, error: any}> {
    console.log('user_id')
    console.log(user_requests)
    console.log('group_id')
    console.log(group_requested)
    console.log('request_id')
    console.log(requested_id_in)
    const confirmMembershipResult: { data: any, error: any } = await this.supabaseClient
      .rpc('confirm_membership_transaction', {user_id_requests: user_requests, group_id_requested: group_requested, requested_id: requested_id_in})
    return confirmMembershipResult;
  }


  async requestMembership(group_requested: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    });
    const requestMembershipResult: { data: any, error: any } = await this.supabaseClient
      .rpc('insert_group_membership_request', {user_requests: loggedInID, group_requested: group_requested})
    return requestMembershipResult;
  }

  async cancelMembershipRequest(group_requested: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    });
    console.log('user_id')
    console.log(loggedInID)
    console.log('group_id')
    console.log(group_requested)
    const cancelMembershipResult: { data: any, error: any } = await this.supabaseClient
      .rpc('cancel_group_membership_request', {user_id_requests: loggedInID, group_id_requested: group_requested})
    return cancelMembershipResult;
  }

  async removeMembershipRequestById(request_id: string): Promise<{data: any, error: any}> {
    const cancelMembershipResult: { data: any, error: any } = await this.supabaseClient
      .rpc('cancel_group_membership_request_by_request', {request_id: request_id})
    return cancelMembershipResult;
  }

/*   async getAllMembers(groupId: string): Promise<{data: any, error: any}> {
    const membershipRequests: {data: any, error: any} = await this.supabaseClient
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
  return membershipRequests;
  } */

  async removeMember(user_requested: string, group_requested: string): Promise<{data: any, error: any}> {
    const cancelMembershipResult: { data: any, error: any } = await this.supabaseClient
      .rpc('remove_membership_transaction', {user_id_requests: user_requested, group_id_requested: group_requested})
    return cancelMembershipResult;
  }

  async removeMemberByMembershipId(membership_id: string, user_requested: string, group_requested: string): Promise<{data: any, error: any}> {
    console.log('membership_id')
    console.log(membership_id)
    console.log('user_id')
    console.log(user_requested)
    console.log('group_requested')
    console.log(group_requested)

    const cancelMembershipResult: { data: any, error: any } = await this.supabaseClient
      .rpc('remove_membership_transaction_by_membership_id', {membership_id: membership_id, user_id_requests: user_requested, group_id_requested: group_requested})
    return cancelMembershipResult;
  }


  getRealTimeChangesIfStillMembershipRequested(group_id: string): RealtimeSubscription {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    })
    console.log('Is still membership request called?')
    console.log(loggedInID)
    const subscription = this.supabaseClient
    .from<any>(`membership_requests`)
    .on('INSERT', (payload) => {
      console.log('Payload')
      console.log(payload)
      if(payload.new.group_requested === group_id && payload.new.user_requests === loggedInID) {
        this.groupsService.updateRequestedMembership(group_id, true);
      }
    })
    .on('DELETE', (payload) => {
      console.log('Payload')
      console.log(payload)
      console.log('group.id_')
      console.log(payload.old.following)
      console.log(group_id)
      if(payload.old.group_requested === group_id && payload.old.user_requests === loggedInID) {
        this.groupsService.updateRequestedMembership(group_id, false);
      }
    })
    .subscribe()
    return subscription;
  }

  getRealTimeChangesIfStillMember(group_id: string): RealtimeSubscription {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    })
    console.log('Is still membership request called?')
    console.log(loggedInID)
    const subscription = this.supabaseClient
    .from<any>(`group_members`)
    .on('INSERT', (payload) => {
      console.log('Payload')
      console.log(payload)
      if(payload.new.group_id === group_id && payload.new.user_id === loggedInID) {
        this.groupsService.updateIsMember(group_id, true);
      }
    })
    .on('DELETE', (payload) => {
      console.log('Payload')
      console.log(payload)
      console.log('group.id_')
      console.log(payload.old.following)
      console.log(group_id)
      if(payload.old.group_id === group_id && payload.old.user_id === loggedInID) {
        this.groupsService.updateIsMember(group_id, false);
      }
    })
    .subscribe()
    return subscription;
  }

  getRealTimeChangesIfStillAdmin(group_id: string): RealtimeSubscription {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    })
    console.log('Is still ADMIN request called?')
    console.log(loggedInID)
    const subscription = this.supabaseClient
    .from<any>(`group_members:user_id=eq.${loggedInID}`)
    .on('UPDATE', (payload) => {
      console.log('Payload')
      console.log(payload)
      console.log(payload.new.group_id)
      console.log(group_id)
      console.log('isAdmin')
      console.log(payload.new.is_admin)


      if(payload.new.group_id === group_id) {
        if(payload.new.is_admin) {
          console.log(true)
          this.groupsService.updateIsAdmin(group_id, true);
        } else {
          console.log(false)
          this.groupsService.updateIsAdmin(group_id, false)
        }
      }
    })
    .subscribe()
    return subscription;
  }
}
