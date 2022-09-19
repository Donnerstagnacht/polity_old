import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
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
  readonly VAPID_PUBLIC_KEY = "BK0h5R4vNPo6sxzj9ScboVJcnMQPyYZJvDUrvaFLlsC9K6DPlbHq6diDjzw8Y0Tvd5mti68fdyPa2KbDqlRFG58";
  pushSubscriber: PushSubscriber;
  constructor(
    private swPush: SwPush
    ) {
      this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
      this.pushSubscriber = {
        endpoint: 'test1', 
        expirationTime: 'test2', 
        keys: {
          p256dh: 'test3', 
          auth: 'test4'
        }
      }
     }

  ngOnInit(): void {
  }

  subscribeToNotifications() {
    console.log('clicked')
    this.addPushSubscriber(this.pushSubscriber);

    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then((sub) => {
      console.log(sub)
      this.addPushSubscriber(sub);
    }) //this.newsletterService.addPushSubscriber(sub).subscribe())
    .catch(err => console.error("Could not subscribe to notifications", err));
  }

  async addPushSubscriber(pushSubscriber: PushSubscriber | any): Promise<{ data: any, error: any }> {
    console.log('endpoint', pushSubscriber.endpoint)
    const insertPushSubscriberResult: { data: any, error: any } = await this.supabaseClient
      .rpc('insert_into_push_notifications', {
        endpoint_in: pushSubscriber.endpoint, 
        expiration_time_in:pushSubscriber.expirationTime, 
        p256dh_in: 'Test3', 
        auth_in: 'Test4' 
      })
    if(insertPushSubscriberResult.error) throw new Error(insertPushSubscriberResult.error.message);
    return insertPushSubscriberResult;
  }

}
