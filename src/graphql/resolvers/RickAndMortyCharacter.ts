import { GraphQLFieldResolver } from 'graphql';

import { Context } from '../context';


export const RickAndMortyCharacter: Record<string, GraphQLFieldResolver<any, Context>> = {
    name({ name }) {
        return name;
    },

    status({ status }) {
        return status;
    },

    species(data) {
        console.log(data)
        return data?.species;
    },

    origin({ origin }) {
        return origin;
    },

    image({ image }) {
        return image;
    }
};
