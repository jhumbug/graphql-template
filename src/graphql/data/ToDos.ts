import { RESTDataSource } from 'apollo-datasource-rest';

import { BaseContext } from '../context';
import { TO_DOS_BASE_URL } from '../../config';


// export enum CharacterStatus {
//     ALIVE = 'Alive',
//     DEAD = 'Dead'
// }

// export enum CharacterSpecies {
//     HUMAN = 'Human',
//     ALIEN = 'Alien'
// }

// export interface CharacterOrigin {
//     name: string;
//     url: string;
// }

// export interface CharacterResult {
//     id: number;
//     name: string;
//     status: CharacterStatus;
//     species: CharacterSpecies;
//     origin: CharacterOrigin;
//     image: string;
// }

// export interface LocationResult {
//     id: number;
//     name: string;
//     dimension: string;
// }


export default class ToDos extends RESTDataSource<BaseContext> {
    baseURL = TO_DOS_BASE_URL;

    async getToDos() {
        try {
            const resp = await this.get(`/`, undefined, {});

            return resp;
        } catch (error) {
            return;
        }
    }

    async getToDo(id: string) {
        if (!id) {
            return;
        }
        try {
            const resp = await this.get(`/${id}`, undefined, {});

            return resp;
        } catch (error) {
            return;
        }
    }
}
