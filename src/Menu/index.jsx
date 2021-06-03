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
      history.push('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  const handleNewGame = () => {
    currentUserData.currentGame = null;
    updateUserData(currentUser.uid, currentUserData);
    props.setMenuActive(false);
    history.push('/game');
  };

  const handleCollection = () => {
    props.setMenuActive(false);
    history.push('/collection');
  };

  const handleTopWinners = () => {
    props.setMenuActive(false);
    history.push('/top-winners');
  };
  const handleRegistration = () => {
    props.setMenuActive(false);
    history.push('/signup');
  };

  const handleLogin = () => {
    props.setMenuActive(false);
    history.push('/login');
  };

  const handleSignupAnonymous = () => {
    props.setMenuActive(false);
    history.push('/signup-anonymous');
  };

  const handleCredits = () => {
    props.setMenuActive(false);
    history.push('/credits');
  };

  return (
    <nav className="navigation">
      {currentUser && currentUserData ? (
        <>
          <div className="username">
            {currentUserData.username} ({currentUserData.points})
          </div>
          <ul>
            <li>
              <button className="btn" onClick={handleCollection}>
                Kolekce
              </button>
            </li>
            <li>
              <button className="btn" onClick={handleNewGame}>
                Nová hra
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
        <ul>
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