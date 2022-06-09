import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  uploading: boolean = false;
  @Output() upload = new EventEmitter<string>();

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
        console.log(profile.contactEmail)
        console.log(profile.username)
      }
    } catch (error: any) {
      console.error(error.message);
      this.router.navigate(['/login']);
    } finally {
      this.loading = false;
    }
  }

  async updateContactInformation(
    username: string,
    website: string,
    avatar_url: string,
    contactEmail: string,
    contactPhone: string,
    street: string,
    postCode: any,
    city: string,
    about: string
    ): Promise<void> {
    try {
      this.loading = true;
      await this.authentificationService.updateProfile({
        username,
        website,
        avatar_url,
        contactEmail,
        contactPhone,
        street,
        postCode,
        city,
        about
      });
    } catch (error: any) {
      alert(error.message);
    } finally {
      this.loading = false;
    }
  }

  async updateProfilePhoto(event: any) {
    console.log('called');
    console.log(event.files);
    console.log(event);
    try {
      this.uploading = true;
      if (!event.files || event.files.length === 0 || event.files === undefined) {
        throw new Error('You must select an image to upload.');
      }
      /*File-Upload - Feature */
      const file = event.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `test.${fileExt}`; /*`${Math.random()}.${fileExt}`;*/
      const filePath = `${fileName}`;
      console.log('filepath '+ filePath)
      await this.authentificationService.uploadAvatar(filePath, file);
      console.log('end');
      this.upload.emit(filePath);
    } catch (error: any) {
      alert('hello' + error.message);
    } finally {
      this.uploading = false;
    }
  }
}
