import fs from 'fs';
import path from 'path';

import { ApolloServer, gql } from 'apollo-server-express';
import { RedisCache } from 'apollo-server-cache-redis';
import { Router } from 'express';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import 'apollo-cache-control';

import { REDIS_HOST, REDIS_PORT, GRAPHQL_PATH } from '../config';
import { createContext, createDataSources } from './context';
import * as resolvers from './resolvers';

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');

export function createCache(): RedisCache {
    return new RedisCache({
        host: REDIS_HOST,
        port: REDIS_PORT,
    });
}

export function createGraphQLServer(): ApolloServer {
    const cache = createCache();

    return new ApolloServer({
        cache,
        cacheControl: {
            defaultMaxAge: 60,
        },
        context: createContext,
        dataSources: createDataSources,
        persistedQueries: { cache },
        resolvers,
        typeDefs: gql(typeDefs),
        plugins: [responseCachePlugin()],
    });
}

export function createGraphQLMiddleware(): Router {
    return createGraphQLServer().getMiddleware({ path: GRAPHQL_PATH });
}
