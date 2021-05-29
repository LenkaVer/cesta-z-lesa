import React, { useState } from 'react';
import { useAuth } from './../Auth/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export const Profile = () => {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
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
    <>
      <div className="base_form_wrapper">
        <div>
          <h2 className="text-center mb-4">Profil</h2>
          {error && <div>{error}</div>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile">Upravit profil</Link>
        </div>
        <div>
          <button variant="link" onClick={handleLogout}>
            Odhlásit se
          </button>
        </div>
      </div>
    </>
  );
};
