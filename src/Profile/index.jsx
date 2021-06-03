import React, { useState } from 'react';
import { useAuth } from './../Auth/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { collection } from './../Game/questions';
import './style.css';

export const Profile = () => {
  const [error, setError] = useState('');
  const { currentUserData, currentUser, logout } = useAuth();
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
  const handleClick = () => {
    history.push('/collection');
  };

  return currentUserData ? (
    <div className="user-profile">
      {error && <div>{error}</div>}
      <table className="user-profile__table">
        <thead>
          <tr>
            <th colSpan="2">Profil</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Přezdívka</th>
            <td>{currentUserData.username}</td>
          </tr>
          {currentUser.email ? (
            <tr>
              <th>E-mail</th>
              <td>{currentUser.email}</td>
            </tr>
          ) : null}
          <tr>
            <th>Počet her</th>
            <td className="bold">
              {currentUserData.countLosses + currentUserData.countWins} (
              <span className="wins">{currentUserData.countWins}</span> /{' '}
              <span className="losses">{currentUserData.countLosses}</span>)
            </td>
          </tr>
          <tr className="clicable" onClick={handleClick}>
            <th>Počet zvířat v kolekci</th>
            <td>
              {currentUserData.rewards.length}/{collection.length}
            </td>
          </tr>
        </tbody>
      </table>
      {currentUser.email ? (
        <Link className="btn" to="/update-profile">
          Změnit heslo
        </Link>
      ) : null}
      <button className="btn" onClick={handleLogout}>
        Odhlásit se
      </button>
    </div>
  ) : null;
};
