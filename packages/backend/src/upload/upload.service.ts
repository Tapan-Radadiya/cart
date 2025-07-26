import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  async handleUpload(file: Express.Multer.File, projectId: string) {
    // TODO: Save file to /uploads, create ApiSpec in DB
  }
}