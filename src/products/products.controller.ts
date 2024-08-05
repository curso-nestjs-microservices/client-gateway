import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCTS_MS } from 'src/config';
import { observableErrorHandler, PaginationDto } from 'src/common';
import { ProductPatterns } from './enums';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_MS) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send(
      { cmd: ProductPatterns.createProduct },
      createProductDto,
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send(
      { cmd: ProductPatterns.findAllProducts },
      paginationDto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return observableErrorHandler(
      this.productsClient.send({ cmd: ProductPatterns.findOneProduct }, { id }),
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return observableErrorHandler(
      this.productsClient.send(
        { cmd: ProductPatterns.updateProduct },
        { id, ...updateProductDto },
      ),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return observableErrorHandler(
      this.productsClient.send({ cmd: ProductPatterns.deleteProduct }, { id }),
    );
  }
}
