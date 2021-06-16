import { inject, injectable } from 'inversify';
import { v4 } from 'uuid';
import { TYPES } from '../constants';
import { GenericRepository } from './GenericRepository';
import { ICategories } from './Category';
import { IDBClient } from '../database/DBClient';

export interface IProduct {
  id?: string;
  name: string;
  categories: ICategories[];
}

@injectable()
export default class Product extends GenericRepository<IProduct> {
  constructor(@inject(TYPES.DbClient) dbClient: IDBClient) {
    super(dbClient, 'Products', {
      _id: { type: String, default: v4 },
      name: { type: String, required: true },
      categories: { type: [{ type: String, ref: 'Categories' }] },
    });
  }
}
