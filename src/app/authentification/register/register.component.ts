import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../../types/account';
import { AuthentificationService } from '../state/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  account: Account= {
    name: '',
    email: '',
    password: ''
  };
  displayDataProtection: boolean = false;
  displayTermsAndConditions: boolean = false;

  constructor(
    private readonly authentificationService: AuthentificationService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  public async createAccount() {
    try {
      await this.authentificationService.signUp(this.account);
      this.router.navigate(['/profile']);
    } catch (error: any) {
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
