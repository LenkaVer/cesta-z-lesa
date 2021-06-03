import React, { useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { useHistory } from 'react-router-dom';

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

  return (
    <nav className="navigation">
      {currentUser && currentUserData ? (
        <>
          <div>
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
              <button className="btn" onClick={handleLogout}>
                Odhlásit se
              </button>
            </li>
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
            <button className="btn">Zdroje</button>
          </li>
        </ul>
      )}
    </nav>
  );
};
