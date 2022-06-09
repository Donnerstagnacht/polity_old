import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '@supabase/supabase-js';
import { AuthentificationService, Profile } from 'src/app/authentification/services/authentification.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  loading: boolean = true;
  profile: Profile | undefined;
  session: Session | undefined;

  constructor(
    private readonly authentificationService: AuthentificationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  async getProfile() {
    try {
      this.loading = true;
      let {data: profile, error, status} = await this.authentificationService.profile;

      if (error && status !== 406) {
        throw error;
      }

      if (profile) {
        this.profile = profile;
      }
    } catch (error: any) {
      console.error(error.message);
      this.router.navigate(['/login']);
    } finally {
      this.loading = false;
    }
  }

  async updateProfile(username: string, website: string, avatar_url: string = '') {
    try {
      this.loading = true;
      await this.authentificationService.updateProfile({username, website, avatar_url});
    } catch (error: any) {
      alert(error.message);
    } finally {
      this.loading = false;
    }
  }
}
