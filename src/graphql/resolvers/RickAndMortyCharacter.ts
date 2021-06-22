// import { RickAndMortyCharacterResolvers } from '../__generated__/resolver-types';
import { GraphQLFieldResolver } from 'graphql';

import { Context } from '../context';

export const RickAndMortyCharacter: Record<string, GraphQLFieldResolver<Record<string, any>, Context>> = {
    id({ id }) {
        return id;
    },

    name({ name }) {
        return name;
    },

    status({ status }) {
        return status;
    },

    species({ species }) {
        return species;
    },

    origin({ origin }) {
        return origin;
    },

    image({ image }) {
        return image;
    },

    async location(obj, _, { dataSources }) {
        if (obj?.location?.url) {
            const locationURLParts = obj.location.url.split('/');
            const locationID = locationURLParts[locationURLParts.length - 1];
            const location = await dataSources.rickAndMorty.getLocation(locationID)
            return location;
        }
    },
};
