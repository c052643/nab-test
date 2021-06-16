import { inject, injectable } from 'inversify';
import { v4 } from 'uuid';
import { TYPES } from '../constants';
import { IDBClient } from '../database/DBClient';
import { GenericRepository } from './GenericRepository';

export interface ICategories {
  id?: string;
  name: string;
}

@injectable()
export default class Category extends GenericRepository<ICategories> {
  constructor(@inject(TYPES.DbClient) dbClient: IDBClient) {
    super(dbClient, 'Categories', {
      _id: { type: String, default: v4 },
      name: { type: String, required: true },
    });
  }
}
