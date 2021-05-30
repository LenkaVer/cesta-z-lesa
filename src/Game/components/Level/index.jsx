import React from 'react';
import { useAuth } from './../../../Auth/AuthContext';
import tileImg from './assets/Tile.png';
import correctImg from './assets/C.png';
import questionImg from './assets/Q.png';
import wrongImg from './assets/W.png';
import homeImg from './assets/Home.png';
import { questions } from './../../questions';
import './style.css';

export const Level = (props) => {
  const { currentUser, currentUserData, updateUserData } = useAuth();

  const handleClick = () => {
    if (currentUserData.currentGame.levels.length !== questions.length) {
      const questionIndex = Math.floor(
        Math.random() * questions[props.level].length,
      );

      currentUserData.currentGame.question = {
        active: true,
        question: {
          level: props.level,
          index: questionIndex,
          otazka: questions[props.level][questionIndex].otazka,
          odpovedi: questions[props.level][questionIndex].odpovedi.sort(
            () => Math.random() - 0.5,
          ),
          answered: null,
          hintUsed: false,
        },
      };
      currentUserData.currentGame.question.question.odpovedi.forEach(
        (odpoved) => {
          odpoved.disabled = false;
        },
      );
    } else {
      currentUserData.currentGame.ended = true;
    }

    updateUserData(currentUser.uid, currentUserData);
  };
  return (
    <>
      <img
        style={{
          ...props.button.style,
          opacity:
            currentUserData.currentGame.levels.length === props.level
              ? '0'
              : '1',
          animation:
            currentUserData.currentGame.levels.length === props.level
              ? 'fadeIn 1s forwards'
              : null,
          animationDelay:
            currentUserData.currentGame.levels.length === props.level
              ? props.button.showDelay
              : null,
        }}
        className="game-image game-image--clickable"
        src={
          props.level < currentUserData.currentGame.levels.length
            ? currentUserData.currentGame.levels[props.level].correct
              ? correctImg
              : wrongImg
            : currentUserData.currentGame.levels.length === questions.length
            ? homeImg
            : questionImg
        }
        alt="map-road"
        onClick={
          currentUserData.currentGame.levels.length === props.level
            ? handleClick
            : null
        }
      />
      {props.tiles.map((tile, index) => {
        return (
          <img
            key={index}
            style={{
              ...tile.style,
              opacity:
                currentUserData.currentGame.levels.length === props.level
                  ? '0'
                  : '1',
              animation:
                currentUserData.currentGame.levels.length === props.level
                  ? 'fadeIn 1s forwards'
                  : null,
              animationDelay:
                currentUserData.currentGame.levels.length === props.level
                  ? tile.showDelay
                  : null,
            }}
            className="game-image game-image--tile"
            src={tileImg}
            alt="tile"
          />
        );
      })}
    </>
  );
};
