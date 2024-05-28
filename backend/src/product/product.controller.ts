import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from 'shared/lib/common';
import { MongoIdValidationPipe } from '../database/mongo-id-validation.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { ProductRdo } from './rdo/product.rdo';

@ApiTags('products')
@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(private readonly productService: ProductService) {}

  @Post('')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: ProductRdo,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async createProduct(
    @Body() dto: CreateProductDto,
  ): Promise<ProductRdo> {
    this.logger.log(`Creating new product with title: '${dto.title}'`);
    const createdProduct = await this.productService.createProduct(dto);

    return fillDto(ProductRdo, createdProduct.toPOJO());
  }

  @Get(':productId')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully retrieved.',
    type: ProductRdo,
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  public async getProduct(
    @Param('productId', MongoIdValidationPipe) productId: string,
  ): Promise<ProductRdo> {
    this.logger.log(`Retrieving product with ID: '${productId}'`);
    const foundProduct = await this.productService.findProductById(productId);

    return fillDto(ProductRdo, foundProduct.toPOJO());
  }

  @Patch(':productId')
  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
    type: ProductRdo,
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  public async updateProduct(
    @Param('productId', MongoIdValidationPipe) productId: string,
    @Body() dto: UpdateProductDto,
  ): Promise<ProductRdo> {
    this.logger.log(`Updating product with ID '${productId}'`);
    const updatedProduct = await this.productService.updateProductById(
      productId,
      dto,
    );

    return fillDto(ProductRdo, updatedProduct.toPOJO());
  }

  @Delete(':productId')
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
    type: ProductRdo,
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  public async deleteProduct(
    @Param('productId', MongoIdValidationPipe) productId: string,
  ): Promise<ProductRdo> {
    this.logger.log(`Attempting to delete product with ID: ${productId}`);
    const deletedProduct =
      await this.productService.deleteProductById(productId);
    this.logger.log(`Product deleted with ID: '${deletedProduct.id}'`);

    return fillDto(ProductRdo, deletedProduct.toPOJO());
  }
}
