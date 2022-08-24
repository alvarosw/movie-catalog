import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  OmitType,
} from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
@ApiTags('user')
export class UsersController {
  constructor(private readonly moviesService: UsersService) {}

  @Post()
  @ApiBadRequestResponse()
  @ApiCreatedResponse({
    type: () => OmitType(CreateUserDto, ['password']),
    description: 'Usuário registrado',
  })
  register(@Body() createUserDto: CreateUserDto) {
    return this.moviesService.register(createUserDto);
  }

  @Post('/login')
  @ApiUnauthorizedResponse()
  @ApiOkResponse({
    type: () => ({ token: String, expiresIn: Number }),
    description: 'Login bem sucedido',
  })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.moviesService.login(loginUserDto);
  }
}
