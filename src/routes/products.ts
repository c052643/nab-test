import express from 'express';
import { DOMAINS, TYPES } from '../constants';
import { inject, named } from 'inversify';
import BaseService from '../services/BaseService';
import { IProduct } from '../repositories/Product';
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
  request,
  response,
} from 'inversify-express-utils';

@controller('/products')
export default class ProductController implements interfaces.Controller {
  @inject(TYPES.Service)
  @named(DOMAINS.Product)
  service!: BaseService<IProduct>;

  @httpGet('/')
  async getAll(): Promise<IProduct[]> {
    return this.service.find();
  }

  @httpPost('/')
  async create(
    @request() req: express.Request,
    @response() res: express.Response,
  ): Promise<express.Response> {
    try {
      const result = await this.service.create(req.body);
      return res.json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
