import { inject, injectable, named } from 'inversify';
import { DOMAINS, TYPES } from '../constants';
import { GenericRepository } from '../repositories/GenericRepository';
import { IProduct } from '../repositories/Product';
import BaseService from './BaseService';

@injectable()
export default class CategoryService extends BaseService<IProduct> {
  constructor(
    @inject(TYPES.Respository)
    @named(DOMAINS.Product)
    entity: GenericRepository<IProduct>,
  ) {
    super(entity);
  }
}
