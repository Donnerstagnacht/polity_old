export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      following_group_system: {
        Row: {
          follower: string;
          following: string;
          id: string;
        };
        Insert: {
          follower: string;
          following: string;
          id?: string;
        };
        Update: {
          follower?: string;
          following?: string;
          id?: string;
        };
      };
      following_profile_system: {
        Row: {
          follower: string;
          following: string;
          id: string;
        };
        Insert: {
          follower: string;
          following: string;
          id?: string;
        };
        Update: {
          follower?: string;
          following?: string;
          id?: string;
        };
      };
      group_members: {
        Row: {
          user_id: string;
          group_id: string;
          id: string;
          is_admin: boolean;
          as_admin_added: string;
          is_board_member: boolean;
          as_board_member_added: string;
          is_president: boolean;
          as_president_added: string;
          number_of_unread_messages: number;
        };
        Insert: {
          user_id: string;
          group_id: string;
          id?: string;
          is_admin?: boolean;
          as_admin_added?: string;
          is_board_member?: boolean;
          as_board_member_added?: string;
          is_president?: boolean;
          as_president_added?: string;
          number_of_unread_messages?: number;
        };
        Update: {
          user_id?: string;
          group_id?: string;
          id?: string;
          is_admin?: boolean;
          as_admin_added?: string;
          is_board_member?: boolean;
          as_board_member_added?: string;
          is_president?: boolean;
          as_president_added?: string;
          number_of_unread_messages?: number;
        };
      };
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          name: string | null;
          avatar_url: string | null;
          city: string | null;
          contact_email: string | null;
          contact_phone: string | null;
          post_code: string | null;
          street: string | null;
          about: string | null;
          website: string | null;
          fts: unknown | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          name?: string | null;
          avatar_url?: string | null;
          city?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          post_code?: string | null;
          street?: string | null;
          about?: string | null;
          website?: string | null;
          fts?: unknown | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          name?: string | null;
          avatar_url?: string | null;
          city?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          post_code?: string | null;
          street?: string | null;
          about?: string | null;
          website?: string | null;
          fts?: unknown | null;
        };
      };
      groups: {
        Row: {
          name: string;
          creator: string;
          id: string;
          created_at: string;
          description: string;
          member_counter: number;
          follower_counter: number;
          amendment_counter: number;
          events_counter: number;
          level: string;
          street: string;
          post_code: string;
          city: string;
          contact_email: string;
          contact_phone: string;
          avatar_url: string;
          updated_at: string;
          fts: unknown | null;
        };
        Insert: {
          name: string;
          creator: string;
          id?: string;
          created_at?: string;
          description?: string;
          member_counter?: number;
          follower_counter?: number;
          amendment_counter?: number;
          events_counter?: number;
          level?: string;
          street?: string;
          post_code?: string;
          city?: string;
          contact_email?: string;
          contact_phone?: string;
          avatar_url?: string;
          updated_at?: string;
          fts?: unknown | null;
        };
        Update: {
          name?: string;
          creator?: string;
          id?: string;
          created_at?: string;
          description?: string;
          member_counter?: number;
          follower_counter?: number;
          amendment_counter?: number;
          events_counter?: number;
          level?: string;
          street?: string;
          post_code?: string;
          city?: string;
          contact_email?: string;
          contact_phone?: string;
          avatar_url?: string;
          updated_at?: string;
          fts?: unknown | null;
        };
      };
      membership_requests: {
        Row: {
          user_requests: string;
          group_requested: string;
          id: string;
          created_at: string;
        };
        Insert: {
          user_requests: string;
          group_requested: string;
          id?: string;
          created_at?: string;
        };
        Update: {
          user_requests?: string;
          group_requested?: string;
          id?: string;
          created_at?: string;
        };
      };
      profiles_counters: {
        Row: {
          id: string;
          amendment_counter: number | null;
          follower_counter: number | null;
          following_counter: number | null;
          groups_counter: number | null;
          unread_notifications_counter: number | null;
        };
        Insert: {
          id: string;
          amendment_counter?: number | null;
          follower_counter?: number | null;
          following_counter?: number | null;
          groups_counter?: number | null;
          unread_notifications_counter?: number | null;
        };
        Update: {
          id?: string;
          amendment_counter?: number | null;
          follower_counter?: number | null;
          following_counter?: number | null;
          groups_counter?: number | null;
          unread_notifications_counter?: number | null;
        };
      };
      notifications_of_user: {
        Row: {
          notifier: string;
          notifying: string;
          handler: string;
          id: string;
          title: string;
          message: string;
          for_admins: boolean;
          type: string;
          created_at: string;
          from_group: boolean;
          new: boolean;
        };
        Insert: {
          notifier: string;
          notifying: string;
          handler: string;
          id?: string;
          title?: string;
          message?: string;
          for_admins?: boolean;
          type?: string;
          created_at?: string;
          from_group?: boolean;
          new?: boolean;
        };
        Update: {
          notifier?: string;
          notifying?: string;
          handler?: string;
          id?: string;
          title?: string;
          message?: string;
          for_admins?: boolean;
          type?: string;
          created_at?: string;
          from_group?: boolean;
          new?: boolean;
        };
      };
      rooms: {
        Row: {
          id: string;
          created_at: string;
          last_message: string;
          last_message_time: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          last_message?: string;
          last_message_time?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          last_message?: string;
          last_message_time?: string;
        };
      };
      rooms_messages: {
        Row: {
          room_id: string;
          user_id: string;
          id: string;
          created_at: string;
          content: string;
        };
        Insert: {
          room_id: string;
          user_id: string;
          id?: string;
          created_at?: string;
          content?: string;
        };
        Update: {
          room_id?: string;
          user_id?: string;
          id?: string;
          created_at?: string;
          content?: string;
        };
      };
      notifications_of_groups: {
        Row: {
          notifier: string;
          notifying: string;
          handler: string;
          id: string;
          title: string;
          message: string;
          for_admins: boolean;
          type: string;
          created_at: string;
          from_group: boolean;
          new: boolean;
        };
        Insert: {
          notifier: string;
          notifying: string;
          handler: string;
          id?: string;
          title?: string;
          message?: string;
          for_admins?: boolean;
          type?: string;
          created_at?: string;
          from_group?: boolean;
          new?: boolean;
        };
        Update: {
          notifier?: string;
          notifying?: string;
          handler?: string;
          id?: string;
          title?: string;
          message?: string;
          for_admins?: boolean;
          type?: string;
          created_at?: string;
          from_group?: boolean;
          new?: boolean;
        };
      };
      rooms_participants: {
        Row: {
          room_id: string;
          user_id: string | null;
          group_id: string | null;
          id: string;
          created_at: string;
          accepted: boolean;
          number_of_unread_messages: number;
        };
        Insert: {
          room_id: string;
          user_id?: string | null;
          group_id?: string | null;
          id?: string;
          created_at?: string;
          accepted?: boolean;
          number_of_unread_messages?: number;
        };
        Update: {
          room_id?: string;
          user_id?: string | null;
          group_id?: string | null;
          id?: string;
          created_at?: string;
          accepted?: boolean;
          number_of_unread_messages?: number;
        };
      };
      push_notifications: {
        Row: {
          user_id: string;
          id: string;
          endpoint: string | null;
          expiration_time: string | null;
          p256dh: string | null;
          auth: string | null;
        };
        Insert: {
          user_id: string;
          id?: string;
          endpoint?: string | null;
          expiration_time?: string | null;
          p256dh?: string | null;
          auth?: string | null;
        };
        Update: {
          user_id?: string;
          id?: string;
          endpoint?: string | null;
          expiration_time?: string | null;
          p256dh?: string | null;
          auth?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      select_profile_and_counters: {
        Args: { user_id: string };
        Returns: unknown;
      };
      incrementfollower_counter: {
        Args: { userid: string };
        Returns: undefined;
      };
      decrementfollower_counter: {
        Args: { userid: string };
        Returns: undefined;
      };
      incrementfollowing_counter: {
        Args: { userid: string };
        Returns: undefined;
      };
      decrementfollowing_counter: {
        Args: { userid: string };
        Returns: undefined;
      };
      increment_groups_counter: {
        Args: { userid: string };
        Returns: undefined;
      };
      decrement_groups_counter: {
        Args: { user_id: string };
        Returns: undefined;
      };
      increment_unread_message_counter: {
        Args: { userid: string };
        Returns: undefined;
      };
      increment_unread_message_counter_of_admins: {
        Args: { group_id_in: string };
        Returns: undefined;
      };
      decrement_unread_message_counter: {
        Args: { userid: string };
        Returns: undefined;
      };
      reset_unread_notifications_counter: {
        Args: { user_id: string };
        Returns: undefined;
      };
      create_group: {
        Args: {
          name: string;
          description: string;
          creator: string;
          level: string;
        };
        Returns: string;
      };
      increment_group_member_counter: {
        Args: { group_id: string };
        Returns: undefined;
      };
      decrement_group_member_counter: {
        Args: { group_id: string };
        Returns: undefined;
      };
      incrementgroupfollower_counter: {
        Args: { groupid: string };
        Returns: undefined;
      };
      decrementgroupfollower_counter: {
        Args: { groupid: string };
        Returns: undefined;
      };
      incrementgroupfollowing_counter: {
        Args: { userid: string };
        Returns: undefined;
      };
      decrementgroupfollowing_counter: {
        Args: { userid: string };
        Returns: undefined;
      };
      insertgroupmembershiprequest: {
        Args: { user_id: string; group_requested: string };
        Returns: undefined;
      };
      cancel_group_membership_request: {
        Args: { user_id_requests: string; group_id_requested: string };
        Returns: undefined;
      };
      cancel_group_membership_request_by_request: {
        Args: { request_id: string };
        Returns: undefined;
      };
      add_member: {
        Args: {
          user_id: string;
          group_id: string;
          is_admin: boolean;
          is_board_member: boolean;
          is_president: boolean;
        };
        Returns: undefined;
      };
      delete_member: {
        Args: { user_id_requests: string; group_id_requested: string };
        Returns: undefined;
      };
      delete_member_by_id: {
        Args: { membership_id: string };
        Returns: undefined;
      };
      update_groups_participants_after_message: {
        Args: { group_id_in: string; user_id_in: string };
        Returns: undefined;
      };
      insertfollowingfollowerrelationship: {
        Args: { follower: string; following: string };
        Returns: undefined;
      };
      deletefollowingfollowerrelationship: {
        Args: { followerid: string; followingid: string };
        Returns: undefined;
      };
      delete_following_follower_relationship_by_id: {
        Args: { relationship_id: string };
        Returns: undefined;
      };
      insertgroupfollowerrelationship: {
        Args: { follower: string; following: string };
        Returns: undefined;
      };
      deletegroupfollowerrelationship: {
        Args: { followerid: string; followingid: string };
        Returns: undefined;
      };
      insert_room: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      delete_room: {
        Args: { room_id: string };
        Returns: undefined;
      };
      select_all_rooms_of_user: {
        Args: { user_id_in: string };
        Returns: Record<string, unknown>[];
      };
      select_all_group_rooms_of_user: {
        Args: { user_id_in: string };
        Returns: Record<string, unknown>[];
      };
      update_room_after_message: {
        Args: { room_id_in: string; content_in: string };
        Returns: undefined;
      };
      insert_message: {
        Args: { room_id_in: string; user_id_in: string; content_in: string };
        Returns: undefined;
      };
      select_all_messages_of_room: {
        Args: { room_id_in: string };
        Returns: Record<string, unknown>[];
      };
      delete_all_messages_of_room: {
        Args: { room_id_in: string };
        Returns: undefined;
      };
      insert_participant: {
        Args: {
          room_id: string;
          user_id: unknown;
          group_id: unknown;
          accepted: unknown;
        };
        Returns: undefined;
      };
      delete_participant: {
        Args: { room_id: string; participant_id: string };
        Returns: undefined;
      };
      delete_room_participants: {
        Args: {
          room_id_in: string;
          follower_id_in: string;
          following_id_in: string;
        };
        Returns: undefined;
      };
      update_participants_after_message: {
        Args: { room_id_in: string; user_id_in: string };
        Returns: undefined;
      };
      reset_number_of_unread_messages: {
        Args: { room_id_in: string; user_id_of_reader: string };
        Returns: undefined;
      };
      select_chat_partner: {
        Args: { message_sender: string; room_id_in: string };
        Returns: string;
      };
      select_group_as_chat_partner: {
        Args: { room_id_in: string };
        Returns: string;
      };
      accept_chat_request: {
        Args: { room_id_in: string; user_id_of_reader: string };
        Returns: undefined;
      };
      update_accepted: {
        Args: { room_id_in: string; user_id_in: string };
        Returns: undefined;
      };
      insert_notification_from_profile: {
        Args: {
          notifier_in: string;
          notifying_in: string;
          handler_in: string;
          title_in: string;
          message_in: string;
          type_in: string;
          for_admins_in: boolean;
        };
        Returns: undefined;
      };
      select_notifications_from_groups_user_admin: {
        Args: { user_id_in: string };
        Returns: unknown;
      };
      set_non_existing_groups_set_notifications_to_false: {
        Args: { user_id_in: string };
        Returns: undefined;
      };
      http_set_curlopt: {
        Args: { curlopt: string; value: string };
        Returns: boolean;
      };
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      http_header: {
        Args: { field: string; value: string };
        Returns: unknown;
      };
      http: {
        Args: { request: unknown };
        Returns: unknown;
      };
      http_get: {
        Args: { uri: string };
        Returns: unknown;
      };
      http_post: {
        Args: { uri: string; content: string; content_type: string };
        Returns: unknown;
      };
      http_put: {
        Args: { uri: string; content: string; content_type: string };
        Returns: unknown;
      };
      http_patch: {
        Args: { uri: string; content: string; content_type: string };
        Returns: unknown;
      };
      http_delete: {
        Args: { uri: string };
        Returns: unknown;
      };
      http_head: {
        Args: { uri: string };
        Returns: unknown;
      };
      urlencode: {
        Args: { string: string };
        Returns: string;
      };
      insert_notification_from_groups: {
        Args: {
          notifier_in: string;
          notifying_in: string;
          handler_in: string;
          title_in: string;
          message_in: string;
          type_in: string;
          for_admins_in: boolean;
        };
        Returns: undefined;
      };
      insert_into_push_notifications: {
        Args: {
          endpoint_in: string;
          expiration_time_in: string;
          p256dh_in: string;
          auth_in: string;
          user_id_in: string;
        };
        Returns: undefined;
      };
      request_membership_transaction: {
        Args: {
          user_id_requests: string;
          group_id_requested: string;
          handler_in: string;
          title_in: string;
          message_in: string;
          title__for_admins_in: string;
          message_for_admins_in: string;
          type_in: string;
          for_inquirer_in: boolean;
          for_admins_in: boolean;
        };
        Returns: undefined;
      };
      cancel_membership_request_transaction: {
        Args: {
          user_id_requests_in: string;
          group_id_requested_in: string;
          handler_in: string;
          title_in: string;
          message_in: string;
          title__for_admins_in: string;
          message_for_admins_in: string;
          type_in: string;
          for_inquirer_in: boolean;
          for_admins_in: boolean;
        };
        Returns: undefined;
      };
      cancel_membership_request_transaction_by_id: {
        Args: {
          user_id_requests_in: string;
          group_id_requested_in: string;
          request_id_in: string;
          handler_in: string;
          title_in: string;
          message_in: string;
          title__for_admins_in: string;
          message_for_admins_in: string;
          type_in: string;
          for_inquirer_in: boolean;
          for_admins_in: boolean;
        };
        Returns: undefined;
      };
      confirm_membership_transaction: {
        Args: {
          user_id_requests: string;
          group_id_requested: string;
          requested_id: string;
          handler_in: string;
          title_in: string;
          message_in: string;
          title__for_admins_in: string;
          message_for_admins_in: string;
          type_in: string;
          for_inquirer_in: boolean;
          for_admins_in: boolean;
        };
        Returns: undefined;
      };
      remove_membership_transaction: {
        Args: {
          user_id_requests: string;
          group_id_requested: string;
          handler_in: string;
          title_in: string;
          message_in: string;
          title__for_admins_in: string;
          message_for_admins_in: string;
          type_in: string;
          for_inquirer_in: boolean;
          for_admins_in: boolean;
        };
        Returns: undefined;
      };
      remove_membership_transaction_by_membership_id: {
        Args: {
          membership_id: string;
          user_id_requests: string;
          group_id_requested: string;
          handler_in: string;
          title_in: string;
          message_in: string;
          title__for_admins_in: string;
          message_for_admins_in: string;
          type_in: string;
          for_inquirer_in: boolean;
          for_admins_in: boolean;
        };
        Returns: undefined;
      };
      followgrouptransaction: {
        Args: { followerid: string; followingid: string };
        Returns: undefined;
      };
      unfollowgrouptransaction: {
        Args: { followerid: string; followingid: string };
        Returns: undefined;
      };
      send_message_transaction: {
        Args: {
          room_id_in: string;
          message_sender: string;
          message_receiver: string;
          content_in: string;
          is_group: unknown;
          group_id_in: unknown;
        };
        Returns: undefined;
      };
      create_group_transaction: {
        Args: {
          name: string;
          description: string;
          creator: string;
          level: string;
        };
        Returns: string;
      };
      check_if_room_already_exists_and_follow: {
        Args: { followerid: string; followingid: string };
        Returns: boolean;
      };
      followtransaction: {
        Args: {
          followerid: string;
          followingid: string;
          title_in: string;
          message_in: string;
          type_in: string;
          for_admins_in: boolean;
        };
        Returns: undefined;
      };
      unfollowtransaction: {
        Args: { followerid: string; followingid: string };
        Returns: undefined;
      };
      unfollow_transaction_by_id: {
        Args: {
          followerid: string;
          followingid: string;
          relationship_id: string;
        };
        Returns: undefined;
      };
      check_if_room_already_exists_and_delete: {
        Args: { followerid: string; followingid: string };
        Returns: boolean;
      };
      reject_chat_request_transaction: {
        Args: { room_id_in: string; follower_id: string; following_id: string };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

