import { SetMetadata } from '@nestjs/common';
import { Role } from './role.interface';

export const Role_Key = 'role';
export const NeedRole = (...args: Role[]) => SetMetadata(Role_Key, args);
