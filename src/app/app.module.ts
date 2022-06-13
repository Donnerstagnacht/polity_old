import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthentificationModule } from './authentification/authentification.module';
import { FollowingProfilesSystemModule } from './following-profiles-system/following-profiles-system.module';
import { ProfileModule } from './profile/profile.module';
import { SearchModule } from './search/search.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthentificationModule,
    SharedModule,
    ProfileModule,
    SearchModule,
    FollowingProfilesSystemModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
