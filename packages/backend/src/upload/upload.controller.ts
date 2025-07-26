import { Controller, Post, UploadedFile, UseInterceptors, Body, Req, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Request, Response } from 'express';

@Controller('api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('projectId') projectId: string,
    @Res() res: Response,
  ) {
    // TODO: handle .zip or OpenAPI, validate MIME, persist to disk, create ApiSpec in DB
    await this.uploadService.handleUpload(file, projectId);
    return res.status(201).json({ success: true });
  }
}