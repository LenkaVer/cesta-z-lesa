import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export const SetUser = () => {
  return (
    <>
      <div className="homepage-navigation">
        <div className="homepage-navigation__links">
          <Link className="btn btn-homepage" to="/signup">
            Registrovat se
          </Link>
          <Link className="btn btn-homepage" to="/login">
            Přihlásit se
          </Link>
          <Link className="btn btn-homepage" to="/signup-anonymous">
            Pokračovat bez registrace
          </Link>
        </div>
        <div className="homepage-navigation__explanation">
          <p>
            Registrovaní uživatelé si mohou na svém profilu zobrazit dosažené
            body za odehrané hry a mohou se k rozehrané hře vrátit z různých
            zařízení.
          </p>
          <p>
            Pokud správně uhodnou zvíře z nahrávky, získavají informace o
            zvířeti (obrázek a zajímavost) do své galerie, kterou si mohou na
            profilu prohlížet. Mouhou tak získat galerii 48 zvířat.
          </p>
        </div>
      </div>
    </>
  );
};
