import React from 'react';
import { useAuth } from './../../../Auth/AuthContext';
import './style.css';

export const Answer = (props) => {
  const { currentUserData, currentUser, updateUserData } = useAuth();

  const handleClick = () => {
    currentUserData.currentGame.question.answered = {
      correct: props.spravne,
      odpoved: props.nazev,
    };
    updateUserData(currentUser.uid, currentUserData);
  };

  return (
    <button
      onClick={handleClick}
      className="btn btn-answer"
      disabled={props.disabled}
    >
      {props.nazev}
    </button>
  );
};
