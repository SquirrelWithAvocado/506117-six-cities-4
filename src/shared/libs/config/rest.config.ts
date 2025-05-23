import { config } from 'dotenv';
import { Logger } from '../logger/index.js';
import { Config } from './config.interface.js';
import { configRestSchema, RestSchema } from './rest.schema.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.enum.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      logger.error(parsedOutput.error, 'Error occured when try parsing env file');
    } else {
      configRestSchema.load({});
      configRestSchema.validate({
        allowed: 'strict',
        output: this.logger.info
      });
      this.config = configRestSchema.getProperties();
      this.logger.info('.env file found and successfully parsed!');
    }
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
