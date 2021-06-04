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
    <div className="top-winners overflow">
      <table className="top-winners__table">
        <thead>
          <tr>
            <th colSpan="3">Nejlepší hráči</th>
          </tr>
          <tr>
            <th>Pořadí</th>
            <th>Přezdívka</th>
            <th>Počet bodů</th>
          </tr>
        </thead>
        <tbody>
          {topTenPlayers.map((player, index) => {
            const playerClass =
              currentUser && currentUser.uid === player.id
                ? 'winners__winner winners__winner--current'
                : 'winners__winner';
            return (
              <tr key={player.id} className={playerClass}>
                <td>{index + 1}.</td>
                <td>{player.username}</td>
                <td>{player.bestScore}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="next">
        <Link className="btn" to="/game">
          Hrát
        </Link>
      </div>
    </div>
  );
};
