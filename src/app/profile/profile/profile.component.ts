import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { Session } from '@supabase/supabase-js';
import { Profile, AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { ProfileService } from '../services/profile.service';
import { FollowingService } from 'src/app/following-profiles-system/services/following.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading: boolean = true;
  profile: Profile | undefined;
  @Input() session: Session | undefined;
  isAlreadyFollower: boolean = false;

  selectedProfileId: string | undefined = undefined;

  constructor(
    private readonly supabase: AuthentificationService,
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private followingservice: FollowingService
  ) {}

  ngOnInit(): void {
    this.getSelectedId();
    this.getSelectedProfile();
    this.checkIfAlreadyFollower();
  }

  getSelectedId(): void {
    this.route.paramMap.subscribe(parameter => {
      this.selectedProfileId = String(parameter.get('id') || this.supabase.user?.id);
      // console.log('constructor' + this.selectedProfileId)
    })
  }

  getSelectedProfile(): void {
    if (this.selectedProfileId) {
      this.profileService.findProfil(this.selectedProfileId)
      .then((profile) => {
        this.profile = profile.data
      }
      )
      .catch((error) => {console.log(error)})
    }
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

  followOrUnfollowProfile(): void {
    if(this.selectedProfileId) {
      if(this.isAlreadyFollower) {
        this.followingservice.unFollow(this.selectedProfileId)
        .then((deletedData) => {
          if(deletedData.data[0] !== undefined) {
            this.isAlreadyFollower = false;
          }
        })
        .catch();
      } else {
        this.followingservice.follow(this.selectedProfileId)
        .then((insertData) => {
          if(insertData.data[0] !== undefined) {
            this.isAlreadyFollower = true;
          }
        })
        .catch();
      }
    }
  }

  checkIfAlreadyFollower(): void {
    if(this.selectedProfileId) {
      this.followingservice.isAlreadyFollower(this.selectedProfileId)
      .then((results) => {
        if(results.data[0] !== undefined) {
          this.isAlreadyFollower = true;
        } else {
          this.isAlreadyFollower = false;
        }
      })
      .catch();
    }
  }
}
