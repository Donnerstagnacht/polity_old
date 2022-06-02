import { Component, OnInit } from '@angular/core';
import { account } from '../../../types/account';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  account: account= {
    name: '',
    email: '',
    password: ''
  };

  displayDataProtection: boolean = false;
  displayTermsAndConditions: boolean = false;

  constructor(private authentificationService: AuthentificationService) { }

  ngOnInit(): void {

  }

  public createAccount(): void {
    this.authentificationService.createAccount(this.account);
  }

  public toggleDataProtection(): void {
      this.displayDataProtection = true;
  }

  public toggleTermsAndConditions(): void {
    this.displayTermsAndConditions = true;
  }

}
