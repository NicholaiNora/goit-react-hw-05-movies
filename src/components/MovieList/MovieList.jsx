import { MovieListItems } from 'MovieListItems/MovieListItems';
import React from 'react';
import css from './MovieList.module.css';
import PropTypes from 'prop-types';

export const MovieList = ({ trendingMovies }) => {
  
  return (
    <ul className={css.movieList}>
      {trendingMovies.map(({ id, title }) => {
        return <MovieListItems key={id} id={id} title={title} />;
      })}
    </ul>
  );
}

MovieList.propTypes = {
  trendingMovies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
};