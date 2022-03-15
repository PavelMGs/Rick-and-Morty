import cn from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.scss';

const Header = () => {
  return (
    <div className={s.root}>
      <nav className={s.nav}>
        <ul className={s.navList}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => cn(s.link, { [s.activeLink]: isActive })}
            >
              Characters
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/episodes"
              className={({ isActive }) => cn(s.link, { [s.activeLink]: isActive })}
            >
              Episodes
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header;