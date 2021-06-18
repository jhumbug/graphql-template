import express, { ErrorRequestHandler, RequestHandler } from 'express';
import morgan from 'morgan';

import { HEALTHCHECK, LOG_FORMAT } from './config';
import { createGraphQLMiddleware } from './graphql/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (): ErrorRequestHandler => (err, req, res, next) => {
    const statusCode = res.statusCode >= 400 ? res.statusCode : 500;
    res.sendStatus(statusCode);
};

const indexHandler = (): RequestHandler => {
    const { name, version } = require('../package.json');
    return async (req, res) =>
        res.json({
            timestamp: new Date().toISOString(),
            name,
            version,
        });
};

const notFoundHandler = (): RequestHandler => (req, res, next) => {
    res.status(404);
    next(new Error('Not found'));
};

export const createApp = (): express.Application => {
    const app = express();

    // App config
    app.set('trust proxy', true)
        .use(express.urlencoded({ extended: true }))
        .use(morgan(LOG_FORMAT, { skip: (req) => req.path === HEALTHCHECK }));

    // Routes
    app.get('/', indexHandler()) // index route
        .get('/_health', (req, res) => res.send('OK'))
        .use(createGraphQLMiddleware()) // handle graphql requests
        .use(notFoundHandler()) // handle 404
        .use(errorHandler()); // handle errors

    return app;
};
