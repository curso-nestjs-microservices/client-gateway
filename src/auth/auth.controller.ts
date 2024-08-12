import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { observableErrorHandler } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { AuthPatterns } from './enums';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthGuard } from './guards';
import { Token, User } from './decorators';
import { ICurrentUser } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return observableErrorHandler(
      this.client.send(AuthPatterns.register, registerUserDto),
    );
  }

  @Put('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return observableErrorHandler(
      this.client.send(AuthPatterns.login, loginUserDto),
    );
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyToken(@User() user: ICurrentUser, @Token() token: string) {
    // return observableErrorHandler(this.client.send(AuthPatterns.verify, {}));
    return { user, token };
  }
}
