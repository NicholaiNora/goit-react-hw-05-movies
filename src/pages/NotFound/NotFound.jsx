import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }, [])

  return (
    <div>
      <h2>404 - Page Not Found</h2>
    </div>
  );
};

export default NotFound;
