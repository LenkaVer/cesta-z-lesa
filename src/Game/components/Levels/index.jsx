import React, { useEffect } from 'react';
import { levels } from './levels';
import { Level } from './../Level';
import { useAuth } from './../../../Auth/AuthContext';
import smoothscroll from 'smoothscroll-polyfill';

export const Levels = (props) => {
  const { currentUserData } = useAuth();

  useEffect(() => {
    smoothscroll.polyfill();
    setTimeout(() => {
      props.gameRef.current.scroll({
        left:
          levels[
            currentUserData.currentGame.levels.length
          ].button.style.left.slice(0, -2) -
          props.gameRef.current.offsetWidth / 2 +
          35,
        behavior: 'smooth',
      });
    }, 10);
  }, [currentUserData.currentGame.levels.length, props.gameRef]);

  return (
    <>
      {levels.map((level, index) =>
        currentUserData.currentGame.levels.length >= index ? (
          <Level key={index} level={index} {...level} />
        ) : null,
      )}
    </>
  );
};
