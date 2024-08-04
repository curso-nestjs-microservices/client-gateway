import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;

  PRODUCTS_MS_HOST: string;
  PRODUCTS_MS_PORT: number;

  ORDERS_MS_HOST: string;
  ORDERS_MS_PORT: number;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),

    PRODUCTS_MS_HOST: joi.string().required(),
    PRODUCTS_MS_PORT: joi.number().required(),

    ORDERS_MS_HOST: joi.string().required(),
    ORDERS_MS_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,

  productsHost: envVars.PRODUCTS_MS_HOST,
  productsPort: envVars.PRODUCTS_MS_PORT,

  ordersHost: envVars.ORDERS_MS_HOST,
  ordersPort: envVars.ORDERS_MS_PORT,
};
