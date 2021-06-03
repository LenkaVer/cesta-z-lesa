import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAuth } from './../Auth/AuthContext';
import { collection } from './../Game/questions';
import { Audio } from './../Game/components/Audio';

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
  return item ? (
    <div>
      <h5>
        {item.level} {item.index} {item.titulek}
      </h5>

      <div
        style={{
          width: '140px',
          height: '100px',
          backgroundImage: `url(${item.obrazek})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      ></div>

      <p>{item.zajimavost}</p>
      <Audio soubor={item.zvuk} />
    </div>
  ) : null;
};
