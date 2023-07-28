import { Controller, Get, Param, Res, UploadedFile } from '@nestjs/common';
import { StaticService } from './static.service';
import { SkipJwtAuth } from '../auth/contants';
import * as path from 'path';
import { ApiTags } from '@nestjs/swagger';

const uploadDistDir = path.join(__dirname, '../../', 'upload_dist');

@ApiTags('文件接口')
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
