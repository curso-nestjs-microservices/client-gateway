import { OrderStatus } from '../enums';
import { IsEnum, IsOptional } from 'class-validator';

export class StatusOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus, {
    message: `Valid status are: ${Object.values(OrderStatus)}`,
  })
  status: OrderStatus;
}
