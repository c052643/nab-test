import 'reflect-metadata';
import ProductService from './services/products';
import CategoryService from './services/categories';
import Product from './repositories/Product';
import Category from './repositories/Category';
import { DOMAINS, TYPES } from './constants';
import container from './container';
import './routes';
import { Container } from 'inversify';
import MongoDBClient from './database/MongoDBClient';
import { IDBClient } from './database';

export const iocInit = (): Container => {
  const dbClient = new MongoDBClient({ db: 'mongodb://localhost:27017/test' });
  container.bind<IDBClient>(TYPES.DbClient).toConstantValue(dbClient);

  container
    .bind<ProductService>(TYPES.Service)
    .to(ProductService)
    .whenTargetNamed(DOMAINS.Product);
  container
    .bind<CategoryService>(TYPES.Service)
    .to(CategoryService)
    .whenTargetNamed(DOMAINS.Category);
  container
    .bind<Product>(TYPES.Respository)
    .to(Product)
    .inSingletonScope()
    .whenTargetNamed(DOMAINS.Product);
  container
    .bind<Category>(TYPES.Respository)
    .to(Category)
    .inSingletonScope()
    .whenTargetNamed(DOMAINS.Category);

  return container;
};
