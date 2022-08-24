import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    name: 'Token de autorização',
    description:
      'Token a ser usado nos headers de requisições HTTP autenticadas',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC9.eyJpZCI6MSwiZW1haWwiOiJhbHZhcm9Ac29mdHdhcmUuY29tIiwiaWF0IjoxNjYxMzY4NTQ0LCJleHAiOjE2NjE0NTQNDR9.FANcW7YXNURhS4UETWmaThu9P2B0z7QmIIJmKGnHMs',
  })
  token: string;

  @ApiProperty({
    name: 'Validade do token',
    description: 'Tempo em segundos até a expiração do token',
    example: 86400,
  })
  expiresIn: number;
}
