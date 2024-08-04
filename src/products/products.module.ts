import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsController } from './products.controller';
import { PRODUCTS_MS } from 'src/config/services';
import { envs } from 'src/config';

@Module({
  controllers: [ProductsController],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_MS,
        transport: Transport.TCP,
        options: { host: envs.productsHost, port: envs.productsPort },
      },
    ]),
  ],
})
export class ProductsModule {}
