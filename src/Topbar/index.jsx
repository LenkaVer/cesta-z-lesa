import React, { useState } from 'react';
import { useAuth } from './../Auth/AuthContext';
import { useHistory } from 'react-router-dom';

export const Topbar = () => {
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
  };

  return (
    <div className="base_form_wrapper">
      <h1 style={{ textAlign: 'center', color: '#1f6101' }}>Cesta z lesa</h1>
      {error ? <div>{error}</div> : null}
      {currentUser && currentUserData ? (
        <>
          <div>
            {currentUserData.username} ({currentUserData.points})
          </div>
          <div>
            <button variant="link" onClick={handleLogout}>
              Odhlásit se
            </button>
            <button onClick={handleNewGame}>Nová hra</button>
          </div>
        </>
      ) : null}
    </div>
  );
};
