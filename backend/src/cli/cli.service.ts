import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { Command } from 'commander';
import { Db } from 'mongodb';
import { connect } from 'mongoose';
import { GuitarStringType } from 'shared/type/product/guitar-string-type.enum';
import { GuitarType } from 'shared/type/product/guitar-type.enum';
import { PRODUCT } from '../product/entity/product.constant';

const SALT_ROUNDS = 10;
const DEFAULT_ADMIN = 'admin';
const DEFAULT_PASSWORD = 'admin';
const DEFAULT_EMAIL = 'admin@example.com';

@Injectable()
export class CliService {
  private readonly program: Command;
  private readonly logger = new Logger(CliService.name);

  constructor() {
    this.program = new Command();
    this.setupCommands();
  }

  private setupCommands() {
    this.program
      .name('GuitarShopCli')
      .description('GuitarShop CLI generate utility')
      .passThroughOptions()
      .version('1.0.0');

    this.program
      .command('--generate')
      .alias('generate')
      .argument('<n>', 'Number of items to generate')
      .argument('<connectionString>', 'Database connection string')
      .description('Generate test data and save to DB')
      .action(async (n: string, connectionString: string) => {
        const numberOfItems = parseInt(n, 10);
        this.logger.log(
          `Generating [${numberOfItems}] items in the database with connection string: '${connectionString}'`,
        );
        await this.connectToDatabase(connectionString, numberOfItems);
      });

    this.program
      .command('help')
      .description('Display help information')
      .action(() => {
        this.logger.log('Displaying help information');
        this.program.outputHelp();
      });
  }

  private async connectToDatabase(
    connectionString: string,
    numberOfItems: number,
  ) {
    this.logger.log(`Connection to database '${connectionString}'...`);
    const mongoose = await connect(connectionString);
    const db: Db = mongoose.connection.db;
    await this.setupProducts(db, numberOfItems);
    await this.setupAdminUser(db);
    await mongoose.connection.close();
  }

  private async setupAdminUser(db: Db) {
    const usersCollection = db.collection('users');

    await usersCollection.insertOne({
      username: DEFAULT_ADMIN,
      password: hash(DEFAULT_PASSWORD, await genSalt(SALT_ROUNDS)),
      email: DEFAULT_EMAIL,
    });
  }

  private async setupProducts(db: Db, numberOfItems: number) {
    const productsCollection = db.collection('products');
    const validGuitarStringTypes: { [key in GuitarType]: GuitarStringType[] } =
      {
        [GuitarType.ACOUSTIC]: [
          GuitarStringType.SIX,
          GuitarStringType.SEVEN,
          GuitarStringType.TWELVE,
        ],
        [GuitarType.ELECTRO]: [
          GuitarStringType.FOUR,
          GuitarStringType.SIX,
          GuitarStringType.SEVEN,
        ],
        [GuitarType.UKULELE]: [GuitarStringType.FOUR],
      };

    for (let i = 0; i < numberOfItems; i++) {
      const guitarType = faker.helpers.arrayElement(
        Object.values(GuitarType),
      ) as GuitarType;
      const guitarStringType = faker.helpers.arrayElement(
        validGuitarStringTypes[guitarType],
      );

      await productsCollection.insertOne({
        title: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        photoId: `catalog-product-${faker.number.int({ min: 0, max: 8 })}.png`,
        article: faker.string.uuid(),
        guitarStringType,
        guitarType,
        postedAt: Date.now(),
        price: faker.number.int({
          min: PRODUCT.PRICE.MIN,
          max: PRODUCT.PRICE.MAX,
        }),
      });
    }
  }

  run() {
    this.logger.log('Running CLI Service');
    this.program.parse(process.argv);
  }
}
