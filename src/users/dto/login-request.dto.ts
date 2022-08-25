import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class LoginRequestDto extends OmitType(UserDto, [
  'id',
  'name',
] as const) {}
