import React, { useState, useEffect } from "react";

import PlayerList from "./PlayerList";
import NewPlayer from "./NewPlayer";
import styles from "./Players.module.css";

import { fetchPlayers, deletePlayer, createPlayer, updatePlayer } from '../../store/players-actions';
import { fetchGenders } from '../../store/genders-actions';
import { useDispatch, useSelector } from 'react-redux';


const Players = (props) => {

  const dispatch = useDispatch();
  const players = useSelector((state) => state.players.players);

  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchGenders());
  }, [dispatch]);


  function createPlayerHandler(player) {
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
        <NewPlayer onCreatePlayer={createPlayerHandler} />
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
