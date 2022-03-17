import { Episodes } from '../types';
import { $episodes } from './episodes';
import { createStore, createEvent, sample } from './rootDomain';

export const filterList = createEvent<string>();

export const $searchList = createStore<string[]>([]);

const makeEpisodesString = (episodes: Episodes | null) => {
  let episodesString: string[] = [];

  if (episodes) {
    episodes.results.forEach((episode) => {
      const episodeString = `${episode.episode} - ${episode.name}`;
      episodesString.push(episodeString);
    });
  }

  return episodesString;
};

sample({
  clock: $episodes,
  fn: (episodes) => makeEpisodesString(episodes),
  target: $searchList,
});

sample({
  source: $episodes,
  clock: filterList,
  fn: (episodes, filter) => {
    const reg = new RegExp(filter, 'i')
    const newSearchList: string[] = [];
    episodes?.results.forEach((item) => {
      const episodeString = `${item.episode} - ${item.name}`;
      if (episodeString.match(reg)) {
        newSearchList.push(episodeString);
      }
    });
    return newSearchList;
  },
  target: $searchList
})
