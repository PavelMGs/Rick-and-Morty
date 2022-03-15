import React, { useState } from 'react';
import cn from 'classnames';
import Arrow from '../assets/arrow.svg';
import s from './InputSelect.module.scss';

interface IInputSelect {
  options: string[];
  className?: string;
  setValue: (option: string, fieldName: string) => void;
  value?: string;
  fieldName: string;
}

const InputSelect: React.FC<IInputSelect> = ({ options, className, setValue, value = '', fieldName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSetCurrent = (option: string) => {
    setValue(option, fieldName);
  }

  return (
    <div className={cn(s.root, className)} onClick={() => setIsOpen(!isOpen)}>
      <input value={value || ''} className={s.input} onChange={(e) => e.preventDefault()} placeholder={fieldName} />
      <div className={cn(s.trigger, { [s.isOpen]: isOpen })}>
        {/* <Arrow /> */}
      </div>
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
