import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class UserDto {
  @ApiProperty({
    description: 'Id do usuário',
    type: Number,
    example: 1,
  })
  id: User['id'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do usuário',
    type: String,
    example: 'Silvio Santos',
  })
  name: User['name'];

  @ApiProperty({
    description: 'Email do usuário',
    type: String,
    example: 'mah@owe.com.br',
  })
  @IsEmail()
  @IsNotEmpty()
  email: User['email'];

  @ApiProperty({
    description: 'Senha do usuário. Será salva encriptada.',
    type: String,
    example: 'SUPER@secret!',
  })
  @IsString()
  @IsNotEmpty()
  password: User['password'];
}
