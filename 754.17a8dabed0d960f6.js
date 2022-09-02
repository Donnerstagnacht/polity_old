"use strict";(self.webpackChunkpolity=self.webpackChunkpolity||[]).push([[754],{9466:(S,h,u)=>{u.d(h,{J:()=>E});var f=u(5861),p=u(5813),_=u(2340),d=u(8274),v=u(6923);let E=(()=>{class w{constructor(a){this.authentificationQuery=a,this.supabaseClient=(0,p.eI)(_.N.supabaseUrl,_.N.supabaseKey)}isAlreadyFollower(a){var c=this;return(0,f.Z)(function*(){let i="";return c.authentificationQuery.uuid$.subscribe(e=>{i=e}),yield c.supabaseClient.from("following_profile_system").select("id,\n        follower,\n        following").eq("follower",i).eq("following",a)})()}getAllFollower(a){var c=this;return(0,f.Z)(function*(){let g,i="";return c.authentificationQuery.uuid$.subscribe(t=>{i=t}),g=a||i,yield c.supabaseClient.from("following_profile_system").select("id,\n      follower,\n      profiles!following_profile_system_follower_fkey (\n        id,\n        name,\n        avatar_url\n      )").eq("following",g)})()}getAllFollowing(a){var c=this;return(0,f.Z)(function*(){let g,i="";return c.authentificationQuery.uuid$.subscribe(t=>{i=t}),g=a||i,yield c.supabaseClient.from("following_profile_system").select("id,\n      following,\n      profiles!following_profile_system_following_fkey (\n        id,\n        name,\n        avatar_url\n      )").eq("follower",g)})()}followTransaction(a){var c=this;return(0,f.Z)(function*(){let i="";return c.authentificationQuery.uuid$.subscribe(e=>{i=e}),yield c.supabaseClient.rpc("followtransaction",{followingid:a,followerid:i})})()}unfollowTransaction(a){var c=this;return(0,f.Z)(function*(){let i="";return c.authentificationQuery.uuid$.subscribe(e=>{i=e}),yield c.supabaseClient.rpc("unfollowtransaction",{followingid:a,followerid:i})})()}removeFollowerTransaction(a){var c=this;return(0,f.Z)(function*(){let i="";return c.authentificationQuery.uuid$.subscribe(e=>{i=e}),yield c.supabaseClient.rpc("unfollowtransaction",{followingid:i,followerid:a})})()}removeFollowerTransactionById(a){var c=this;return(0,f.Z)(function*(){console.log(a);let i="";return c.authentificationQuery.uuid$.subscribe(e=>{i=e}),yield c.supabaseClient.rpc("unfollow_transaction_by_id",{followingid:i,followerid:a.user_id,relationship_id:a.id})})()}}return w.\u0275fac=function(a){return new(a||w)(d.LFG(v.c))},w.\u0275prov=d.Yz7({token:w,factory:w.\u0275fac,providedIn:"root"}),w})()},5754:(S,h,u)=>{u.d(h,{H:()=>c});var f=u(5861),p=u(5813),_=u(2340),d=u(8274),v=u(4576),E=u(9466),w=u(2545),b=u(8451),a=u(6923);let c=(()=>{class i{constructor(e,t,l,o,s){this.profileStore=e,this.profileFollowingService=t,this.groupsService=l,this.profileQuery=o,this.authentificationQuery=s,this.supabaseClient=(0,p.eI)(_.N.supabaseUrl,_.N.supabaseKey)}add(e){this.selectProfil(e).then(t=>{this.profileStore.add(t.data)}).catch(t=>{console.log(t)})}getRealTimeChanges(e){return console.log("called"),this.supabaseClient.from(`profiles:id=eq.${e}`).on("UPDATE",l=>{console.log("update"),console.log(l),this.profileStore.update(l.new.id,l.new)}).on("INSERT",l=>{console.log("insert"),console.log(l),this.profileStore.update(l.new.id,l.new)}).subscribe()}update(e,t){var l=this;return(0,f.Z)(function*(){const o={...t,id:e,fts:void 0,updated_at:new Date};console.log("update"),console.log(o);const s=yield l.supabaseClient.from("profiles").upsert(o,{returning:"minimal"});if(s.error)throw new Error(s.error.message);return s})()}remove(e){this.profileStore.remove(e)}selectProfil(e){var t=this;return(0,f.Z)(function*(){return yield t.supabaseClient.from("profiles").select("id,\n        name,\n        website,\n        avatar_url,\n        contact_email,\n        contact_phone,\n        street,\n        post_code,\n        city,\n        about,\n        amendment_counter,\n        follower_counter,\n        following_counter,\n        groups_counter").eq("id",e).single()})()}getAllFollowers(e){this.profileFollowingService.getAllFollower(e).then(t=>{console.log("response"),console.log(t);let l=[];t.data.forEach(o=>{l.push({id:o.id,user_id:o.follower,avatar_url:o.profiles.avatar_url,name:o.profiles.name})}),this.profileStore.update(e,{followers:l})}).catch(t=>console.log(t))}getAllFollowings(e){this.groupsService.getAllFollowings(e).then(t=>{console.log("group followings"),console.log("response"),console.log(t),this.profileFollowingService.getAllFollowing(e).then(l=>{console.log("profile followings"),console.log("response"),console.log(l);let o=[];l.data.forEach(s=>{o.push({id:s.id,user_id:s.following,avatar_url:s.profiles.avatar_url,name:s.profiles.name,isGroup:!1})}),t.data.forEach(s=>{o.push({id:s.id,user_id:s.following,avatar_url:s.groups.avatar_url,name:s.groups.name,isGroup:!0})}),this.profileStore.update(e,{followings:o})}).catch(l=>console.log(l))})}getRealTimeChangesFollowerSystem(e){return console.log("test 2 activated"),this.supabaseClient.from("following_profile_system").on("INSERT",l=>{console.log("Payload"),console.log(l),l.new.following===e&&this.groupsService.selectProfile(l.new.follower).then(o=>{console.log(o),console.log(o.data.id),console.log(o.data.name),console.log(o.data.avatar_url),console.log();let s={id:l.new.id,user_id:o.data.id,avatar_url:o.data.avatar_url,name:o.data.name};console.log(s);const n=this.profileQuery.getEntity(e);if(console.log("oldState"),console.log(n?.followers),n&&n.followers){const r=Object.assign([],n.followers);r.push(s),console.log("newState"),console.log(r),this.profileStore.update(e,{followers:r})}}),l.new.follower===e&&this.groupsService.selectProfile(l.new.following).then(o=>{console.log(o),console.log(o.data.id),console.log(o.data.name),console.log(o.data.avatar_url),console.log();let s={id:l.new.id,user_id:o.data.id,avatar_url:o.data.avatar_url,name:o.data.name};console.log(s);const n=this.profileQuery.getEntity(e);if(console.log("oldState"),console.log(n?.followings),n&&n.followings){const r=Object.assign([],n.followings);r.push(s),console.log("newState"),console.log(r),this.profileStore.update(e,{followings:r})}})}).on("DELETE",l=>{if(console.log("Payload"),console.log(l),l.old.following===e){console.log(l.old.id);const o=this.profileQuery.getEntity(e);if(console.log("oldState"),console.log(o),o&&o.followers){const s=Object.assign([],o.followers);let n=s.findIndex(r=>r.id===l.old.id);s.splice(n),console.log("newState"),console.log(n),console.log(l.old.id),console.log(s),this.profileStore.update(e,{followers:s})}}if(l.old.follower===e){console.log(l.old.id);const o=this.profileQuery.getEntity(e);if(console.log("oldState"),console.log(o),o&&o.followings){const s=Object.assign([],o.followers);let n=s.findIndex(r=>r.id===l.old.id);s.splice(n),console.log("newState"),console.log(n),console.log(l.old.id),console.log(s),this.profileStore.update(e,{followings:s})}}}).subscribe()}getRealTimeChangesGroupFollowerSystem(e){return console.log("test 2 activated"),this.supabaseClient.from("following_group_system").on("INSERT",l=>{console.log("Payload"),console.log(l),l.new.follower===e&&this.groupsService.selectGroup(l.new.following).then(o=>{console.log(o),console.log(o.data.id),console.log(o.data.name),console.log(o.data.avatar_url),console.log();let s={id:l.new.id,user_id:o.data.id,avatar_url:o.data.avatar_url,name:o.data.name};console.log(s);const n=this.profileQuery.getEntity(e);if(console.log("oldState"),console.log(n?.followings),n&&n.followings){const r=Object.assign([],n.followings);r.push(s),console.log("newState"),console.log(r),this.profileStore.update(e,{followings:r})}})}).on("DELETE",l=>{if(console.log("Payload"),console.log(l),l.old.follower===e){console.log(l.old.id);const o=this.profileQuery.getEntity(e);if(console.log("oldState"),console.log(o),o&&o.followings){const s=Object.assign([],o.followers);let n=s.findIndex(r=>r.id===l.old.id);s.splice(n),console.log("newState"),console.log(n),console.log(l.old.id),console.log(s),this.profileStore.update(e,{followings:s})}}}).subscribe()}checkIfIsOwner(e){let t="";this.authentificationQuery.uuid$.subscribe(l=>{t=l}),t===e?this.updateIsProfileOwner(t,!0):this.updateIsProfileOwner(e,!1)}updateIsFollowing(e,t){this.profileStore.ui.upsert(e,{isFollowing:t})}updateIsProfileOwner(e,t){this.profileStore.ui.upsert(e,{isOwner:t})}updateGroupsOfProfile(e,t){this.profileStore.upsert(e,{groups:t})}getRealTimeChangesIfStillFollower(e){let t="";return this.authentificationQuery.uuid$.subscribe(o=>{t=o}),this.supabaseClient.from("following_profile_system").on("INSERT",o=>{console.log("Payload"),console.log(o),o.new.following===e&&o.new.follower===t&&this.updateIsFollowing(e,!0)}).on("DELETE",o=>{console.log("Payload"),console.log(o),console.log("profile.id_"),console.log(o.old.following),console.log(e),o.old.following===e&&o.old.follower===t&&this.updateIsFollowing(e,!1)}).subscribe()}getRealTimeChangesGroupsOfProfile(e){return console.log("activated Get followers"),this.supabaseClient.from("group_members").on("INSERT",l=>{console.log("Payload"),console.log(l),l.new.user_id===e&&this.groupsService.selectGroup(l.new.group_id).then(o=>{console.log(o),console.log(o.data.id),console.log(o.data.name),console.log(o.data.avatar_url),console.log();let s={id:l.old.id,user_id:o.data.id,avatar_url:o.data.avatar_url,name:o.data.name};console.log(s);const n=this.profileQuery.getEntity(e);if(console.log("oldState"),console.log(n),console.log("oldState followers"),console.log(n?.followers),n&&n.groups){const r=Object.assign([],n.groups);r.push(s),console.log("newState"),console.log(r),this.profileStore.update(e,{groups:r})}})}).on("DELETE",l=>{console.log("Payload"),console.log(l),console.log("group.id_"),console.log(l.old.following),console.log(e),l.old.user_id===e&&this.groupsService.selectGroup(l.old.group_id).then(o=>{console.log(o),console.log(o.data.id),console.log(o.data.name),console.log(o.data.avatar_url),console.log(),console.log({id:l.old.id,user_id:o.data.id,avatar_url:o.data.avatar_url,name:o.data.name});const n=this.profileQuery.getEntity(e);if(console.log("oldState"),console.log(n?.groups),n&&n.groups){const r=Object.assign([],n.groups);let I=r.findIndex(m=>m.id===l.old.id);r.splice(I),console.log("newState"),console.log(I),console.log(l.old.id),console.log(r),this.profileStore.update(e,{groups:r})}})}).subscribe()}}return i.\u0275fac=function(e){return new(e||i)(d.LFG(v.s),d.LFG(E.J),d.LFG(w.J),d.LFG(b.w),d.LFG(a.c))},i.\u0275prov=d.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})()}}]);