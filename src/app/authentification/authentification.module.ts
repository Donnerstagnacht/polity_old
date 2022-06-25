import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';

import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {KeyFilterModule} from 'primeng/keyfilter';
import { FormsModule } from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {DialogModule} from 'primeng/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { LoginComponent } from './login/login.component';
import { UIStructureModule } from '../UI-structure/ui-structure.module';

@NgModule({
  declarations: [
    RegisterComponent,
    TermsAndConditionsComponent,
    DataProtectionComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    KeyFilterModule,
    PasswordModule,
    DialogModule,
    UIStructureModule
  ],
  exports: [
    RegisterComponent,
    FormsModule
  ]
})
export class AuthentificationModule { }
