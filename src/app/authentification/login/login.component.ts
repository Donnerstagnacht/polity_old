import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/types/account';
import { AuthentificationService } from '../state/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginValues: Account = {
    name: '',
    email: '',
    password: ''
  };
  loading: boolean = false;


  constructor(
    private readonly authentificationService: AuthentificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async handleLogin(email: string = this.loginValues.email, password: string = this.loginValues.password) {
    try {
      this.loading = true;
      await this.authentificationService.signIn(email, password);
      this.router.navigate(['/profile']);
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      this.loading = false;
    }
  }

}
