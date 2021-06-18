import Joi from '@hapi/joi';

const PATH_REGEX = /^(\/\w+)+$/;

const schema = Joi.object({
    GRAPHQL_PATH: Joi.string().regex(PATH_REGEX).default('/graphql'),
    LOG_FORMAT: Joi.string().default('combined'),
    PORT: Joi.number().port().default(4000),
    REDIS_HOST: Joi.string().hostname().required(),
    REDIS_PORT: Joi.number().port().default(6379),
});

const { error, value } = schema.validate(process.env, { convert: true, stripUnknown: true });

if (error) {
    console.error(error.stack);
    process.exit(1);
}

//
// ─── CONFIG VALUES ──────────────────────────────────────────────────────────────
//

/**
 * The pathname to serve GraphQL requests
 */
export const GRAPHQL_PATH: string = value.GRAPHQL_PATH;

/**
 * The application health check pathname
 */
export const HEALTHCHECK = '/.well-known/apollo/server-health';

/**
 * The morgan log format
 */
export const LOG_FORMAT: string = value.LOG_FORMAT;

/**
 * The Redis cache hostname
 */
export const REDIS_HOST: string = value.REDIS_HOST;

/**
 * The Redis cache port
 */
export const REDIS_PORT: number = value.REDIS_PORT;

/**
 * The application port
 */
export const PORT: number = value.PORT;
