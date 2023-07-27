import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Inject, Post, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { SkipJwtAuth } from 'src/auth/contants';

@ApiTags('访问量')
@SkipJwtAuth()
@Controller('count')
export class CountController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get()
  async getCount() {
    const count: number = await this.cacheManager.get('count');
    return { count: count || 0 };
  }

  @Post()
  async updateCount() {
    const { count } = await this.getCount();
    await this.cacheManager.set('count', count + 1, 1000);
    return { count: count + 1 };
  }

  @Delete()
  async deleteCount() {
    await this.cacheManager.del('count');
  }

  @Delete('reset')
  async reset() {
    await this.cacheManager.reset();
  }
}
