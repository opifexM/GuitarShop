import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document, Model } from 'mongoose';
import { PaginationResult } from 'shared/type/pagination.interface';
import { SortType } from 'shared/type/sort-type.enum';
import { ProductQuery } from '../product.query';
import { ProductEntity } from './product.entity';
import { ProductFactory } from './product.factory';
import { ProductModel } from './product.schema';

@Injectable()
export class ProductRepository {
  private readonly logger = new Logger(ProductRepository.name);

  constructor(
    @InjectModel(ProductModel.name) private model: Model<ProductModel>,
  ) {}

  protected createEntityFromDocument(
    entityDocument: Document,
  ): ProductEntity | null {
    if (!entityDocument) {
      return null;
    }

    const plainObject = entityDocument.toObject({
      versionKey: false,
    });

    return ProductFactory.createEntity(plainObject);
  }

  public async save(entity: ProductEntity): Promise<ProductEntity> {
    this.logger.log(`Saving new entity: ${JSON.stringify(entity)}`);
    const newEntity = new this.model(entity.toPOJO());
    const savedEntity = await newEntity.save();
    newEntity.id = savedEntity.id;
    this.logger.log(`Entity saved with ID: '${savedEntity.id}'`);

    return this.createEntityFromDocument(newEntity);
  }

  public async findById(id: string): Promise<ProductEntity | null> {
    this.logger.log(`Finding document by ID: '${id}'`);
    const foundDocument = await this.model.findById(new ObjectId(id));

    return this.createEntityFromDocument(foundDocument);
  }

  public async update(
    id: string,
    entity: ProductEntity,
  ): Promise<ProductEntity> {
    this.logger.log(`Updating entity by ID: '${id}'`);
    const updatedDocument = await this.model.findByIdAndUpdate(
      new ObjectId(id),
      entity.toPOJO(),
      { new: true },
    );
    if (!updatedDocument) {
      this.logger.error(`Entity not found for update: ID ${id}`);
      throw new NotFoundException(`Entity with id ${entity.id} not found`);
    }

    return this.createEntityFromDocument(updatedDocument);
  }

  public async deleteById(id: string): Promise<ProductEntity> {
    this.logger.log(`Deleting entity by ID: '${id}'`);
    const deletedDocument = await this.model.findByIdAndDelete(
      new ObjectId(id),
    );
    if (!deletedDocument) {
      this.logger.error(`Entity not found for deletion: ID ${id}`);
      throw new NotFoundException(`Entity with id ${id} not found.`);
    }

    return this.createEntityFromDocument(deletedDocument);
  }

  public async exists(id: string): Promise<boolean> {
    const result = await this.model.exists(new ObjectId(id));

    return !!result;
  }

  public async findAllByQuery({
    limit,
    page,
    sortDirection,
    sortType,
    guitarType,
    guitarStringType,
  }: ProductQuery): Promise<PaginationResult<ProductEntity>> {
    const sortCriteria: { [key: string]: 'asc' | 'desc' } = {};
    if (sortType === SortType.BY_PRICE) {
      sortCriteria['price'] = sortDirection;
    } else {
      sortCriteria['postedAt'] = sortDirection;
    }

    const filterCriteria: { [key: string]: any } = {};
    if (guitarType) {
      filterCriteria['guitarType'] = guitarType;
    }
    if (guitarStringType) {
      filterCriteria['guitarStringType'] = guitarStringType;
    }
    this.logger.log(
      `Retrieving products filterCriteria: '${JSON.stringify(filterCriteria)}', sortCriteria: '${JSON.stringify(sortCriteria)}'`,
    );

    const [products, productCount] = await Promise.all([
      this.model
        .find(filterCriteria)
        .sort(sortCriteria)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.model.countDocuments().exec(),
    ]);
    this.logger.log(`Retrieved [${products.length}] products`);

    return {
      entities: products.map((product) =>
        this.createEntityFromDocument(product),
      ),
      totalPages: Math.ceil(productCount / limit),
      currentPage: page,
      totalItems: productCount,
      itemsPerPage: limit,
    };
  }
}
