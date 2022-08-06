declare type UserPlan = 'FREE' | 'PREMIUM';
declare type SubscriptionEvent = 'presence.update';

declare interface User {
   id?: number;
   fullname: string;
   email: string;
   pswd: string;
   verified?: boolean;
   plan?: UserPlan;
   created_at?: string;
}

declare interface Subscription {
   id?: number;
   enabled?: boolean;
   alias?: string;
   event: SubscriptionEvent;
   notify?: boolean;
   phone: string;
   user_id: number;
   expire_at?: string;
   created_at?: string;
}

declare interface PresenceHistory {
   id?: number;
   status: boolean;
   ts?: string;
   lastseen?: number;
   sub_id: number;
}

declare interface PushSubscriptionRecord {
   id?: number;
   enabled?: boolean;
   user_agent?: string;
   payload: PushSubscription;
   user_id: number;
   created_at?: string;
}
