import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private supabaseClient: SupabaseClient;

  constructor(private authentificationService: AuthentificationService) {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

   async membershipAlreadyRequested(group_requested: string): Promise<{data: any, error: any}> {
    const loggedInID = this.authentificationService.user?.id;
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
    const loggedInID = this.authentificationService.user?.id;
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

  async confirmMembershipRequest(user_requests: string, group_requested: string): Promise<{data: any, error: any}> {
    const loggedInID = this.authentificationService.user?.id;
    const confirmMembershipResult: { data: any, error: any } = await this.supabaseClient
      .rpc('confirm_membership_transaction', {user_id_requests: user_requests, group_id_requested: group_requested})
    return confirmMembershipResult;
  }


  async requestMembership(group_requested: string): Promise<{data: any, error: any}> {
    const loggedInID = this.authentificationService.user?.id;
    const requestMembershipResult: { data: any, error: any } = await this.supabaseClient
      .rpc('insert_group_membership_request', {user_requests: loggedInID, group_requested: group_requested})
    return requestMembershipResult;
  }

  async cancelMembershipRequest(group_requested: string): Promise<{data: any, error: any}> {
    const loggedInID = this.authentificationService.user?.id;
    const cancelMembershipResult: { data: any, error: any } = await this.supabaseClient
      .rpc('cancel_group_membership_request', {user_id_requests: loggedInID, group_id_requested: group_requested})
    return cancelMembershipResult;
  }

  async removeMembershipRequest(user_requested: string, group_requested: string): Promise<{data: any, error: any}> {
    const cancelMembershipResult: { data: any, error: any } = await this.supabaseClient
      .rpc('cancel_group_membership_request', {user_id_requests: user_requested, group_id_requested: group_requested})
    return cancelMembershipResult;
  }

  async getAllMembers(groupId: string): Promise<{data: any, error: any}> {
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
  }

  async removeMember(user_requested: string, group_requested: string): Promise<{data: any, error: any}> {
    const cancelMembershipResult: { data: any, error: any } = await this.supabaseClient
      .rpc('remove_membership_transaction', {user_id_requests: user_requested, group_id_requested: group_requested})
    return cancelMembershipResult;
  }
}
