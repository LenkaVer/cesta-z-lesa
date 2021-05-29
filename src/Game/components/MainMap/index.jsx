import React from 'react';
import { useAuth } from './../../../Auth/AuthContext';
import Map from './../../../images/map.png';
import './style.css';

export const MainMap = () => {
  const { currentUserData } = useAuth();
  const style = {
    display: currentUserData.currentGame.question.active ? 'none' : 'block',
  };

  return (
    <img style={style} className="game-image main-map" src={Map} alt="mapa" />
  );
};
