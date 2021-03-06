import React, { useEffect, useState } from 'react';
import { useAuth } from './../../../Auth/AuthContext';
import { questions } from './../../questions';
import { useHistory } from 'react-router-dom';
import './style.css';

export const GameEnded = () => {
  const { currentUserData, currentUser, updateUserData } = useAuth();
  const [isWinning, setIsWinning] = useState(false);
  const [isBestScore, setIsBestScore] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setIsBestScore(
      currentUserData.currentGame.levels.length === questions.length &&
        currentUserData.currentGame.points > currentUserData.bestScore,
    );
    setIsWinning(
      currentUserData.currentGame.levels.length === questions.length,
    );
  }, [currentUserData]);
  const handleClick = () => {
    if (isBestScore) {
      currentUserData.bestScore = currentUserData.currentGame.points;
    }
    isWinning
      ? (currentUserData.countWins += 1)
      : (currentUserData.countLosses += 1);

    currentUserData.currentGame = null;
    updateUserData(currentUser.uid, currentUserData);
    history.push('/nejlepsi-hraci');
  };

  return (
    <div>
      <div className="ended">
        <h2>Hra skončila</h2>
        <p>{isWinning ? 'Vyhrál jsi' : 'Prohrál jsi'}</p>
        <p>Dosáhl jsi: {currentUserData.currentGame.points} bodů</p>
        <p>{isBestScore ? 'Je to tvoje nejlepší skóre' : null}</p>

        <div className="next">
          <button className="btn" onClick={handleClick}>
            Pokračovat
          </button>
        </div>
      </div>
    </div>
  );
};
