import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { MenuBarBottomModule} from './UI-navigation/menu-bar-bottom/menu-bar-bottom.module';
import { MenuBarLeftModule } from './UI-navigation/menu-bar-left/menu-bar-left.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    MenuBarBottomModule,
    MenuBarLeftModule,
    ToastModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),

    AkitaNgRouterStoreModule
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }}]
})
export class AppModule { }
