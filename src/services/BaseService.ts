import { injectable } from 'inversify';
import { GenericRepository } from '../repositories/GenericRepository';

@injectable()
export default abstract class BaseService<T> {
  constructor(private entity: GenericRepository<T>) {}
  find(): Promise<T[]> {
    return this.entity.findAll();
  }
  create(input: T): Promise<T> {
    return this.entity.save(input);
  }
}
