import { Controller, Get, Param, Res, UploadedFile } from '@nestjs/common';
import { StaticService } from './static.service';
import { SkipJwtAuth } from 'src/auth/contants';
import * as path from 'path';

const uploadDistDir = path.join(__dirname, '../../', 'upload_dist');

@Controller('static')
export class StaticController {
  constructor(private readonly staticService: StaticService) {}

  @SkipJwtAuth()
  @Get(':subPath')
  render(@Param('subPath') subPath, @Res() res) {
    const filePath = path.join(uploadDistDir, subPath);
    return res.sendFile(filePath);
  }
}
