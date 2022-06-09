import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(
    private readonly authentificationService: AuthentificationService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  async signOut(): Promise<any> {
    await this.authentificationService.signOut();
    this.router.navigate(['/login']);
  }


}
