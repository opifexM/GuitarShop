import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { fillDto } from 'shared/lib/common';
import { CreateProductDto } from 'shared/type/product/dto/create-product.dto';
import { ProductPaginationDto } from 'shared/type/product/dto/product-pagination.dto';
import { ProductDto } from 'shared/type/product/dto/product.dto';
import { UpdateProductDto } from 'shared/type/product/dto/update-product.dto';
import { ProductQuery } from 'shared/type/product/product.query';
import { MongoIdValidationPipe } from '../database/mongo-id-validation.pipe';
import { JwtAuthGuard } from '../user/authentication/jwt-auth.guard';
import { ProductService } from './product.service';

@ApiTags('products')
@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(private readonly productService: ProductService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: ProductDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async createProduct(
    @Body() dto: CreateProductDto,
  ): Promise<ProductDto> {
    this.logger.log(`Creating new product with title: '${dto.title}'`);
    const createdProduct = await this.productService.createProduct(dto);

    return fillDto(ProductDto, createdProduct.toPOJO());
  }

  @Get(':productId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully retrieved.',
    type: ProductDto,
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  public async getProduct(
    @Param('productId', MongoIdValidationPipe) productId: string,
  ): Promise<ProductDto> {
    this.logger.log(`Retrieving product with ID: '${productId}'`);
    const foundProduct = await this.productService.findProductById(productId);

    return fillDto(ProductDto, foundProduct.toPOJO());
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all product list' })
  @ApiResponse({
    status: 200,
    description: 'The products list has been successfully retrieved.',
    type: ProductPaginationDto,
  })
  @ApiResponse({ status: 404, description: 'Products not found.' })
  public async getAllProduct(
    @Query() query: ProductQuery,
  ): Promise<ProductPaginationDto> {
    this.logger.log(
      `Retrieving products with query: ${JSON.stringify(query)}'`,
    );
    const productPagination =
      await this.productService.findProductByQuery(query);

    const transformedProductPagination = {
      ...productPagination,
      entities: productPagination.entities.map((product) => product.toPOJO()),
    };

    return fillDto(ProductPaginationDto, transformedProductPagination);
  }

  @Patch(':productId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
    type: ProductDto,
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  public async updateProduct(
    @Param('productId', MongoIdValidationPipe) productId: string,
    @Body() dto: UpdateProductDto,
  ): Promise<ProductDto> {
    this.logger.log(`Updating product with ID '${productId}'`);
    const updatedProduct = await this.productService.updateProductById(
      productId,
      dto,
    );

    return fillDto(ProductDto, updatedProduct.toPOJO());
  }

  @Delete(':productId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
    type: ProductDto,
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  public async deleteProduct(
    @Param('productId', MongoIdValidationPipe) productId: string,
  ): Promise<ProductDto> {
    this.logger.log(`Attempting to delete product with ID: ${productId}`);
    const deletedProduct =
      await this.productService.deleteProductById(productId);
    this.logger.log(`Product deleted with ID: '${deletedProduct.id}'`);

    return fillDto(ProductDto, deletedProduct.toPOJO());
  }
}
