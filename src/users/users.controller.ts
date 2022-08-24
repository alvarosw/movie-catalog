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
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';

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
    type: () => LoginResponseDto,
    description: 'Login bem sucedido',
  })
  login(@Body() loginUserDto: LoginRequestDto) {
    return this.moviesService.login(loginUserDto);
  }
}
