import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  @MessagePattern({ cmd: 'create_product' })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // @Get()
  @MessagePattern({ cmd: 'find_all' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'find_one' })
  findOne(@Payload('id') id: string) {
    return this.productsService.findOne(id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'update_product' })
  update(
    // @Payload('id') id: string,
    // @Body() updateProductDto: UpdateProductDto,
    @Payload() data: { id: string; updateProductDto: UpdateProductDto },
  ) {
    const { id, updateProductDto } = data;
    return this.productsService.update(id, updateProductDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'remove_product' })
  remove(@Payload('id') id: string) {
    return this.productsService.remove(id);
  }
}
