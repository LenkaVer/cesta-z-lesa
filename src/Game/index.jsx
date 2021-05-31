import React, { useEffect, useRef } from 'react';
import { useAuth } from './../Auth/AuthContext';
import { MainMap } from './components/MainMap';
import { Levels } from './components/Levels/';
import { Question } from './components/Question';
import { GameEnded } from './components/GameEnded';
import './style.css';

export const Game = () => {
  const gameRef = useRef();
  const { currentUser, currentUserData, updateUserData } = useAuth();

  useEffect(() => {
    if (currentUserData) {
      if (!currentUserData.currentGame) {
        currentUserData.currentGame = {
          levels: [],
          question: {
            active: false,
          },
          ended: false,
          hints: 3,
          lives: 3,
          points: 0,
        };

        updateUserData(currentUser.uid, currentUserData);
      }
    }
  }, [currentUserData, currentUser, updateUserData]);

  return (
    <>
      {currentUserData && currentUserData.currentGame ? (
        <div className="game" ref={gameRef}>
          <div
            className="user-stats"
            style={{ position: 'absolute', right: '20px', top: '20px' }}
          >
            <p> Počet bodů:{currentUserData.currentGame.points}</p>
            <p> Počet životů:{currentUserData.currentGame.lives}</p>
            <p>Počet nápověd: {currentUserData.currentGame.hints}</p>
          </div>
          <div className="game-inner">
            {currentUserData.currentGame.ended ? null : <MainMap />}
            {currentUserData.currentGame.ended ? (
              <GameEnded />
            ) : currentUserData.currentGame.question.active ? (
              <Question />
            ) : (
              <Levels gameRef={gameRef} />
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};
