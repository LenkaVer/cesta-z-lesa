import React from 'react';
import './style.css';

export const Credits = () => {
  return (
    <div className="credits">
      <h3>Zdroje</h3>
      <nav className="credits__menu">
        <h4>Zvuky</h4>
        <ul>
          <li>
            <a
              href="https://www.nasiptaci.info/"
              rel="noreferrer"
              target="_blank"
            >
              {' '}
              Naši ptáci
            </a>
          </li>
          <li>
            <a
              href="https://www.myslivost.cz/"
              rel="noreferrer"
              target="_blank"
            >
              {' '}
              Myslivost
            </a>
          </li>
        </ul>

        <h4>Obrázky</h4>
        <ul>
          <li>
            <a href="https://pixabay.com/cs/" rel="noreferrer" target="_blank">
              Pixabay
            </a>
          </li>
          <li>
            <a
              href="https://www.pexels.com/cs-cz/"
              rel="noreferrer"
              target="_blank"
            >
              {' '}
              Pexels
            </a>
          </li>
          <li>
            <a
              href="https://www.freepik.com/vectors/background"
              rel="noreferrer"
              target="_blank"
            >
              Background vector created by pikisuperstar - www.freepik.com
            </a>
          </li>
        </ul>
        <h4>Poděkování</h4>
        <ul>
          <li>
            <a href="https://czechitas.cz/cs/" rel="noreferrer" target="_blank">
              Czechitas
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
