import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <>
      <div>Domovská stránka</div>
      <Link to="/game">Hra</Link>
    </>
  );
};
