import React from 'react';
import Header from '../Header/Header';
import s from './MainLayout.module.scss';

interface IMainLayout {
  children: React.ReactNode;
}

const MainLayout: React.FC<IMainLayout> = ({ children }) => {
  return (
    <div className={s.root}>
      <div className={s.headerWrapper}>
        <Header />
      </div>
      <div className={s.contentWrapper}>
        {children}
      </div>
    </div>
  )
}

export default MainLayout