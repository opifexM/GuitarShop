import { Logger } from '@nestjs/common';
import { ProductEntity } from './product.entity';

export class ProductFactory {
  private static readonly logger = new Logger(ProductFactory.name);

  public static createEntity(plainObject: any): ProductEntity {
    const plainObjectToLog = { ...plainObject };
    plainObjectToLog.password = '';

    this.logger.log(
      `Create product entity: '${JSON.stringify(plainObjectToLog)}'`,
    );
    return new ProductEntity(plainObject);
  }
}
