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
          key={i}
          icon={faHeart}
          style={{ color: 'red', marginLeft: '5px' }}
        />,
      );
    }
    for (let i = 0; i < currentUserData.currentGame.hints; i += 1) {
      hints.push(<FontAwesomeIcon key={i} icon={faEarlybirds} />);
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
            {currentUserData.username}
            <p>{lives}</p>
            <p>{hints}</p>
          </div>
          <div className="user-collection">
            <p>
              <FontAwesomeIcon icon={faTrophy} />
              {currentUserData.currentGame.points}
            </p>
            <p>
              <Link className="link" to="/collection">
                <FontAwesomeIcon icon={faArchive} />
                {currentUserData.rewards.length}/{questionsCount}
              </Link>
            </p>
          </div>
        </>
      ) : null}
    </>
  );
};
