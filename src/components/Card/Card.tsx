import React from 'react'
import { Character } from '../../types'
import s from './Card.module.scss';

type Props = {
  character: Character;
}

const Card: React.FC<Props> = ({ character }) => {
  const {
    name,
    image,
    origin,
    status,
    species,
    gender,
  } = character;
  return (
    <div className={s.root}>
      <div className={s.photoWrapper}>
        <img src={image} alt="" className={s.photo} />
      </div>
      <div className={s.infoWrapper}>
        <span><b>id:</b> {name}</span>
        <span><b>origin:</b> {origin.name}</span>
        <span><b>status:</b> {status}</span>
        <span><b>species:</b> {species}</span>
        <span><b>gender:</b> {gender}</span>
      </div>
    </div>
  )
}

export default Card;
