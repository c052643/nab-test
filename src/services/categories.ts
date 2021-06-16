import { inject, injectable, named } from 'inversify';
import { DOMAINS, TYPES } from '../constants';
import { GenericRepository } from '../repositories/GenericRepository';
import { ICategories } from '../repositories/Category';
import BaseService from './BaseService';

@injectable()
export default class CategoryService extends BaseService<ICategories> {
  constructor(
    @inject(TYPES.Respository)
    @named(DOMAINS.Category)
    entity: GenericRepository<ICategories>,
  ) {
    super(entity);
  }
}
