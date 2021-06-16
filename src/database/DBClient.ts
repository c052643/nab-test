import { IDataAccess } from './DataAccess';

export interface IDBClient {
  defineModel<T>(name: string, modelDefinition: any): IDataAccess<T>;
}
