"use strict";(self.webpackChunkpolity=self.webpackChunkpolity||[]).push([[592],{4593:(f,u,e)=>{e.d(u,{g:()=>D});var a=e(5861),_=e(19),E=e(2653),n=e(2340),t=e(1571),l=e(6469),h=e(4576),O=e(1992),M=e(5608),P=e(6943),d=e(7607);let D=(()=>{class i{constructor(r,o,c,s,p,v,S){this.persistStorage=r,this.authentificationStore=o,this.profileStore=c,this.groupStore=s,this.newsStore=p,this.chatStore=v,this.chatRoomStore=S,this.supabaseClient=(0,E.eI)(n.N.supabaseUrl,n.N.supabaseKey)}signIn(r,o){var c=this;return(0,a.Z)(function*(){const s=yield c.supabaseClient.auth.signInWithPassword({email:r,password:o});if(s.error)throw new Error(s.error.message);c.authentificationStore.update({sessionResponse:s,uuid:s.data.user?.id})})()}signOut(){var r=this;return(0,a.Z)(function*(){const o=yield r.supabaseClient.auth.signOut();if(console.log(o),o.error)throw new Error(o.error.message);r.supabaseClient.removeAllChannels(),r.authentificationStore.reset(),r.profileStore.reset(),r.groupStore.reset(),r.groupStore.ui.reset(),r.groupStore.resetUIStore(),r.profileStore.resetUIStore(),r.newsStore.reset(),r.chatRoomStore.reset(),r.chatStore.reset(),(0,_.W_)(),r.persistStorage.clear()})()}signUp(r){var o=this;return(0,a.Z)(function*(){const c=r.email,s=r.password,p=yield o.supabaseClient.auth.signUp({email:c,password:s});if(p.error)throw new Error(p.error.message)})()}}return i.\u0275fac=function(r){return new(r||i)(t.LFG("persistStorage"),t.LFG(l.q),t.LFG(h.s),t.LFG(O.M),t.LFG(M.W),t.LFG(P.w),t.LFG(d.n))},i.\u0275prov=t.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})()},7607:(f,u,e)=>{e.d(u,{n:()=>t});var a=e(7582),_=e(19),E=e(1571);let t=class extends _.yh{constructor(){super({messages:[]})}};t.\u0275fac=function(h){return new(h||t)},t.\u0275prov=E.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t=(0,a.gn)([(0,_.yC)({name:"chat-room",resettable:!0})],t)},6943:(f,u,e)=>{e.d(u,{w:()=>t});var a=e(7582),_=e(19),E=e(1571);const n={ui:{filters:{name:!1}}};let t=class extends _.cf{constructor(){super(n)}};t.\u0275fac=function(h){return new(h||t)},t.\u0275prov=E.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t=(0,a.gn)([(0,_.yC)({name:"chat",resettable:!0})],t)}}]);