import React from 'react';
import { useAuth } from './../../../Auth/AuthContext';
import { questions } from './../../questions';
import wrongAnswer from './Fail-cross.png';
import './style.css';

export const Answered = () => {
  const { currentUserData, currentUser, updateUserData } = useAuth();

  const handleClick = () => {
    if (currentUserData.currentGame.question.answered.correct) {
      if (currentUserData.currentGame.question.question.hintUsed) {
        currentUserData.currentGame.points += 5;
      } else {
        currentUserData.currentGame.points += 10;
      }
      if (
        !currentUserData.rewards.some((reward) => {
          return (
            reward.level === currentUserData.currentGame.levels.length &&
            reward.index === currentUserData.currentGame.question.question.index
          );
        })
      ) {
        currentUserData.rewards.push({
          level: currentUserData.currentGame.levels.length,
          index: currentUserData.currentGame.question.question.index,
        });
      }
    } else {
      currentUserData.currentGame.lives -= 1;

      if (currentUserData.currentGame.lives === 0) {
        currentUserData.currentGame.ended = true;
        currentUserData.currentGame.points = 0;
      }
    }

    currentUserData.currentGame.levels.push(
      currentUserData.currentGame.question.answered,
    );
    currentUserData.currentGame.question = {
      active: false,
      answered: null,
    };

    updateUserData(currentUser.uid, currentUserData);
  };

  const otazka =
    questions[currentUserData.currentGame.question.question.level][
      currentUserData.currentGame.question.question.index
    ];

  return (
    <div className="">
      {currentUserData.currentGame.question.answered.correct ? (
        <div className="answered-window-wrapper">
          Získals
          {currentUserData.currentGame.question.question.hintUsed ? 5 : 10} bodů
          <img
            src={otazka.odmena.obrazek}
            alt={currentUserData.currentGame.question.answered.odpoved}
          />
          <p>{otazka.odmena.zajimavost}</p>
        </div>
      ) : (
        <div className="answered-window-wrapper">
          <img src={wrongAnswer} alt={'Špatná odpověď'} />
        </div>
      )}
      <div className="next">
        <button className="btn-next" onClick={handleClick}>
          Pokračovat
        </button>
      </div>
    </div>
  );
};
