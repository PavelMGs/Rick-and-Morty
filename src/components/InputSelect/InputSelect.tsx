import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Arrow from '../assets/arrow.svg';
import s from './InputSelect.module.scss';

interface IInputSelect {
  options: string[];
  className?: string;
  setValue: (option: string | null, fieldName: string) => void;
  value?: string;
  fieldName: string;
}

const InputSelect: React.FC<IInputSelect> = ({ options, className, setValue, value = '', fieldName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSetCurrent = (option: string | null) => {
    setIsOpen(false);
    setValue(option, fieldName);
  }

  const closeOnClick = () => {
    setIsOpen(false);
    document.removeEventListener('click', closeOnClick);
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

  return (
    <div className={cn(s.root, className)}>
      <input
        value={value || ''}
        className={s.input}
        onChange={(e) => e.preventDefault()}
        placeholder={fieldName}
        onClick={() => setIsOpen(!isOpen)}
        readOnly
      />
      <button className={s.cross} onClick={() => handleSetCurrent(null)}>
        x
      </button>
      <ul className={cn(s.optionsList, { [s.isOpen]: isOpen })}>
        {options?.map((option) => (
          <li key={option}>
            <button onClick={() => handleSetCurrent(option)}>{option}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InputSelect;
