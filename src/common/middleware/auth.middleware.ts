import {
  ForbiddenException,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class Auth implements NestMiddleware {
  constructor(@Inject(ConfigService) private readonly config) {}

  use(req: Request, _: Response, next: NextFunction) {
    try {
      const { authorization: token } = req.headers;
      const { id, email } = this.decodeToken(token);
      req.user = { id, email };

      next();
    } catch (_) {
      throw new ForbiddenException('Invalid token');
    }
  }

  private decodeToken(token: string) {
    const jwtSecret = this.config.get('JWT_SECRET');
    return <any>verify(token, jwtSecret);
  }
}
