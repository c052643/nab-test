import { injectable, unmanaged } from 'inversify';
import { IDataAccess } from '../database/DataAccess';
import { IDBClient } from '../database/DBClient';

export type Query<T> = {
  [P in keyof T]?: T[P] | { $regex: RegExp };
};

export interface Repository<T> {
  save(doc: T): Promise<T>;
  findAll(): Promise<T[]>;
}

@injectable()
export abstract class GenericRepository<T> implements Repository<T> {
  protected dataAccess: IDataAccess<T>;
  constructor(
    dbClient: IDBClient,
    @unmanaged() name: string,
    @unmanaged() schemaDefinition: any,
  ) {
    this.dataAccess = dbClient.defineModel(name, schemaDefinition);
  }
  save(doc: T): Promise<T> {
    return this.dataAccess.save(doc);
  }
  findAll(): Promise<T[]> {
    return this.dataAccess.findAll();
  }
}
