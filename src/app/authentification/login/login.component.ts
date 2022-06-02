import { Component, OnInit } from '@angular/core';
import { account } from 'src/types/account';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginValues: account = {
    name: '',
    email: '',
    password: ''
  };


  constructor(private readonly authentificationService: AuthentificationService) { }
  loading: boolean = false;

  ngOnInit(): void {
  }

  public login(): void {
    this.authentificationService.login(this.loginValues);
  }

  async handleLogin(input: string = this.loginValues.email) {
    console.log(input);
    try {
      this.loading = true;
      await this.authentificationService.signIn(input);
      alert('Check your email for the login link!');
    } catch (error: any) {
      alert(error.error_description || error.message)
    } finally {
      this.loading = false;
    }
  }

}
