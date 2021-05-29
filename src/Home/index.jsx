import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export const Home = () => {
  return (
    <>
      <div className="homepage">
        <div>Domovská stránka</div>
        <Link className="link" to="/game">
          Hra
        </Link>
      </div>
    </>
  );
};
