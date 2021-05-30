import React, { useEffect } from 'react';
import { levels } from './levels';
import { Level } from './../Level';
import { useAuth } from './../../../Auth/AuthContext';

export const Levels = () => {
  const { currentUserData } = useAuth();

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
