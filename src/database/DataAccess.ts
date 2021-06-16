import { Repository } from '../repositories/GenericRepository';

export type IDataAccess<T> = Repository<T>;
