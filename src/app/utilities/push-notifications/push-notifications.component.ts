import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Subscription } from 'rxjs';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { environment } from 'src/environments/environment';

export type PushSubscriber = {
  endpoint: string, 
  expirationTime: string, 
  keys?: {
    p256dh?: string, 
    auth?: string
  }
}

@Component({
  selector: 'app-push-notifications',
  templateUrl: './push-notifications.component.html',
  styleUrls: ['./push-notifications.component.scss']
})
export class PushNotificationsComponent implements OnInit {

  private supabaseClient: SupabaseClient;
  readonly VAPID_PUBLIC_KEY = "BJQhdOCOkmXaJaYhaJxM69Ju6aOFdTgW0p64hpefnNZ74MFsvEu90ToMPzr5z1P9NIsAp5TS8znGgZ2DSBIOrmE";
  // readonly VAPID_PRIVATE_KEY = "8lS1u1czGvsWuEpLTzOcM0KGdvNDqyGcOBgR0Z1v9FA";
  pushSubscriber: PushSubscriber | undefined;
  authSubscription: Subscription | undefined;
  loggedInUserId: string | undefined; 
  
  constructor(
    private swPush: SwPush,
    private authentificationQuery: AuthentificationQuery
    ) {
      this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
     }

  ngOnInit(): void {
    this.authSubscription = this.authentificationQuery.uuid$.subscribe((uuid: any) => {
      this.loggedInUserId = uuid;
    });
  }

  async subscribeToNotifications() {
    console.log('clicked')
    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then((sub) => {
      console.log('swPUsh', sub)
      if(sub) {
        this.addPushSubscriber(sub)
        .then((data: any) => {
          console.log('finished database insert', data);
        })
        .catch((error: any) => {
          console.log('failed database insert', error);
        });
      }
    })
    .catch(err => console.error("Could not subscribe to notifications", err));
  }

  async addPushSubscriber(pushSubscriber: PushSubscriber | any): Promise<{ data: any, error: any }> {
    console.log('endpoint', pushSubscriber.endpoint)
    console.log('adding this to database', pushSubscriber)

    // TODO p256dh and auth are missing
    const insertPushSubscriberResult: { data: any, error: any } = await this.supabaseClient
      .rpc('insert_into_push_notifications', {
        endpoint_in: pushSubscriber.endpoint, 
        expiration_time_in: pushSubscriber.expirationTime, 
        p256dh_in: 'Test3', // pushSubscriber.p256dh
        auth_in: 'Test4' , // pushSubscriber.auth
        user_id_in: this.loggedInUserId
      })
    if(insertPushSubscriberResult.error) throw new Error(insertPushSubscriberResult.error.message);
    return insertPushSubscriberResult;
  }

/*   async callEdgeFunction(): Promise<{data: any, error: any}> {
    const response: { data: any, error: any } = await this.supabaseClient.functions.invoke('notify-user', {
      body: JSON.stringify({ userID: this.loggedInUserId })
    })
    if(response.error) throw new Error(response.error.message);
    return response;
  } */

}
