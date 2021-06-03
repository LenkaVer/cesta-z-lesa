import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAuth } from './../Auth/AuthContext';
import { collection } from './../Game/questions';
import { Audio } from './../Game/components/Audio';
import './style.css';

export const CollectionItem = () => {
  const { currentUserData } = useAuth();
  const history = useHistory();
  const params = useParams();
  const level = Number(params.level);
  const index = Number(params.index);

  const [item, setItem] = useState();
  useEffect(() => {
    if (currentUserData) {
      const foundItem = collection.find((collectionItem) => {
        return collectionItem.level === level && collectionItem.index === index;
      });

      if (
        foundItem &&
        currentUserData.rewards.some(
          (reward) =>
            reward.level === foundItem.level &&
            reward.index === foundItem.index,
        )
      ) {
        setItem(foundItem);
      } else {
        history.push('/collection');
      }
    }
  }, [currentUserData, history, level, index]);

  const handleCollection = () => {
    history.push('/collection');
  };
  return item ? (
    <div>
      <button className="btn btn-back-collection" onClick={handleCollection}>
        Zpět do kolekce
      </button>
      <div className="collection-inner">
        <div className="collection-inner__animal">
          <h4 className="collection-inner__animal-title">{item.titulek}</h4>

          <div
            className="collection-inner__animal-img"
            style={{ backgroundImage: `url(${item.obrazek})` }}
          ></div>
        </div>
        <div>
          <p>{item.zajimavost}</p>
          <Audio soubor={item.zvuk} />
        </div>
      </div>
    </div>
  ) : null;
};
