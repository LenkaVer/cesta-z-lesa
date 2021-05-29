import React from 'react';
import { Link } from 'react-router-dom';

export const SetUser = () => {
  return (
    <>
      <div className="base_form_wrapper">
        <Link className="link" to="/login">
          Přihlásit se
        </Link>
        <Link className="link" to="/signup">
          Registrovat se
        </Link>
        <Link className="link" to="/signup-anonymous">
          Pokračovat bez registrace
        </Link>
      </div>
    </>
  );
};
