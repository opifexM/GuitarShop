import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { Command } from 'commander';
import { Db } from 'mongodb';
import { connect } from 'mongoose';
import { GuitarStringType } from 'shared/type/guitar-string-type.enum';
import { GuitarType } from 'shared/type/guitar-type.enum';
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
      .version('1.0.0');

    this.program
      .command('generate <n> <connectionString>')
      .description('Generate test data and save to DB')
      .action(async (n: string, connectionString: string) => {
        const numberOfItems = parseInt(n, 10);
        this.logger.log(
          `Generating [${numberOfItems}] items in the database with connection string: '${connectionString}'`,
        );
        this.connectToDatabase(connectionString, numberOfItems);
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
    await this.setupAdminUser(db);
    await this.setupProducts(db, numberOfItems);
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

    for (let i = 0; i < numberOfItems; i++) {
      await productsCollection.insertOne({
        title: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        photoId: `catalog-product-${faker.number.int({ min: 0, max: 8 })}.png`,
        article: faker.string.uuid(),
        guitarStringType: faker.helpers.arrayElement(
          Object.values(GuitarStringType).filter(
            (value) => typeof value === 'number',
          ),
        ),
        guitarType: faker.helpers.arrayElement(Object.values(GuitarType)),
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
