import React from 'react';
import { useAuth } from './../../../Auth/AuthContext';
import { Answer } from './../Answer';
import { Answered } from './../Answered';
import { Audio } from './../Audio';
import { questions } from './../../questions';
import './style.css';

export const Question = () => {
  const { currentUserData } = useAuth();

  const otazka =
    questions[currentUserData.currentGame.question.question.level][
      currentUserData.currentGame.question.question.index
    ];

  return currentUserData.currentGame.question.answered ? (
    <Answered />
  ) : (
    <div className="question">
      <div className="question-box question-box--question">
        <p>{otazka.otazka}</p>
        <Audio soubor={otazka.soubor} />
      </div>
      <div className="question-box question-box--answer">
        <div className="answer">
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
