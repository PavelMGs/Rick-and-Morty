import React, { memo } from 'react'
import { useSearchParams } from 'react-router-dom';
import InputSelect from '../InputSelect/InputSelect';

import s from './Filter.module.scss';

const gender = ['male', 'female', 'genderless', 'unknown'];
const status = ['alive', 'dead', 'unknown'];
const species = ['human', 'alien', 'humanoid', 'mythological creature', 'cronenberg', 'animal', 'robot', 'unknown']

interface IFilter {
  setSearchParams: (value: string | null, fieldName: string) => void;
  searchParams: URLSearchParams;
}

const Filter: React.FC<IFilter> = ({ setSearchParams, searchParams }) => {

  return (
    <div className={s.root}>
      <InputSelect options={species} setValue={setSearchParams} fieldName="species" className={s.filter} value={searchParams.get('species') || ''} />
      <InputSelect options={status} setValue={setSearchParams} fieldName="status" className={s.filter} value={searchParams.get('status') || ''} />
      <InputSelect options={gender} setValue={setSearchParams} fieldName="gender" className={s.filter} value={searchParams.get('gender') || ''} />
    </div>
  )
}

export default memo(Filter);