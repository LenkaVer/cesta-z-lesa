import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './../Auth/AuthContext';
import { collection } from './../Game/questions';
import { Audio } from './../Game/components/Audio';
import mysteryImg from './Mystery.png';

export const Collection = () => {
  const { currentUserData } = useAuth();

  return currentUserData ? (
    <div>
      <h2> Kolekce </h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'space-around',
        }}
      >
        {collection.map((item, index) => {
          return currentUserData.rewards.some(
            (reward) =>
              reward.level === item.level && reward.index === item.index,
          ) ? (
            <div key={index}>
              <h5>{item.titulek}</h5>
              <Link to={`/collection-item/${item.level}/${item.index}`}>
                <div
                  style={{
                    width: '140px',
                    height: '100px',
                    backgroundImage: `url(${item.obrazek})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                  }}
                ></div>
              </Link>
            </div>
          ) : (
            <div
              style={{
                width: '140px',
                height: '100px',
                backgroundImage: `url(${mysteryImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
              }}
            ></div>
          );
        })}
      </div>
    </div>
  ) : null;
};
