import React from 'react';
import './style.css';

export const Credits = () => {
  return (
    <div className="credits">
      <h2>Zdroje</h2>
      <nav>
        <ul className="credits__menu">
          <h4 className="menu-first-title">Zvuky</h4>
          <li>
            <a
              className="link"
              href="https://www.nasiptaci.info/"
              rel="noreferrer"
              target="_blank"
            >
              Naši ptáci
            </a>
          </li>
          <li>
            <a
              className="link"
              href="https://www.myslivost.cz/"
              rel="noreferrer"
              target="_blank"
            >
              Myslivost
            </a>
          </li>

          <h4>Obrázky</h4>

          <li>
            <a
              className="link"
              href="https://pixabay.com/cs/"
              rel="noreferrer"
              target="_blank"
            >
              Pixabay
            </a>
          </li>
          <li>
            <a
              className="link"
              href="https://www.pexels.com/cs-cz/"
              rel="noreferrer"
              target="_blank"
            >
              Pexels
            </a>
          </li>
          <li>
            <a
              className="link"
              href="https://www.freepik.com/vectors/background"
              rel="noreferrer"
              target="_blank"
            >
              Background vector created by pikisuperstar - www.freepik.com
            </a>
          </li>

          <h4>Poděkování</h4>

          <li>
            Tato aplikace vznikla jako závěrečný projekt kurzu
            <a
              className="link"
              href="https://www.czechitas.cz/cs/co-delame/digitalni-akademie?gclid=CjwKCAiA_Kz-BRAJEiwAhJNY79ptnVPei7Vrul_F9mrCIZCNMdb8sAXjbKcxl0p0WucNaye0v72g-BoCWxgQAvD_BwE"
              rel="noreferrer"
              target="_blank"
            >
              Digitální akademie web, Czechitas
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
