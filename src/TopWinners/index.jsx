import React, { useEffect, useState } from 'react';
import { db } from './../firebase';

import './style.css';

export const TopWinners = () => {
  const [topTenPlayers, setTopTenPlayers] = useState([]);
  useEffect(() => {
    db.collection('users')
      .where('bestScore', '>', 0)
      .orderBy('bestScore', 'desc')
      .limit(10)
      .get()
      .then((querySnapshot) => {
        setTopTenPlayers(
          querySnapshot.docs.map((doc) => {
            const data = doc.data();
            data.id = doc.id;
            return data;
          }),
        );
      });
  }, []);

  return (
    <div>
      <div className="top-winners">
        <h2>Nejlepší hráči</h2>
        <div className="winners">
          {topTenPlayers.map((player) => {
            return (
              <div key={player.id} className="winners__winner">
                {player.username} ({player.bestScore})
              </div>
            );
          })}
        </div>
        <div className="next">
          <button className="btn-winners btn-next">Pokračovat</button>
        </div>
      </div>
    </div>
  );
};
