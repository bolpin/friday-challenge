import React, { useState, useEffect } from "react";

import PlayerList from "./PlayerList";
import NewPlayer from "./NewPlayer";
import styles from "./Players.module.css";

import { deletePlayer, createPlayer, updatePlayer } from '../store/players-actions';
import { useDispatch, useSelector } from 'react-redux';

const Players = (props) => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players.players);

  function addPlayerHandler(player) {
    dispatch(createPlayer(player));
  }

  function updatePlayerHandler(player) {
    dispatch(updatePlayer(player));
  }

  function deletePlayerHandler(player) {
    dispatch(deletePlayer(player.id));
  }

  return (
    <>
      <div className={styles.card}>
        <NewPlayer onAddPlayer={addPlayerHandler} />
        <PlayerList
          onDeletePlayer={deletePlayerHandler}
          onUpdatePlayer={updatePlayerHandler}
          players={players}
        />
      </div>
    </>
  );
};

export default Players;
