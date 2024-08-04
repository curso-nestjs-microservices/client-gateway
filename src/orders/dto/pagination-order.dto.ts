import { PaginationDto } from 'src/common';
import { OrderStatus } from '../enums';
import { IsEnum, IsOptional } from 'class-validator';

export class PaginationOrderDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatus, {
    message: `Valid status are: ${Object.values(OrderStatus)}`,
  })
  status: OrderStatus;
}
