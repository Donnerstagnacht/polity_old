import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RealtimeChannel, Session } from '@supabase/supabase-js';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { ImgUploadObject, StorageService } from 'src/app/utilities/storage/services/storage.service';
import { Profile, ProfileCore } from '../state/profile.model';
import { ProfileQuery } from '../state/profile.query';
import { ProfileService } from '../state/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [ MessageService, HttpClient ]
})
export class EditProfileComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  profile: ProfileCore | undefined;
  loggedInUserId: string | null = null;

  session: Session | undefined;
  uploading: boolean = false;

  profileSubscription: Subscription | undefined;
  userIdSubscription: Subscription | undefined;
  profileRealTimeSubscription: RealtimeChannel | undefined;

  constructor(
    private messageService: MessageService,
    private storageService: StorageService,
    private profileQuery: ProfileQuery,
    private profileService: ProfileService,
    private authentificationQuery: AuthentificationQuery
  ) { }

  ngOnInit(): void {
    this.getLoggedInUserId$();
    this.getSelectedProfile();
    if(this.loggedInUserId) {
      this.profileRealTimeSubscription = this.profileService.getRealTimeChanges(this.loggedInUserId);
    }
  }

  getLoggedInUserId$(): void {
    this.userIdSubscription = this.authentificationQuery.uuid$.subscribe((uuid) => {
      if(uuid) {
        this.loggedInUserId = uuid;
      }
    })
  }

  // could create error if user visits page directly by link without visiting profile wiki pag
  // due to fact that user is not stored in store
  getSelectedProfile(): void {
    if (this.loggedInUserId) {
      this.profileSubscription = this.profileQuery
        .selectEntity(this.loggedInUserId)
        .subscribe((profile: Profile | undefined) => {
          if(profile) {
            const profilecore: ProfileCore = {
              id: profile.id,
              name: profile.name,
              website: profile.website,
              avatar_url: profile.avatar_url,
              contact_email: profile.contact_email,
              contact_phone: profile.contact_phone,
              street: profile.street,
              post_code: profile.post_code,
              city: profile.city,
              about: profile.about,
              fts: profile.fts
            }
            this.profile = JSON.parse(JSON.stringify(profilecore));
            this.loading = false;
          }
        })
    }
  }

  async updateContactInformation(profile: Partial<ProfileCore>): Promise<void> {
    try {
      this.loading = true;
      await this.profileService.update(this.loggedInUserId, profile)
      this.messageService.add({severity:'success', summary: 'Update erfolgreich.'});
    } catch (error: any) {;
      this.messageService.add({severity:'error', summary: error});
      throw Error(error);
    } finally {
      this.loading = false;
    }
  }

  async updateProfilePhoto(event: any, fileUploader: any) {
    if (!this.profile) return;
    try {
      this.uploading = true;
      const imgUploadObject: ImgUploadObject = this.storageService.createFilePath(event);
      let avatar_url = '';
      try {
        const old_avatar_url = this.profile.avatar_url || undefined;
        const avatar_bucket = 'avatars';
        avatar_url = await this.storageService.uploadImg(
          imgUploadObject,
          avatar_bucket
        );
        await this.updateContactInformation({avatar_url:  avatar_url});
        if (old_avatar_url) await this.storageService.deleteImg(old_avatar_url, avatar_bucket);
        this.profile.avatar_url = avatar_url;
        this.messageService.add({severity:'success', summary: 'Upload des Avatars war erfolgreich.'});
      } catch (error: any) {
        try {
          await this.storageService.deleteImg(avatar_url, 'avatars');
          this.messageService.add({severity:'error', summary: error});
        } catch (imageRemovalError: any) {
          /*
            here we display the original error
            the failed removal of the stale image should be logged to ELK or simmilar
            to be able to clean up these images periodically
          */ 
          this.messageService.add({severity:'error', summary: error});
        }
      }
      fileUploader.clear();
    } catch (error: any) {
      this.messageService.add({severity:'error', summary: error.message});
    } finally {
      this.uploading = false;
    }
  }

  ngOnDestroy(): void {
    if(this.profileSubscription) {
      this.profileSubscription.unsubscribe()
    }
    if(this.profileRealTimeSubscription) {
      this.profileRealTimeSubscription.unsubscribe()
    }
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe()
    }
}
}
