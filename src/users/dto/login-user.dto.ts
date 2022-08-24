import { OmitType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class LoginUserDto extends OmitType(UserDto, ['id', 'name'] as const) {}
