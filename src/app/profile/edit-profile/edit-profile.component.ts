import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '@supabase/supabase-js';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { MegaMenu } from 'primeng/megamenu';
import { AuthentificationService, Profile } from 'src/app/authentification/services/authentification.service';
import { ImgUploadObject, StorageService } from 'src/app/storage/services/storage.service';
import { v4 as uuidv4 } from 'uuid';
import { profileMenuitems, profileMenuitemsMega } from '../services/profileMenuItems';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [ MessageService ]
})
export class EditProfileComponent implements OnInit {
  menuItems: MenuItem[] = profileMenuitems;
  menuItemsMega: MegaMenuItem[] = profileMenuitemsMega;
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
        const avatarUrl = await this.storageService.uploadImg(
          imgUploadObject,
          this.profile.avatarUrl || undefined,
          'avatars'
        );
        this.profile!.avatarUrl = avatarUrl
        this.updateContactInformation(
          {avatarUrl:  avatarUrl});
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
