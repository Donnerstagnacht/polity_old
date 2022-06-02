import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private readonly authentificationService: AuthentificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  public async createAccount() {
    try {
      await this.authentificationService.createAccount(this.account);
      this.router.navigate(['/profile']);
    } catch (error: any) {
      console.error(error);
      alert(error.error_description || error.message);
    }
  }

  public toggleDataProtection(): void {
      this.displayDataProtection = true;
  }

  public toggleTermsAndConditions(): void {
    this.displayTermsAndConditions = true;
  }

}
