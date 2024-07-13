import React, { useEffect, useState, Suspense } from 'react';
import { useParams, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { fetchMovieDetails } from 'services/API';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const location = useLocation();

  const prevLocation = location.state?.from;
  const goBack = location.state?.from ?? '/movies';

  useEffect(() => {
    const movieDetail = async () => {
      try {
        const fetchedMovieDetails = await fetchMovieDetails(movieId);
        setMovieDetails(fetchedMovieDetails);
        setLoading(false);
      } catch (error) {
        console.log(error);
        navigate('*')
      }
    };

    movieDetail();
  }, [movieId, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Link to={goBack} className={css.goBackLink}>
        ⬅ Go Back
      </Link>

      <div className={css.movieDetailsContainer}>
        <img
          src={
            movieDetails.poster_path
              ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
              : `https://fakeimg.pl/600x400?text=No+Image+Available`
          }
          alt={movieDetails.title}
          className={css.image}
        />
        <div className={css.movieDetailsWrap}>
          <h1>{movieDetails.title}</h1>
          <h4>User score: {Math.round(movieDetails.vote_average * 10)}%</h4>
          <h2>Overview</h2>
          <p>{movieDetails.overview}</p>
          <h2>Genres</h2>
          <p>
            {movieDetails.genres.map(genre => (
              <span key={genre.id}> {genre.name}</span>
            ))}
          </p>
        </div>
      </div>
      <div className={css.addInfo}>
        <h3>Additional information</h3>
        <ul className={css.linkList}>
          <li>
            <Link to="cast" className={css.link} state={{ from: prevLocation }}>
              Cast
            </Link>
          </li>
          <li>
            <Link
              to="reviews"
              className={css.link}
              state={{ from: prevLocation }}
            >
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
