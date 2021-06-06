import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import './style.css';

export const GoHome = () => {
  const history = useHistory();
  const location = useLocation();
  const [showGoHome, setShowGoHome] = useState(false);

  useEffect(() => {
    const pathToShow = [
      '/nastav-hrace',
      '/registrace',
      '/prihlaseni',
      '/registrace',
      '/prihlaseni',
      '/zapomenute-heslo',
      '/anonymni-prihlaseni',
      '/nejlepsi-hraci',
      '/zdroje',
      '/profil',
      '/uprava-profilu',
    ];
    if (pathToShow.includes(location.pathname)) {
      setShowGoHome(true);
    } else {
      setShowGoHome(false);
    }
  }, [location]);

  const handleGoHome = () => {
    history.push('/');
  };

  return showGoHome ? (
    <button
      className="btn-navigation btn-navigation--home"
      onClick={handleGoHome}
    >
      <FontAwesomeIcon icon={faHome} size="3x" />
    </button>
  ) : null;
};
