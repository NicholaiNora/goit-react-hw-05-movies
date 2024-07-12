import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Header.module.css';

export const Header = () => {
  return (
    <header className={css.header}>
      <nav>
        <ul className={css.navList}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? css.linkActive : css.link
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="movies"
              className={({ isActive }) =>
                isActive ? css.linkActive : css.link
              }
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
