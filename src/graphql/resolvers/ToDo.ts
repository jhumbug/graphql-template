// import { RickAndMortyCharacterResolvers } from '../__generated__/resolver-types';
import { GraphQLFieldResolver } from 'graphql';

import { Context } from '../context';

export const ToDo: Record<string, GraphQLFieldResolver<Record<string, any>, Context>> = {
    userId({ userId }) {
        return userId;
    },

    id({ id }) {
        return id;
    },

    title({ title }) {
        return title;
    },

    completed({ completed }) {
        return completed;
    }
};
