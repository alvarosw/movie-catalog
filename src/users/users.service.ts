import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { compare, hashSync } from 'bcrypt';
import { LoginRequestDto } from './dto/login-request.dto';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    @Inject(ConfigService) private readonly env: ConfigService,
  ) {}

  async register(registerDto: CreateUserDto) {
    const password = this.toHashPassword(registerDto.password);
    await this.validateEmailUniquenessOrReject(registerDto.email);

    const user = await this.repository.save({ ...registerDto, password });
    delete user.id;
    delete user.password;

    return user;
  }

  async login(loginDto: LoginRequestDto) {
    const user = await this.repository.findOneBy({ email: loginDto.email });
    if (!user) throw new HttpException('Email not registered.', 401);

    const passwordMatches = await this.verifyPassword(
      loginDto.password,
      user.password,
    );

    if (!passwordMatches) throw new HttpException('Invalid password.', 401);

    return this.generateToken(user);
  }

  async validateEmailUniquenessOrReject(email: string) {
    const existingUser = await this.repository.findOneBy({ email });

    if (existingUser) throw new BadRequestException('Email already exists.');
  }

  toHashPassword(password: string) {
    const saltOrRounds = +this.env.get('BCRYPT_SALT_OR_ROUNDS');
    return hashSync(password, saltOrRounds);
  }

  verifyPassword(inputPass: string, dbPass: string) {
    return compare(inputPass, dbPass);
  }

  generateToken({ id, email }: { id: number; email: string }) {
    const expiresIn = +this.env.get('TOKEN_EXPIRES_IN_SECONDS');
    const jwtSecret = this.env.get('JWT_SECRET');

    const token = sign({ id, email }, jwtSecret, {
      expiresIn,
    });

    return { token, expiresIn };
  }
}
