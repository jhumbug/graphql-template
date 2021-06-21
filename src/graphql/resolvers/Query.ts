import { QueryResolvers } from '../__generated__/resolver-types';

export const Query: QueryResolvers = {
    // REPLACE_ME
    myField: () => 'hello',
    rickAndMorty(_, { id }, { dataSources }) {
        return dataSources.rickAndMorty.getCharacter(id);
    },
};
