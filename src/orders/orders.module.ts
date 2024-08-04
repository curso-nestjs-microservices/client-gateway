import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDERS_MS } from 'src/config';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  imports: [
    ClientsModule.register([
      {
        name: ORDERS_MS,
        transport: Transport.TCP,
        options: { host: envs.ordersHost, port: envs.ordersPort },
      },
    ]),
  ],
})
export class OrdersModule {}
