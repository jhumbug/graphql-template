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

export interface LocationResult {
    id: number;
    name: string;
    dimension: string;
}


export default class RickAndMorty extends RESTDataSource<BaseContext> {
    baseURL = RICK_AND_MORTY_BASE_URL;

    async getCharacter(id: string) {
        if (!id) {
            return;
        }
        try {
            const resp: CharacterResult = await this.get(`/character/${id}`, undefined, {});

            return resp;
        } catch (error) {
            return;
        }
    }

    async getLocation(id: string) {
        if (!id) {
            return;
        }
        try {
            const resp: LocationResult = await this.get(`/location/${id}`, undefined, {});

            return resp;
        } catch (error) {
            return;
        }
    }
}
