import { useEvent, useStore } from 'effector-react';
import React, { memo, useEffect } from 'react';
import SearchInput from '../../components/InputSearch/InputSearch';
import { $watchList, deleteWatchItem, getWatchListFx, setWatched } from '../../store/watchList';
import { $searchList, filterList } from '../../store/searchList';
import { addEpisode } from '../../store/watchList';
import WatchListItem from '../../components/WatchListItem/WatchListItem';

const WatchList = () => {
  const searchList = useStore($searchList);
  const watchList = useStore($watchList);
  const events = useEvent({ filterList, addEpisode, getWatchListFx, setWatched, deleteWatchItem });
  useEffect(() => {
    events.getWatchListFx();
  }, []);

  return (
    <div>
      <SearchInput list={searchList} setFilterStr={events.filterList} submitValue={events.addEpisode} />
      {watchList &&
        Object.entries(watchList).map(([name, status]) => (
          <WatchListItem
            key={name + 'watch-list-item'}
            item={{ name, status }}
            setWatched={events.setWatched}
            deleteItem={events.deleteWatchItem}
          />
        ))}
    </div>
  );
};

export default memo(WatchList);
