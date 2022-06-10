import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '@supabase/supabase-js';
import { MessageService } from 'primeng/api';
import { AuthentificationService, Profile } from 'src/app/authentification/services/authentification.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [ MessageService ]
})
export class EditProfileComponent implements OnInit {
  loading: boolean = true;
  profile: Profile | undefined;
  session: Session | undefined;
  uploading: boolean = false;

  constructor(
    private readonly authentificationService: AuthentificationService,
    private messageService: MessageService,
    private router: Router
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
    console.log(fileUploader)
    if (!this.profile) return;
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
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;
      console.log('filepath '+ filePath)
      // const response = await this.authentificationService.uploadAvatar(filePath, file);
      // console.log('end', response.data?.Key);
      // if (this.profile && response.data?.Key) {
      //   this.updateContactInformation({
      //     avatarUrl:  response.data.Key,
      //   });
      // }
      try {
        const avatarUrl = await this.authentificationService.uploadAvatar(
          filePath,
          file,
          this.profile.avatarUrl || undefined,
        );
        this.profile!.avatarUrl = avatarUrl
        this.updateContactInformation({
          avatarUrl:  avatarUrl,
        });
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
