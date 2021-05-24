import React from 'react';
import { Link } from 'react-router-dom';

export const SetUser = () => {
  return (
    <>
      <Link to="/login">Přihlásit se</Link>
      <Link to="/signup">Registrovat se</Link>
      <Link to="/signup-anonymous">Pokračovat bez registrace</Link>
    </>
  );
};
