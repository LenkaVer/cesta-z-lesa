import React, { useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { useHistory } from 'react-router-dom';
import './style.css';

export const Menu = (props) => {
  const { currentUser, currentUserData, logout, updateUserData } = useAuth();
  const [error, setError] = useState('');
  const history = useHistory();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/prihlaseni');
    } catch {
      setError('Failed to log out');
    }
  }

  const handleNewGame = () => {
    currentUserData.currentGame = null;
    updateUserData(currentUser.uid, currentUserData);
    props.setMenuActive(false);
    history.push('/hra');
  };

  const handleGameContinue = () => {
    props.setMenuActive(false);
    history.push('/hra');
  };

  const handleProfile = () => {
    props.setMenuActive(false);
    history.push('/profil');
  };

  const handleCollection = () => {
    props.setMenuActive(false);
    history.push('/kolekce');
  };

  const handleTopWinners = () => {
    props.setMenuActive(false);
    history.push('/nejlepsi-hraci');
  };
  const handleRegistration = () => {
    props.setMenuActive(false);
    history.push('/registrace');
  };

  const handleLogin = () => {
    props.setMenuActive(false);
    history.push('/prihlaseni');
  };

  const handleSignupAnonymous = () => {
    props.setMenuActive(false);
    history.push('/anonymni-prihlaseni');
  };

  const handleCredits = () => {
    props.setMenuActive(false);
    history.push('/zdroje');
  };

  return (
    <nav className="navigation overflow">
      {currentUser && currentUserData ? (
        <>
          <h2 className="navigation__user">{currentUserData.username}</h2>
          <ul className="navigation__menu">
            {currentUserData.currentGame ? (
              <li>
                <button className="btn" onClick={handleGameContinue}>
                  Pokračovat ve hře
                </button>
              </li>
            ) : null}
            <li>
              <button className="btn" onClick={handleNewGame}>
                Nová hra
              </button>
            </li>
            <li>
              <button className="btn" onClick={handleCollection}>
                Kolekce
              </button>
            </li>
            <li>
              <button className="btn" onClick={handleProfile}>
                Profil
              </button>
            </li>
            <li>
              <button className="btn" onClick={handleTopWinners}>
                Nejlepší hráči
              </button>
            </li>
            <li>
              <button className="btn" onClick={handleCredits}>
                Zdroje
              </button>
            </li>
            <li>
              <button className="btn" onClick={handleLogout}>
                Odhlásit se
              </button>
            </li>
            {error && <div>{error}</div>}
          </ul>
        </>
      ) : (
        <ul className="navigation__menu">
          <li>
            <button className="btn" onClick={handleRegistration}>
              Registrovat se
            </button>
          </li>
          <li>
            <button className="btn" onClick={handleLogin}>
              Přihlásit se
            </button>
          </li>
          <li>
            <button className="btn" onClick={handleSignupAnonymous}>
              Pokračovat bez registrace
            </button>
          </li>
          <li>
            <button className="btn" onClick={handleTopWinners}>
              Nejlepší hráči
            </button>
          </li>
          <li>
            <button className="btn" onClick={handleCredits}>
              Zdroje
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};
