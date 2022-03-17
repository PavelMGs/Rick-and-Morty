import { WatchStatus } from '../types';
import { createEffect, createEvent, createStore, sample } from './rootDomain';

type WatchList = Record<string, WatchStatus>;

type SetToLocalStorageFx = {
  key: string;
  watchList: any;
};

export const setWatched = createEvent<string>();

export const deleteWatchItem = createEvent<string>();

export const addEpisode = createEvent<string>();

export const getWatchListFx = createEffect(async () => {
  return JSON.parse(localStorage.getItem('watchList') || '{ }');
});

const setToLocalStorageFx = createEffect<SetToLocalStorageFx, any>(async ({ key, watchList }) =>
  localStorage.setItem(key, JSON.stringify(watchList)),
);

export const $watchList = createStore<WatchList>(null)
  .on(getWatchListFx.doneData, (_, watchList) => watchList)
  .on(setToLocalStorageFx.done, (_, { params: { watchList } }) => watchList);

sample({
  source: $watchList,
  clock: addEpisode,
  fn: (watchList, episode) => ({ key: 'watchList', watchList: { ...watchList, [episode]: 'unwatched' } }),
  target: setToLocalStorageFx,
});

sample({
  source: $watchList,
  clock: setWatched,
  fn: (watchList, episode) => ({ key: 'watchList', watchList: { ...watchList, [episode]: 'watched' } }),
  target: setToLocalStorageFx,
});

sample({
  source: $watchList,
  clock: deleteWatchItem,
  fn: (watchList, episode) => {
    const newWatchList = { ...watchList };
    delete newWatchList[episode];
    return { key: 'watchList', watchList: newWatchList };
  },
  target: setToLocalStorageFx,
});
