import { GraphQLScalarType, Kind } from 'graphql';
import moment from 'moment';

import { DatetimeScalarConfig } from '../__generated__/resolver-types';

function parseDate(value: any) {
    if (value) {
        const date = moment(value);
        return date.isValid() ? date.toISOString() : null;
    } else {
        return null;
    }
}

export const Datetime = new GraphQLScalarType({
    name: 'Datetime',

    // value from the client
    parseValue: (value) => parseDate(value),

    // value sent to the client
    serialize: (value) => parseDate(value),

    parseLiteral: (ast) => {
        if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
            return parseDate(ast.value);
        } else {
            return null;
        }
    },
} as DatetimeScalarConfig);
