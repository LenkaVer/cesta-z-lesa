import React, { useEffect, useRef } from 'react';
import { useAuth } from './../Auth/AuthContext';
import { MainMap } from './components/MainMap';
import { Levels } from './components/Levels/';
import { Question } from './components/Question';
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
            <MainMap />
            {currentUserData.currentGame.question.active ? (
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
