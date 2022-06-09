import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '@supabase/supabase-js';
import { Profile, AuthentificationService } from 'src/app/authentification/services/authentification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading: boolean = true;
  profile: Profile | undefined;
  @Input() session: Session | undefined;

  constructor(
    private readonly supabase: AuthentificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  async getProfile() {
    try {
      this.loading = true;
      let {data: profile, error, status} = await this.supabase.profile;

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
}
