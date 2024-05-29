import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document, Model } from 'mongoose';
import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';
import { UserModel } from './user.schema';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(@InjectModel(UserModel.name) private model: Model<UserModel>) {}

  protected createEntityFromDocument(
    entityDocument: Document,
  ): UserEntity | null {
    if (!entityDocument) {
      return null;
    }

    const plainObject = entityDocument.toObject({
      versionKey: false,
    });

    return UserFactory.createEntity(plainObject);
  }

  public async save(entity: UserEntity): Promise<UserEntity> {
    const entityToLog = { ...entity };
    entityToLog.password = '';

    this.logger.log(`Saving new entity: ${JSON.stringify(entityToLog)}`);
    const newEntity = new this.model(entity.toPOJO());
    const savedEntity = await newEntity.save();
    newEntity.id = savedEntity.id;
    this.logger.log(`Entity saved with ID: '${savedEntity.id}'`);

    return this.createEntityFromDocument(newEntity);
  }

  public async findById(id: string): Promise<UserEntity | null> {
    this.logger.log(`Finding document by ID: '${id}'`);
    const foundDocument = await this.model.findById(new ObjectId(id));

    return this.createEntityFromDocument(foundDocument);
  }

  public async update(id: string, entity: UserEntity): Promise<UserEntity> {
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

  public async deleteById(id: string): Promise<UserEntity> {
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

  public async findByEmail(email: string): Promise<UserEntity | null> {
    this.logger.log(`Searching for user by email: ${email}`);
    const foundDocument = await this.model.findOne({ email: email });

    return this.createEntityFromDocument(foundDocument);
  }
}
