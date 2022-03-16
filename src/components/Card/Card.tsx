import React, { useState } from 'react';
import { Character } from '../../types';
import Modal from '../Modal/Modal';
import s from './Card.module.scss';

type Props = {
  character: Character;
};

const Card: React.FC<Props> = ({ character }) => {
  const { name, image, origin, status, species, gender } = character;
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  return (
    <>
      {isOpen && <Modal character={character} isOpen={isOpen} close={() => setIsOpen(false)} />}
      <div className={s.root} onClick={() => setIsOpen(true)}>
        <div className={s.photoWrapper}>
          <img src={image} alt="" className={s.photo} />
        </div>
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
    </>
  );
};

export default Card;
