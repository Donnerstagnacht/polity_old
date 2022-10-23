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
    bucket: string
  ) {
    const filePath = imgUploadObject.filePath;
    const file = imgUploadObject.file;
    const response = await this.supabaseClient.storage
      .from(bucket)
      .upload(filePath, file);
    if (response.error) throw Error('Img upload failed.');
    return this.getPublicUrl(filePath, bucket);
  }

  public async deleteImg(filePath: string, bucket: string) {
    const oldImg: string = filePath ? filePath.split(`public/${bucket}/`)[1] : filePath;
    const { data, error } = await this.supabaseClient.storage.from(bucket).remove([oldImg]);
    if (error) throw Error('Removal of old img failed.');
    return true;
  }

  private getPublicUrl(path: string, bucket: string) {
    const response = this.supabaseClient.storage.from(bucket).getPublicUrl(path);
    if (response.error)
      throw Error('Upload failed.');
    return response.data!.publicURL;
  }
}
