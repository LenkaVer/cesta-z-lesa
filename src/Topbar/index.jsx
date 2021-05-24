import React, { useState } from 'react';
import { useAuth } from './../Auth/AuthContext';
import { useHistory } from 'react-router-dom';

export const Topbar = () => {
  const { currentUser, currentUserData, logout } = useAuth();
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
  return (
    <div>
      <h1>Zvířata</h1>
      {error ? <div>{error}</div> : null}
      {currentUser && currentUserData ? (
        <>
          <div>
            {currentUserData.username} ({currentUserData.points})
          </div>
          <button variant="link" onClick={handleLogout}>
            Odhlásit se
          </button>
        </>
      ) : null}
    </div>
  );
};
