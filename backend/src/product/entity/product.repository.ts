import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document, Model } from 'mongoose';
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
}
