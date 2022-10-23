import { Injectable } from '@angular/core';
import { createClient, RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { GroupsService } from 'src/app/groups/state/groups.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { NEWSCONTENTS, NewsContents, NEWSTITLES, NewsTitles, NEWSTYPE, NewsType } from 'src/app/news/state/news.model';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private supabaseClient: SupabaseClient;
  loggedInID: string | null = '';
  authSubscription: Subscription | undefined;
  NEWSCONTENTS: NewsContents = NEWSCONTENTS;
  NEWSTITILES: NewsTitles = NEWSTITLES;
  NEWSTYPE: NewsType = NEWSTYPE;

  constructor(
    private authentificationQuery: AuthentificationQuery,
    private groupsService: GroupsService
  ) {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.authSubscription = this.authentificationQuery.uuid$.subscribe(uuid => {
      this.loggedInID = uuid;
    })
  }

  ngOnDestroy(): void {
    if(this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  async membershipAlreadyRequested(group_requested: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    if(this.loggedInID) {
      loggedInID = this.loggedInID;
    }
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
    if(this.loggedInID) {
      loggedInID = this.loggedInID;
    }
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
    const confirmMembershipResult: { data: any, error: any } = await this.supabaseClient
      .rpc('confirm_membership_transaction',
      {
        user_id_requests: user_requests,
        group_id_requested: group_requested,
        requested_id: requested_id_in,
        handler_in: this.loggedInID,
        title_in: NEWSTITLES.acceptGroupRequestForInquirer,
        message_in: NEWSCONTENTS.acceptGroupRequestForInquirer,
        title__for_admins_in: NEWSTITLES.acceptGroupRequestForAdmins,
        message_for_admins_in: NEWSCONTENTS.acceptGroupRequestForAdmins,
        type_in: NEWSTYPE.group,
        for_inquirer_in: false,
        for_admins_in: true
      });
    if(confirmMembershipResult.error) throw new Error(confirmMembershipResult.error.message);
    return confirmMembershipResult;
  }

  async requestMembership(group_requested: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    if(this.loggedInID) {
      loggedInID = this.loggedInID;
    }
    const requestMembershipResult: { data: any, error: any } = await this.supabaseClient
      .rpc('request_membership_transaction', 
      {
        user_id_requests: loggedInID, 
        group_id_requested: group_requested,
        handler_in: this.loggedInID,
        title_in: NEWSTITLES.requestGroupForInquirer,
        message_in: NEWSCONTENTS.requestGroupForInquirer,
        title__for_admins_in: NEWSTITLES.requestGroupForAdmins,
        message_for_admins_in: NEWSCONTENTS.requestGroupForAdmins,
        type_in: NEWSTYPE.group,
        for_inquirer_in: false,
        for_admins_in: true
      });
    if(requestMembershipResult.error) throw new Error(requestMembershipResult.error.message);
    return requestMembershipResult;
  }

  async cancelMembershipRequest(group_requested: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    if(this.loggedInID) {
      loggedInID = this.loggedInID;
    }
    console.log(this.loggedInID);
    console.log(group_requested);
    const cancelMembershipResult: { data: any, error: any } = await this.supabaseClient
      .rpc('cancel_membership_request_transaction', {
        user_id_requests_in: loggedInID, 
        group_id_requested_in: group_requested,
        handler_in: this.loggedInID,
        title_in: NEWSTITLES.cancelGroupRequestForInquirer,
        message_in: NEWSCONTENTS.cancelGroupRequestForInquirer,
        title__for_admins_in: NEWSTITLES.cancelGroupRequestForAdmins,
        message_for_admins_in: NEWSCONTENTS.cancelGroupRequestForAdmins,
        type_in: NEWSTYPE.account,
        for_inquirer_in: false,
        for_admins_in: true
      });
    if(cancelMembershipResult.error) throw new Error(cancelMembershipResult.error.message);
    return cancelMembershipResult;
  }

  async removeMembershipRequestById(userId: string, groupId: string, request_id: string): Promise<{data: any, error: any}> {
    console.log(this.loggedInID);
    console.log(groupId);
    console.log(request_id);

    const cancelMembershipResult: { data: any, error: any } = await this.supabaseClient
      .rpc('cancel_membership_request_transaction_by_id',
      {
        user_id_requests_in: userId, 
        group_id_requested_in: groupId, 
        request_id_in: request_id,
        handler_in: this.loggedInID,
        title_in: NEWSTITLES.cancelGroupRequestForInquirer,
        message_in: NEWSCONTENTS.cancelGroupRequestForInquirer,
        title__for_admins_in: NEWSTITLES.cancelGroupRequestForAdmins,
        message_for_admins_in: NEWSCONTENTS.cancelGroupRequestForAdmins,
        type_in: NEWSTYPE.account,
        for_inquirer_in: false,
        for_admins_in: true
      });
    if(cancelMembershipResult.error) throw new Error(cancelMembershipResult.error.message);
    return cancelMembershipResult;
  }

  async removeMember(user_requested: string, group_requested: string): Promise<{data: any, error: any}> {
    const cancelMembershipResult: { data: any, error: any } = await this.supabaseClient
      .rpc('remove_membership_transaction', 
      {user_id_requests: user_requested, 
        group_id_requested: group_requested,
        handler_in: this.loggedInID,
        title_in: NEWSTITLES.leaveGroupForInquirer,
        message_in: NEWSCONTENTS.leaveGroupForInquirer,
        title__for_admins_in: NEWSTITLES.leaveGroupForAdmins,
        message_for_admins_in: NEWSCONTENTS.leaveGroupForAdmins,
        type_in: NEWSTYPE.account,
        for_inquirer_in: false,
        for_admins_in: true
      });
    if(cancelMembershipResult.error) throw new Error(cancelMembershipResult.error.message);
    return cancelMembershipResult;
  }

  async removeMemberByMembershipId(membership_id: string, user_requested: string, group_requested: string): Promise<{data: any, error: any}> {
    const cancelMembershipResult: { data: any, error: any } = await this.supabaseClient
      .rpc('remove_membership_transaction_by_membership_id', 
      {
        membership_id: membership_id, 
        user_id_requests: user_requested, 
        group_id_requested: group_requested,
        handler_in: this.loggedInID,
        title_in: NEWSTITLES.removeMemberForDeletedUser,
        message_in: NEWSCONTENTS.removeMemberForDeletedUser,
        title__for_admins_in: NEWSTITLES.removeMemberForAdmins,
        message_for_admins_in: NEWSCONTENTS.removeMemberForAdmins,
        type_in: NEWSTYPE.account,
        for_inquirer_in: false,
        for_admins_in: true
      });
    if(cancelMembershipResult.error) throw new Error(cancelMembershipResult.error.message);
    return cancelMembershipResult;
  }


  getRealTimeChangesIfStillMembershipRequested(group_id: string): RealtimeChannel {
    let loggedInID: string | null = '';
    if(this.loggedInID) {
      loggedInID = this.loggedInID;
    }
    const subscription = this.supabaseClient
    .channel('public:membership_requests')
    // .from<any>(`membership_requests`)
    .on('postgres_changes', 
      {
        event: 'INSERT',
        schema: 'public',
        table: 'membership_requests'
      },
      payload => {
        if(payload.new['group_requested'] === group_id && payload.new['user_requests'] === loggedInID) {
          this.groupsService.updateRequestedMembership(group_id, true);
        }
      }
    )
    .on('postgres_changes', 
    {
      event: 'DELETE',
      schema: 'public',
      table: 'membership_requests'
    },
    payload => {
      if(payload.old['group_requested'] === group_id && payload.old['user_requests'] === loggedInID) {
        this.groupsService.updateRequestedMembership(group_id, false);
      }
    })
/*     .on('INSERT', (payload) => {
      if(payload.new.group_requested === group_id && payload.new.user_requests === loggedInID) {
        this.groupsService.updateRequestedMembership(group_id, true);
      }
    })
    .on('DELETE', (payload) => {
      if(payload.old.group_requested === group_id && payload.old.user_requests === loggedInID) {
        this.groupsService.updateRequestedMembership(group_id, false);
      }
    })
    .subscribe() */
    return subscription;
  }

  getRealTimeChangesIfStillMember(group_id: string): RealtimeChannel {
    let loggedInID: string | null = '';
    if(this.loggedInID) {
      loggedInID = this.loggedInID;
    }
    const subscription = this.supabaseClient
      .channel('public:group_members')
      .on('postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'group_members'
        },
        payload => {
          if(payload.new['group_id'] === group_id && payload.new['user_id'] === loggedInID) {
            this.groupsService.updateIsMember(group_id, true);
          }
        }
      )
      .on('postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'group_members'
      },
      payload => {
        if(payload.old['group_id'] === group_id && payload.old['user_id'] === loggedInID) {
          this.groupsService.updateIsMember(group_id, false);
        }
      }
    )

    // .from<any>(`group_members`)
/*     .on('INSERT', (payload) => {
      if(payload.new.group_id === group_id && payload.new.user_id === loggedInID) {
        this.groupsService.updateIsMember(group_id, true);
      }
    }) */
/*     .on('DELETE', (payload) => {
      if(payload.old.group_id === group_id && payload.old.user_id === loggedInID) {
        this.groupsService.updateIsMember(group_id, false);
      }
    }) */
    .subscribe()
    return subscription;
  }

  getRealTimeChangesIfStillAdmin(group_id: string): RealtimeChannel {
    let loggedInID: string | null = '';
    if(this.loggedInID) {
      loggedInID = this.loggedInID;
    }
    const subscription = this.supabaseClient
    .channel(`public:group_members:user_id=eq.${loggedInID}`)
    .on('postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'group_members'
      },
      payload => {
        if(payload.new['group_id'] === group_id) {
          if(payload.new['is_admin']) {
            this.groupsService.updateIsAdmin(group_id, true);
          } else {
            this.groupsService.updateIsAdmin(group_id, false)
          }
        }
      }
    )
/*     .from<any>(`group_members:user_id=eq.${loggedInID}`)
    .on('UPDATE', (payload) => {
      if(payload.new.group_id === group_id) {
        if(payload.new.is_admin) {
          this.groupsService.updateIsAdmin(group_id, true);
        } else {
          this.groupsService.updateIsAdmin(group_id, false)
        }
      }
    }) */
    .subscribe()
    return subscription;
  }
}
