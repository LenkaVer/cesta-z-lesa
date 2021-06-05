import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './../Auth/AuthContext';
import { MainMap } from './components/MainMap';
import { Levels } from './components/Levels/';
import { Question } from './components/Question';
import { GameEnded } from './components/GameEnded';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faTrophy,
  faArchive,
} from '@fortawesome/free-solid-svg-icons';
import { faEarlybirds } from '@fortawesome/free-brands-svg-icons';
import { questions } from './questions';
import './style.css';

export const Game = () => {
  const gameRef = useRef();
  const { currentUser, currentUserData, updateUserData } = useAuth();
  const [questionsCount, setQuestionsCount] = useState(0);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    let count = 0;
    questions.forEach((level) => {
      count += level.length;
    });
    setQuestionsCount(count);
  }, []);

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
  const lives = [];
  const hints = [];
  if (currentUserData && currentUserData.currentGame) {
    for (let i = 0; i < currentUserData.currentGame.lives; i += 1) {
      lives.push(
        <FontAwesomeIcon
          className="game-icon game-icon--heart"
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          key={i}
          icon={faHeart}
        />,
      );
    }
    for (let i = 0; i < currentUserData.currentGame.hints; i += 1) {
      hints.push(
        <FontAwesomeIcon className="game-icon" key={i} icon={faEarlybirds} />,
      );
    }
  }
  return (
    <>
      {currentUserData && currentUserData.currentGame ? (
        <>
          <div className="game overflow" ref={gameRef}>
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

          <div className="user-stats">
            <p className="user-name">{currentUserData.username}</p>
            <p>
              {lives}
              {isShown ? <div>Životy</div> : null}
            </p>
            <p>{hints}</p>
          </div>
          <div className="user-collection">
            <p>
              <FontAwesomeIcon className="game-icon" icon={faTrophy} />
              {currentUserData.currentGame.points}
            </p>
            <p>
              <Link className="link link-collection" to="/collection">
                <FontAwesomeIcon className="game-icon" icon={faArchive} />
                {currentUserData.rewards.length}/{questionsCount}
              </Link>
            </p>
          </div>
        </>
      ) : null}
    </>
  );
};
