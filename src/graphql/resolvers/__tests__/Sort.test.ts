import { gql, makeExecutableSchema } from 'apollo-server-express';
import { graphql } from 'graphql';

import { Sort } from '../Sort';

const typeDefs = gql`
    scalar Sort

    type Query {
        sort: Sort
        sortBy(field: String): Sort
    }
`;

const resolvers = {
    Sort,
    Query: {
        sortBy(_: any, args: any) {
            return args.field;
        },
    },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const SORT_QUERY = `
    query {
        sort
    }
`;

const SORT_BY_QUERY = `
    query($field: String!) {
        sortBy(field: $field)
    }
`;

it('should convert the input from client to fieldName:direction format', async () => {
    const { data } = await graphql<{ sortBy: string }>(schema, SORT_BY_QUERY, null, null, {
        field: 'episodeNumber',
    });

    expect(data?.sortBy).toBe('episodeNumber:asc');
});

it('should keep the original direction when input is in the proper fieldName:direction format', async () => {
    const { data } = await graphql<{ sortBy: string }>(schema, SORT_BY_QUERY, null, null, {
        field: 'episodeNumber:desc',
    });

    expect(data?.sortBy).toBe('episodeNumber:desc');
});

it('should return `null` when input is not a valid format', async () => {
    const { data } = await graphql<{ sortBy: string }>(schema, SORT_BY_QUERY, null, null, {
        field: 'episodeNumber:asdf',
    });

    expect(data?.sortBy).toBeNull();
});

it('should serialize the output string to fieldName:direction format', async () => {
    const { data } = await graphql<{ sort: string }>(schema, SORT_QUERY, {
        sort: 'title',
    });

    expect(data?.sort).toBe('title:asc');
});
