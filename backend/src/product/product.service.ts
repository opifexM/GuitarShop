import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entity/product.entity';
import { ProductFactory } from './entity/product.factory';
import { ProductRepository } from './entity/product.repository';
import { PRODUCT_NOT_FOUND } from './product.constant';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private readonly productRepository: ProductRepository) {}

  public async createProduct(dto: CreateProductDto): Promise<ProductEntity> {
    const {
      title,
      description,
      photoId,
      guitarType,
      article,
      guitarStringType,
      price,
    } = dto;
    this.logger.log(`Attempting to create product with title: ${title}`);

    const productData = {
      title: title,
      description: description,
      postedAt: Date.now(),
      photoId: photoId,
      guitarType: guitarType,
      article: article,
      guitarStringType: guitarStringType,
      price: price,
    };

    const productEntity = ProductFactory.createEntity(productData);
    const createdProduct = await this.productRepository.save(productEntity);
    this.logger.log(`Product created with ID: '${createdProduct.id}'`);

    return createdProduct;
  }

  public async findProductById(productId: string): Promise<ProductEntity> {
    this.logger.log(`Looking for product with ID: '${productId}'`);
    const foundProduct = await this.productRepository.findById(productId);
    if (!foundProduct) {
      this.logger.warn(`Product not found with ID: '${productId}'`);
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }

    return foundProduct;
  }

  public async updateProductById(
    productId: string,
    dto: UpdateProductDto,
  ): Promise<ProductEntity> {
    this.logger.log(`Updating product with ID: '${productId}'`);
    const updatedProduct = await this.findProductById(productId);

    if (dto.title !== undefined) updatedProduct.title = dto.title;
    if (dto.description !== undefined)
      updatedProduct.description = dto.description;
    if (dto.photoId !== undefined) updatedProduct.photoId = dto.photoId;
    if (dto.guitarType !== undefined)
      updatedProduct.guitarType = dto.guitarType;
    if (dto.article !== undefined) updatedProduct.article = dto.article;
    if (dto.guitarStringType !== undefined)
      updatedProduct.guitarStringType = dto.guitarStringType;
    if (dto.price !== undefined) updatedProduct.price = dto.price;

    return this.productRepository.update(productId, updatedProduct);
  }

  public async deleteProductById(productId: string): Promise<ProductEntity> {
    this.logger.log(`Deleting product with ID: '${productId}'`);
    const foundProduct = await this.productRepository.findById(productId);
    if (!foundProduct) {
      this.logger.warn(`Product not found with ID: '${productId}'`);
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }

    const deletedProduct = await this.productRepository.deleteById(productId);
    this.logger.log(`Product with ID: '${productId}' deleted`);

    return deletedProduct;
  }

  public async exists(productId: string): Promise<boolean> {
    return this.productRepository.exists(productId);
  }
}
