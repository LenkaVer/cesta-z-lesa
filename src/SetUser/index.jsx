import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export const SetUser = () => {
  return (
    <>
      <div className="homepage-navigation">
        <div className="homepage-navigation__links">
          <Link className="btn btn-homepage" to="/registrace">
            Registrovat se
          </Link>
          <Link className="btn btn-homepage" to="/prihlaseni">
            Přihlásit se
          </Link>
          <Link className="btn btn-homepage" to="/anonymni-prihlaseni">
            Pokračovat bez registrace
          </Link>
        </div>
        <div className="homepage-navigation__explanation">
          <p>
            Registrovaní uživatelé se mohou k rozehrané hře vrátit z různých
            zařízení. Na svém účtu mají informace o odehraných hrách a uloženou
            svojí kolekci zvířat (při správné odpovědi se uloží informace o
            zvířeti do kolekce).
          </p>
          <p>
            Neregistrovaní uživatelé o tyto informace při odhlášení přijdou.
          </p>
        </div>
      </div>
    </>
  );
};
