// import { QueryResolvers } from '../__generated__/resolver-types';
import { GraphQLFieldResolver } from 'graphql';

import { Context } from '../context';

export const Query: Record<string, GraphQLFieldResolver<void, Context>> = {
    // REPLACE_ME
    myField: () => 'hello',
    rickAndMorty(_, { id }, { dataSources }) {
        if (id) {
            return dataSources.rickAndMorty.getCharacter(id);
        } else {
            return {}; // error
        }
    }
};
