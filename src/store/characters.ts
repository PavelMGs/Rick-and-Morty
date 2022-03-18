import { Character } from '../types';
import API from './api';
import { createEffect, createStore } from './rootDomain';

interface GetCharacters {
  searchParams?: string;
}

type Response = {
      info: {
        count: number;
        next: string | null;
        pages: number;
        prev: string | null;
      };
      results: Character[];
};

export const getCharactersFx = createEffect<GetCharacters, any, { error: string }>(async ({ searchParams }) =>
  API.get({ endpoint: 'character', query: `?${searchParams}` }),
);

export const $characters = createStore<Response | string>('No data here')
  .on(getCharactersFx.doneData, (_, characters) => characters)
  .on(getCharactersFx.failData, (_, fail) => fail.error);
