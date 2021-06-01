import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

export const Home = () => {
  return (
    <>
      <div className="homepage">
        <h3>Vítej na stránce zábavně vzdělávací hry Lesní stezka.</h3>
        <div className="homepage-text">
          <p>
            Tvým úkolem je projít lesem a na jednotlivých stanovištích poznat
            zvíře podle zvuku. Při správné odpovědi se ti zobrazí obrázek
            zvířete a krátká zajímavost o něm.
          </p>
          <p>
            Hra je rozdělena na tři úrovně: lehká, střední a těžká. Ve hře bude
            k dispozici nápověda 50/50, která ti může pomoci zvíře uhádnout.
            Kolik nápověd máš k dipozici, je ovlivněno vybranou obížností. Za
            každou správnou odpověď získáš 10 bodů, při špatné odpovědi získáš 0
            bodů. Při využití nápovědy a správné odpovědi získáš 5 bodů, pokud i
            s nápovědou odpovíš špatně ztratíš 3 body.
          </p>
          <p>
            Na konci uvidíš přehled kolik bodů jsi za hru získal a jaké je tvoje
            umístění mezi ostatními hráči.
          </p>
        </div>

        <Link className=" btn" to="/game">
          Hra
        </Link>
      </div>
    </>
  );
};
