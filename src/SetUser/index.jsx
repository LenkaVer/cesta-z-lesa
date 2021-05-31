import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export const SetUser = () => {
  return (
    <>
      <div className="homepage-navigation">
        <Link className="btn btn-homepage" to="/login">
          Přihlásit se
        </Link>
        <Link className="btn btn-homepage" to="/signup">
          Registrovat se
        </Link>
        <Link className="btn btn-homepage" to="/signup-anonymous">
          Pokračovat bez registrace
        </Link>
        <div className="explanation-user-setup">
          <p>
            Přihlášení uživatelé si mohou na svém profilu zobrazit dosažené body
            za odehrané hry a mohou se k rozehrané hře vrátit z různých
            zařízení.
          </p>
          <p>
            Pokud správně uhodnou zvíře z nahrávky, získavají informace o
            zvířeti (obrázek a zajímavost) do své galerie, kterou si mohou na
            profilu prohlížet. Mouhou tak získat galerii 48 zvířat.
          </p>
          <p></p>
        </div>
      </div>
    </>
  );
};
