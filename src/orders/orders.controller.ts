import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ORDERS_MS } from 'src/config';
import { CreateOrderDto, PaginationOrderDto, StatusOrderDto } from './dto';
import { OrderPatterns } from './enums';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDERS_MS) private readonly ordersClient: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send(OrderPatterns.createOrder, createOrderDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationOrderDto) {
    return this.ordersClient.send(OrderPatterns.findAllOrders, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.ordersClient.send(OrderPatterns.findOneOrder, {
          id,
        }),
      );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusOrderDto,
  ) {
    try {
      const order = await firstValueFrom(
        this.ordersClient.send(OrderPatterns.changeStatusOrder, {
          id,
          ...statusDto,
        }),
      );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
