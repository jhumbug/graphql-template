import { RESTDataSource } from 'apollo-datasource-rest';

import { BaseContext } from '../context';
import { RICK_AND_MORTY_BASE_URL } from '../../config';


export enum CharacterStatus {
    ALIVE = 'Alive',
    DEAD = 'Dead'
}

export enum CharacterSpecies {
    HUMAN = 'Human',
    ALIEN = 'Alien'
}

export interface CharacterOrigin {
    name: string;
    url: string;
}

export interface CharacterResult {
    id: number;
    name: string;
    status: CharacterStatus;
    species: CharacterSpecies;
    origin: CharacterOrigin;
    image: string;
}


export default class RickAndMorty extends RESTDataSource<BaseContext> {
    baseURL = RICK_AND_MORTY_BASE_URL;

    async getCharacter(id: number) {
        if (!id) {
            return;
        }
        try {
            const resp = await this.get(`/character/${id}`, undefined, {
                // cacheOptions: {
                //     ttl: ONE_DAY,
                // },
                // headers: {
                //     Authorization: `Bearer ${token}`,
                // },
            });

            return resp;
        } catch (error) {
            return;
        }
    }
}
