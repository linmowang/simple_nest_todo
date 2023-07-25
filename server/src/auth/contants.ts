import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: 'jwtsecret',
  expiresIn: '3600s',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const SkipJwtAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
