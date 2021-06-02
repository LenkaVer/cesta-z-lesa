import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

export const Home = () => {
  return (
    <>
      <div className="homepage">
        <h3 className="pre-title">Vítej na stránce zábavně vzdělávací hry</h3>
        <h1 className="title">Lesní stezka</h1>
        <div className="homepage-text">
          <p>
            Tvým úkolem je projít lesem a na jednotlivých stanovištích poznat
            zvíře podle zvuku.
          </p>
          <p>
            Při správné odpovědi se ti zobrazí obrázek zvířete a krátká
            zajímavost o něm.
          </p>

          <p>
            Ve hře budeš mít k dispozici tři nápovědy 50/50, které ti mohou
            pomoci zvíře uhádnout. Za každou správnou odpověď získáš 10 bodů,
            při použití nápovědy a správné odpovědi získáš za otázku 5 bodů. Při
            špatné odpovědi body nezískáš.
          </p>
          <p>
            Při úspěšném dokončení hry uvidíš na konci přehled, kolik bodů jsi
            za hru získal a jaké je tvoje umístění mezi ostatními hráči.
          </p>
        </div>

        <Link className=" btn" to="/game">
          Hra
        </Link>
      </div>
    </>
  );
};
