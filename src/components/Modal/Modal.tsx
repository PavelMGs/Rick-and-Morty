import { useStore } from 'effector-react';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { $episodes } from '../../store/episodes';
import { Character } from '../../types';
import Cross from '../assets/cross.svg';
import { Episode } from '../../types';
import s from './Modal.module.scss';

interface IModal {
  character: Character;
  isOpen: boolean;
  close: () => void;
}

const Modal: React.FC<IModal> = ({ character, isOpen, close }) => {
  const { image, name, origin, status, species, gender, episode } = character;
  const episodes = useStore($episodes);
  const [episodesInfo, setEpisodesInfo] = useState<Episode[]>();

  useEffect(() => {
    if (episodes?.results) {
      const filteredEpisodes = episode.map((ep) => episodes.results[+ep.split('/').pop()! - 1]);
      setEpisodesInfo(filteredEpisodes);
      console.log(filteredEpisodes);
    }
  }, [episodes]);
  return ReactDOM.createPortal(
    <div className={s.root}>
      <div className={s.info}>
        <button onClick={close} className={s.cross}>
          <Cross />
        </button>
        <div className={s.mainInfo}>
          <img src={image} alt="photo is unavailable" className={s.photo} />
          <div className={s.infoWrapper}>
            <span>
              <b>id:</b> {name}
            </span>
            <span>
              <b>origin:</b> {origin.name}
            </span>
            <span>
              <b>status:</b> {status}
            </span>
            <span>
              <b>species:</b> {species}
            </span>
            <span>
              <b>gender:</b> {gender}
            </span>
          </div>
        </div>
        <div className={s.episodes}>
          <h3>Episodes</h3>
          <ul className={s.episodesList}>
            {episodesInfo &&
              episodesInfo?.map((ep) => (
                <li className={s.episodeItem} key={ep.id + 'profilekey'}>
                  {ep.id}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>,
    document!.getElementById('root')!,
  );
};

export default Modal;
