import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ORDERS_MS } from 'src/config';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { OrderPatterns } from './enums';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDERS_MS) private readonly ordersClient: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send(OrderPatterns.createOrder, createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersClient.send(OrderPatterns.findAllOrders, {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersClient.send(OrderPatterns.findOneOrder, { id });
  }

  @Patch(':id')
  changeStatus(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersClient.send(OrderPatterns.changeStatusOrder, {
      id,
      updateOrderDto,
    });
  }
}
