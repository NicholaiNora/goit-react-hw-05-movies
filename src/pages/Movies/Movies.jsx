import React, { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { fetchMovieByQuery } from 'services/API';
import { MovieList } from 'components/MovieList/MovieList';
import css from './Movies.module.css';

const Movies = () => {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [movieQuery, setMovieQuery] = useState('');
  const movieName = searchParams.get('q') ?? '';

  useEffect(() => {
    const getMovieByQuery = async () => {
      try {
        const fetchedMovieByQuery = await fetchMovieByQuery(movieName);
        setMovie(fetchedMovieByQuery);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getMovieByQuery();
  }, [movieName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (movieQuery !== '') {
      setSearchParams({ q: movieQuery });
    }

    setMovieQuery('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.inputWrapper}>
        <input
          type="text"
          value={movieQuery}
          onChange={e => setMovieQuery(e.target.value)}
          placeholder="Search movies..."
          name="movieName"
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <MovieList trendingMovies={movie} />
      )}

      <Outlet />
    </div>
  );
};

export default Movies;
