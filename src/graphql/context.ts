import { ContextFunction } from 'apollo-server-core';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { DataSources as ApolloDataSources } from 'apollo-server-core/dist/graphqlOptions';

// REPLACE_ME
import RickAndMorty from './data/RickAndMorty';
import ToDos from './data/ToDos';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DataSources extends ApolloDataSources<BaseContext> {
    rickAndMorty: RickAndMorty;
    toDos: ToDos;
}

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

export const createDataSources = (): DataSources => ({
    rickAndMorty: new RickAndMorty(),
    toDos: new ToDos()
})
