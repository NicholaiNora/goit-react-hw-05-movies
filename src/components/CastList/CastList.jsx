import React, { useEffect, useState } from 'react';
import { fetchMovieCast } from 'services/API';
import { useParams } from 'react-router-dom';
import { CastListItem } from 'components/CastListItem/CastListItem';

const CastList = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        const fetchedMovieCast = await fetchMovieCast(movieId);
        setCast(fetchedMovieCast);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieCast();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {cast.length !== 0 ? (
        <div>
          <h2>Movie Cast</h2>
          <ul>
            {cast.map(({ id, profile_path, original_name, name }) => {
              return (
                <CastListItem
                  key={id}
                  profilePath={profile_path}
                  originalName={original_name}
                  name={name}
                />
              );
            })}
          </ul>
        </div>
      ) : (
        <div>We don't have any cast for this movie.</div>
      )}
    </>
  );
}

export default CastList;