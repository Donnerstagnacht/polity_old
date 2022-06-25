import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '@supabase/supabase-js';
import { MessageService } from 'primeng/api';
import { AuthentificationService, Profile } from 'src/app/authentification/services/authentification.service';
import { ImgUploadObject, StorageService } from 'src/app/utilities/storage/services/storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [ MessageService, HttpClient ]
})
export class EditProfileComponent implements OnInit {
  loading: boolean = true;
  profile: Profile | undefined;
  session: Session | undefined;
  uploading: boolean = false;

  constructor(
    private readonly authentificationService: AuthentificationService,
    private messageService: MessageService,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.getProfile();
    console.warn(this.messageService)
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

  async updateContactInformation(profile: Partial<Profile>): Promise<void> {
    try {
      this.loading = true;
      await this.authentificationService.updateProfile(profile);
      this.messageService.add({severity:'success', summary: 'Update erfolgreich.'});
    } catch (error: any) {;
      this.messageService.add({severity:'error', summary: error});
    } finally {
      this.loading = false;
    }
  }

  async updateProfilePhoto(event: any, fileUploader: any) {
    if (!this.profile) return;
    try {
      this.uploading = true;
      const imgUploadObject: ImgUploadObject = this.storageService.createFilePath(event)
      try {
        const avatar_url = await this.storageService.uploadImg(
          imgUploadObject,
          this.profile.avatar_url || undefined,
          'avatars'
        );
        this.profile!.avatar_url = avatar_url
        this.updateContactInformation(
          {avatar_url:  avatar_url});
        fileUploader.clear();
        this.messageService.add({severity:'success', summary: 'Upload des Avatars war erfolgreich.'});
      } catch (error: any) {
        this.messageService.add({severity:'error', summary: error});
      }
    } catch (error: any) {
      this.messageService.add({severity:'error', summary: error.message});
    } finally {
      this.uploading = false;
    }
  }
}
