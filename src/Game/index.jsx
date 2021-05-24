import React from 'react';
import { useAuth } from './../Auth/AuthContext';

export const Game = () => {
  const { currentUser, currentUserData, updateUserData } = useAuth();

  const handleTestPlusUserPoints = () => {
    currentUserData.points += 1;
    updateUserData(currentUser.uid, currentUserData);
  };
  const handleTestMinusUserPoints = () => {
    currentUserData.points -= 1;
    updateUserData(currentUser.uid, currentUserData);
  };
  return (
    <>
      {currentUserData ? (
        <div>
          <h2>Hra</h2>
          Tady bude hra
          <button onClick={handleTestPlusUserPoints}>+</button>
          <button onClick={handleTestMinusUserPoints}>-</button>
        </div>
      ) : null}
    </>
  );
};
