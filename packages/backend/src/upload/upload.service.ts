import { Injectable, BadRequestException, UnsupportedMediaTypeException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { mkdirp } from 'mkdirp';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async handleUpload(file: Express.Multer.File, projectId: string) {
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

    if (!file) throw new BadRequestException('No file uploaded');
    if (file.size > MAX_FILE_SIZE) throw new BadRequestException('File too large (max 10MB)');

    const allowedMimes = [
      'application/json',
      'application/x-yaml',
      'application/yaml',
      'text/yaml',
      'application/zip',
      'application/x-zip-compressed',
      'multipart/x-zip',
      'application/octet-stream',
    ];
    if (!allowedMimes.includes(file.mimetype)) {
      throw new UnsupportedMediaTypeException('Unsupported file type');
    }

    await mkdirp('./uploads');
    const ext = path.extname(file.originalname).toLowerCase();
    const isZip = ext === '.zip';
    const isYaml = ext === '.yaml' || ext === '.yml';
    const isJson = ext === '.json';

    let specType: 'OPENAPI' | 'CODE';
    if (isZip) specType = 'CODE';
    else if (isYaml || isJson) specType = 'OPENAPI';
    else throw new UnsupportedMediaTypeException('Only .yaml, .yml, .json, .zip allowed');

    const id = uuidv4();
    const filename = `${id}_${file.originalname}`;
    const outPath = path.join('./uploads', filename);
    await fsPromises.writeFile(outPath, file.buffer);

    // For zip files, rawText should be null to satisfy schema
    let rawText: string | null = null;
    if (!isZip) {
      rawText = file.buffer.toString('utf8');
    } else {
      rawText = null;
    }

    const apiSpec = await this.prisma.apiSpec.create({
      data: {
        projectId,
        filename,
        specType,
        rawText,
        filePath: outPath,
      },
    });

    return { id: apiSpec.id, specType, filename };
  }
}