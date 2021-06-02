import React, { useEffect, useState } from 'react';
import { useAuth } from './../Auth/AuthContext';
import { questions } from './../Game/questions';
import { Audio } from './../Game/components/Audio';
import mysteryImg from './Mystery.png';

export const Collection = () => {
  const { currentUserData } = useAuth();
  const [collectionItems, setColletionItems] = useState();

  useEffect(() => {
    const collection = [];
    questions.forEach((level, levelIndex) => {
      level.forEach((question, questionIndex) => {
        collection.push({
          titulek: question.odpovedi
            .filter((odpoved) => {
              return odpoved.spravne;
            })
            .pop().nazev,
          zajimavost: question.odmena.zajimavost,
          obrazek: question.odmena.obrazek,
          zvuk: question.soubor,
          level: levelIndex,
          index: questionIndex,
          show: currentUserData
            ? currentUserData.rewards.some((reward) => {
                return (
                  reward.level === levelIndex && reward.index === questionIndex
                );
              })
            : false,
        });
      });
    });
    setColletionItems(collection);
  }, [currentUserData]);

  return currentUserData ? (
    <div>
      <h2> Kolekce</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'space-around',
        }}
      >
        {collectionItems.map((item, index) => {
          return item.show ? (
            <div key={index}>
              <h5>
                {item.level} {item.index} {item.titulek}
              </h5>
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  backgroundImage: `url(${item.obrazek})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                }}
              >
                {/* <img style={{ width: '100px' }} src={item.obrazek} alt="" /> */}
              </div>
              <p>{item.zajimavost}</p>
              <Audio soubor={item.zvuk} />
            </div>
          ) : (
            <div
              style={{
                width: '100px',
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
