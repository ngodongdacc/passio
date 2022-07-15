import * as Joi from 'joi';
export const validationSchema = Joi.object({
  // App
  NODE_ENV: Joi.string().default('development'),
  APP_NAME: Joi.string().default('ocr_engine_v2'),
  APP_NAME_WORKER: Joi.string().default('worker_ocr_engine_v2'),
  PORT: Joi.number().default(3000),
  VERSION: Joi.string().default('1.0'),

  // Mongo
  DB_MONGO_URI: Joi.string().required(),
});
