import React from 'react';
import { fetchTrendingMovies } from 'services/API';
import { useState, useEffect } from 'react';
import { MovieList } from 'components/MovieList/MovieList';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTrendingMovies = async () => {
    try {
      const fetchedMovies = await fetchTrendingMovies();
      setTrendingMovies(fetchedMovies);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 style={{fontWeight: 500, textAlign: 'center'}}>Trending Today</h1>
      <MovieList trendingMovies={trendingMovies} />
    </div>
  );
};

export default Home