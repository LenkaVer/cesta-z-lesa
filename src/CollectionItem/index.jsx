import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAuth } from './../Auth/AuthContext';
import { collection } from './../Game/questions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
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
      <button
        className="btn-navigation btn-navigation--collection"
        onClick={handleCollection}
      >
        <FontAwesomeIcon icon={faArrowCircleLeft} size="3x" />
      </button>
      <h3 className="collection-inner-title">{item.titulek}</h3>
      <div className="collection-inner">
        <div className="collection-inner__img">
          <img src={item.obrazek} alt={item.titulek} />
        </div>
        <div className="collection-inner__information">
          <p>{item.zajimavost}</p>
          <div style={{ width: '100%' }}>
            <Audio soubor={item.zvuk} />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
