import { ContextFunction } from 'apollo-server-core';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { DataSources as ApolloDataSources } from 'apollo-server-core/dist/graphqlOptions';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DataSources extends ApolloDataSources<BaseContext> {}

export interface BaseContext {
    now: Date;
}

export type Context = BaseContext & {
    dataSources: DataSources;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createContext: ContextFunction<ExpressContext, BaseContext> = (ctx) => {
    return {
        now: new Date(),
    };
};

export const createDataSources = (): DataSources => {
    return {};
};
