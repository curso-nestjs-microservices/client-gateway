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
import { ClientProxy } from '@nestjs/microservices';
import { ORDERS_MS } from 'src/config';
import { CreateOrderDto, PaginationOrderDto, StatusOrderDto } from './dto';
import { OrderPatterns } from './enums';
import { observableErrorHandler } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDERS_MS) private readonly ordersClient: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return observableErrorHandler(
      this.ordersClient.send(OrderPatterns.createOrder, createOrderDto),
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationOrderDto) {
    return this.ordersClient.send(OrderPatterns.findAllOrders, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return observableErrorHandler(
      this.ordersClient.send(OrderPatterns.findOneOrder, {
        id,
      }),
    );
  }

  @Patch(':id')
  async changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusOrderDto,
  ) {
    return observableErrorHandler(
      this.ordersClient.send(OrderPatterns.changeStatusOrder, {
        id,
        ...statusDto,
      }),
    );
  }
}
