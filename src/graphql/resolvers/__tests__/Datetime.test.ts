import { gql, makeExecutableSchema } from 'apollo-server-express';
import { graphql } from 'graphql';

import { Datetime } from '../Datetime';

const JAN_1_2020_ISO = '2020-01-01T18:00:00.000Z';
const JAN_1_2020_MS = 1577901600000;

const typeDefs = gql`
    scalar Datetime
    type Query {
        date: Datetime
        dateString(value: Datetime!): Datetime
    }
`;

const resolvers = {
    Datetime,
    Query: {
        dateString(_: any, args: any) {
            return args.value;
        },
    },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

it('should serialize ms timestamps as ISO strings', async () => {
    const { data } = await graphql<{ date: string }>(
        schema,
        `
            query {
                date
            }
        `,
        { date: JAN_1_2020_MS }
    );
    expect(data?.date).toBe(JAN_1_2020_ISO);
});

it('should parse ms timestamps from client as ISO strings', async () => {
    const { data } = await graphql<{ dateString: string }>(
        schema,
        `
            query($value: Datetime!) {
                dateString(value: $value)
            }
        `,
        null,
        null,
        {
            value: JAN_1_2020_MS,
        }
    );
    expect(data?.dateString).toBe(JAN_1_2020_ISO);
});
