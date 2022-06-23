import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { profileMenuitems, profileMenuitemsMega } from '../services/profileMenuItems';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  menuItems: MenuItem[] = profileMenuitems;
  menuItemsMega: MegaMenuItem[] = profileMenuitemsMega;


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
