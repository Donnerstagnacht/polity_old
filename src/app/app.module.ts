import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthentificationModule } from './authentification/authentification.module';
import { GroupsModule } from './groups/groups.module';
import { ProfileModule } from './profile/profile.module';
import { SearchModule } from './search/search.module';
import { UINavigationModule } from './UI-navigation/ui-navigation.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    UINavigationModule,
    AuthentificationModule,
    ProfileModule,
    SearchModule,
    GroupsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
