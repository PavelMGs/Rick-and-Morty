import React from 'react';
import Cross from '../assets/cross.svg';
import { WatchStatus } from '../../types';
import cn from 'classnames';
import s from './WatchListItem.module.scss';

interface IWatchListItem {
  item: {
    name: string;
    status: WatchStatus;
  };
  setWatched: (name: string) => void;
  deleteItem: (name: string) => void;
}

const WatchListItem: React.FC<IWatchListItem> = ({ item, setWatched, deleteItem }) => {
  return (
    <div className={s.root}>
      <span className={cn({ [s.watched]: item.status === 'watched' })}>
        <input
          type="checkbox"
          name={item.name}
          id={item.name}
          disabled={item.status === 'watched'}
          onChange={() => setWatched(item.name)}
          checked={item.status === 'watched'}
        />
        {item.name}
      </span>
      <button onClick={() => deleteItem(item.name)}>
        <Cross />
      </button>
    </div>
  );
};

export default WatchListItem;
