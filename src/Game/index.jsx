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
        };

        updateUserData(currentUser.uid, currentUserData);
      }
    }
  }, [currentUserData, currentUser, updateUserData]);

  return (
    <>
      {currentUserData && currentUserData.currentGame ? (
        <div className="game" ref={gameRef}>
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
