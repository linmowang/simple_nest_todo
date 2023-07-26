import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { staticBaseUrl } from './constants';

@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      file: staticBaseUrl + '/' + file.originalname,
    };
  }

  @Post('files')
  @UseInterceptors(FileInterceptor('file'))
  uploadFiles(@UploadedFile() files: Array<Express.Multer.File>) {
    return {
      files: files.map((f) => staticBaseUrl + '/' + f.originalname),
    };
  }
}
