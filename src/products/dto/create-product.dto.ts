import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateProductDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsNumber({
    maxDecimalPlaces: 4,
  })
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsOptional()
  @Transform(({ value }) => [1, '1', true, 'true'].includes(value))
  enabled: boolean;
}
