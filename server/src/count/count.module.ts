import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CountController } from './count.controller';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      // @ts-ignore
      store: async () =>
        await redisStore({
          // Store-specific configuration:
          socket: {
            host: 'localhost',
            port: 6379,
          },
        }),
    }),
  ],
  controllers: [CountController],
})
export class CountModule {}
