import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <>
      <div
        className="homepage"
        style={{ textAlign: 'center', marginTop: '5rem' }}
      >
        <div>Domovská stránka</div>
        <Link className="link" to="/game">
          Hra
        </Link>
      </div>
    </>
  );
};
