import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { OrderStatus } from '../enums';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  totalAmt: number;

  @IsNumber()
  @IsPositive()
  totalItems: number;

  @IsEnum(OrderStatus, {
    message: `Valid status are: ${Object.values(OrderStatus)}`,
  })
  @IsOptional()
  status: OrderStatus = OrderStatus.Pending;
}
