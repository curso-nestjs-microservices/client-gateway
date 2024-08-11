import { Controller, Inject, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { AuthPatterns } from './enums';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  registerUser() {
    return this.client.send(AuthPatterns.register, {});
  }

  @Put('login')
  login() {
    return this.client.send(AuthPatterns.login, {});
  }

  @Put('verify')
  verifyToken() {
    return this.client.send(AuthPatterns.verify, {});
  }
}
