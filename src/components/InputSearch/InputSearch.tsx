import React, { memo, useEffect, useState } from 'react';
import cn from 'classnames';
import Cross from '../assets/cross.svg';
import s from './InputSearch.module.scss';

interface IInputSearch {
  list: string[];
  className?: string;
  setFilterStr: (value: string) => void;
  submitValue: (value: string) => void;
}

const InputSearch: React.FC<IInputSearch> = ({ list, className = '', setFilterStr, submitValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const closeOnClick = () => {
    setIsOpen(false);
    document.removeEventListener('click', closeOnClick);
  }

  const handleOnChange = (text: string) => {
    setValue(text)
    setFilterStr(text);
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', closeOnClick)
    } else {
      document.removeEventListener('click', closeOnClick);
    }
    return () => {
      document.removeEventListener('click', closeOnClick);
    }
  }, [isOpen])

  const handleAddToList = () => {
    if (list.length === 1) {
      submitValue(list[0]);
    } else {
      setError('Choose an episode');
    }
  }

  return (
    <div className={cn(s.root, className)}>
      <input
        value={value || ''}
        className={s.input}
        onChange={(e) => handleOnChange(e.target.value)}
        placeholder='Type name or code of episode here'
        onClick={() => setIsOpen(!isOpen)}
        onFocus={() => setError('')}
      />
      <button className={s.cross} onClick={() => handleOnChange('')}>
        <Cross />
      </button>
      <ul className={cn(s.itemsList, { [s.isOpen]: isOpen })}>
        {list?.map((item) => (
          <li key={item + 'searchList'}>
            <button onClick={() => handleOnChange(item)}>{item}</button>
          </li>
        ))}
      </ul>
      <button className={s.submitButton} onClick={handleAddToList}>
        Add to list
      </button>
      {error && <span className={s.error}>{error}</span>}
    </div>
  );
}

export default memo(InputSearch);