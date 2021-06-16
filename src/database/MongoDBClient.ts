import { IDataAccess } from './DataAccess';
import mongoose, { Model, Schema, SchemaDefinition } from 'mongoose';
import { IDBClient } from './DBClient';

type TInput = {
  db?: string;
};

export class MongoDBDataAccess<T> implements IDataAccess<T> {
  constructor(private mongoModel: Model<T>) {}
  save(doc: T): Promise<T> {
    return this.mongoModel.create(doc);
  }
  findAll(): Promise<T[]> {
    return this.mongoModel.find().then((data) => data as T[]);
  }
}

export default class MongoDBClient implements IDBClient {
  constructor({ db = '' }: TInput) {
    const connect = () => {
      mongoose.set('useCreateIndex', true);
      mongoose
        .connect(db, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          return console.info(`Successfully connected to db`);
        })
        .catch((error) => {
          console.error('Error connecting to database: ', error);
          return process.exit(1);
        });
    };
    connect();

    mongoose.connection.on('disconnected', connect);
  }
  defineModel<T>(
    name: string,
    schemaDefinition: SchemaDefinition,
  ): IDataAccess<T> {
    const schema = new Schema(schemaDefinition, { collection: name });
    return new MongoDBDataAccess<T>(mongoose.model<T>(name, schema));
  }
}
