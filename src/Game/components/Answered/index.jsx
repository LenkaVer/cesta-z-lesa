import React from 'react';
import { useAuth } from './../../../Auth/AuthContext';
import { questions } from './../../questions';
import wrongAnswer from './Fail-cross.png';
import './style.css';

export const Answered = () => {
  const { currentUserData, currentUser, updateUserData } = useAuth();

  const handleClick = () => {
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
    <div>
      {currentUserData.currentGame.question.answered.correct ? (
        <div className="answered-window-wrapper">
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
