import { createEvent, guard, sample } from "./rootDomain";
import { Episodes } from "../types";
import API from "./api";
import { createEffect, createStore } from "./rootDomain";

const getNextPage = createEvent<Episodes | null>();

export const getEpisodesFx = createEffect(async (endpoint = '/episode') => API.get({ endpoint }));

export const $episodes = createStore<Episodes | null>(null)
  .on(getEpisodesFx.doneData, (state, episodes) => ({
      info: episodes.info,
      results: state?.results ? state.results.concat(episodes.results) : episodes.results
}));

guard({
  clock: $episodes,
  filter: (episodes) => episodes?.info.next !== null,
  target: getNextPage,
})

sample({
  clock: getNextPage,
  fn: (episodes) => episodes?.info.next,
  target: getEpisodesFx,
})