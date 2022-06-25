import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

export interface ImgUploadObject {
  filePath: string;
  file: any;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

   createFilePath(event: any): ImgUploadObject {
    if (!event.files || event.files.length === 0 || event.files === undefined) {
      throw new Error('You must select an image to upload.');
    }
    const file = event.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;

    const imgUploadObject: ImgUploadObject = {
      filePath: filePath,
      file: file
    }
    return imgUploadObject;
   }

  async uploadImg(
    imgUploadObject: ImgUploadObject,
    oldFilePath: string | undefined,
    bucket: string
  ) {
    const filePath = imgUploadObject.filePath;
    const file = imgUploadObject.file;
    const response = await this.supabaseClient.storage
      .from(bucket)
      .upload(filePath, file);
    if (response.error)
      throw Error('Img upload failed.');
    const oldImg: string = oldFilePath ? oldFilePath.split(`public/${bucket}/`)[1] : '';
    if (oldImg)
      await this.deleteImg(oldImg, bucket);
    return this.getPublicUrl(filePath, bucket);
  }

  private async deleteImg(path: string, bucket: string) {
    const response = await this.supabaseClient.storage.from(bucket).remove([path]);
    if (response.error)
      throw Error('Removal of old img failed.');
    return true;
  }

  private getPublicUrl(path: string, bucket: string) {
    const response = this.supabaseClient.storage.from(bucket).getPublicUrl(path);
    if (response.error)
      throw Error('Upload failed.');
    return response.data!.publicURL;
  }
}
