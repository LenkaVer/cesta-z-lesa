import React from 'react';
import { useAuth } from './../../../Auth/AuthContext';
import { Answer } from './../Answer';
import { Answered } from './../Answered';
import { Audio } from './../Audio';
import { questions } from './../../questions';
import './style.css';

export const Question = () => {
  const { currentUserData, currentUser, updateUserData } = useAuth();

  const otazka =
    questions[currentUserData.currentGame.question.question.level][
      currentUserData.currentGame.question.question.index
    ];
  const handleClickHint = () => {
    currentUserData.currentGame.question.question.hintUsed = true;

    const newArray = [];
    const random = Math.floor(Math.random() * 3);
    let count = 0;
    currentUserData.currentGame.question.question.odpovedi.forEach(
      (odpoved) => {
        let disable = true;
        if (odpoved.spravne) {
          disable = false;
        } else {
          if (count === random) {
            disable = false;
          }
          count += 1;
        }
        odpoved.disabled = disable;
        newArray.push(odpoved);
      },
    );
    currentUserData.currentGame.question.question.odpovedi = newArray;

    updateUserData(currentUser.uid, currentUserData);
  };

  return currentUserData.currentGame.question.answered ? (
    <Answered />
  ) : (
    <div className="question">
      <div className="question-box question-box--question">
        <p>{otazka.otazka}</p>
        <Audio soubor={otazka.soubor} />
        <div
          style={{
            display: currentUserData.currentGame.question.question.hintUsed
              ? 'none'
              : 'block',
          }}
        >
          <button className="btn" onClick={handleClickHint}>
            Nápověda
          </button>
        </div>
      </div>
      <div className="question-box question-box--answer">
        <div className="answers">
          {currentUserData.currentGame.question.question.odpovedi.map(
            (answer, index) => {
              return <Answer key={index} {...answer} />;
            },
          )}
        </div>
      </div>
    </div>
  );
};
