import React from 'react';
import { useAuth } from './../../../Auth/AuthContext';

export const GameEnded = () => {
  const { currentUserData, currentUser, updateUserData } = useAuth();
  return (
    <div>
      <div className="ended">
        <h2>Hra skončila</h2>
      </div>

      <div className="next">
        <button className="btn-next">Pokračovat</button>
      </div>
    </div>
  );
};
