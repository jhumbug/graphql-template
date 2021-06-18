import { GraphQLScalarType, Kind } from 'graphql';

import { SortScalarConfig } from '../__generated__/resolver-types';

const SORT_STRING_REGEX = /^([a-zA-Z0-9._-]+)(:(asc|desc))?$/i; // parse fieldName:sortDirection

export enum SortDirection {
    ASC = 'asc',
    DESC = 'desc',
}

function parseSortString(str: any) {
    if (typeof str !== 'string' || !str) {
        return;
    }

    const match = str.match(SORT_STRING_REGEX);
    if (match) {
        const [, fieldName, , direction = SortDirection.ASC] = match;
        return [fieldName, direction.toLowerCase()].join(':');
    }
}

/**
 * Parses a string in the format of NAME or NAME:DIRECTION into NAME:DIRECTION or null.
 * Direction is one of "asc" or "desc", defaults to "asc" if no direction is provided.
 *
 * @example `"title"` => `"title:asc"`
 * @example `"title.raw:desc"` => `"title.raw:desc"`
 * @example `"episodeNumber:asdf"` => `null`
 */
export const Sort = new GraphQLScalarType({
    name: 'Sort',
    parseLiteral: (ast) => (ast.kind === Kind.STRING ? parseSortString(ast.value) : null),
    parseValue: (value) => parseSortString(value),
    serialize: (value) => parseSortString(value),
} as SortScalarConfig);
