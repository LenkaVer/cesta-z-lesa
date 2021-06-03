import React, { useEffect, useState } from 'react';
import { useAuth } from './../Auth/AuthContext';
import { db } from './../firebase';
import { Link } from 'react-router-dom';

import './style.css';

export const TopWinners = () => {
  const { currentUser } = useAuth();
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
            const playerClass =
              currentUser && currentUser.uid === player.id
                ? 'winners__winner winners__winner--current'
                : 'winners__winner';
            return (
              <div key={player.id} className={playerClass}>
                {player.username} ({player.bestScore})
              </div>
            );
          })}
        </div>
        <div className="next">
          <Link className="btn" to="/game">
            Hrát
          </Link>
        </div>
      </div>
    </div>
  );
};
