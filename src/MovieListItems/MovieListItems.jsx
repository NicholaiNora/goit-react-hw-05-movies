import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import css from './MovieListItems.module.css';
import { BsFire } from 'react-icons/bs';
import PropTypes from 'prop-types';

export const MovieListItems = ({ id, title }) => {
  const location = useLocation();
 
  return (
    <li className={css.movieItem} key={id}>
      <NavLink
        to={`/movies/${id}`}
        state={{ from: location }}
        className={css.movieLink}
      >
        {location?.pathname === '/' ? (
          <p>
            <BsFire />
            {title}
          </p>
        ) : (
          <p>{title}</p>
        )}
      </NavLink>
    </li>
  );
};

MovieListItems.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
