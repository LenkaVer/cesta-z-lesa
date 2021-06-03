import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './../Auth/AuthContext';
import { collection } from './../Game/questions';
import mysteryImg from './Mystery.png';
import './style.css';

export const Collection = () => {
  const { currentUserData } = useAuth();
  const history = useHistory();

  return currentUserData ? (
    <div className="collection">
      <h2 className="collection__title">
        Kolekce {currentUserData.rewards.length}/{collection.length}
      </h2>
      <div className="collection__items">
        {collection.map((item, index) => {
          return currentUserData.rewards.some(
            (reward) =>
              reward.level === item.level && reward.index === item.index,
          ) ? (
            <div
              className="collection-item collection-item--collected"
              key={index}
            >
              <div
                onClick={() =>
                  history.push(`/collection-item/${item.level}/${item.index}`)
                }
                className="collection-item__image"
                style={{ backgroundImage: `url(${item.obrazek})` }}
              >
                <h5 className="collection-item__title">{item.titulek}</h5>
              </div>
            </div>
          ) : (
            <div className="collection-item" key={index}>
              <div
                className="collection-item__image"
                style={{ backgroundImage: `url(${mysteryImg})` }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};
