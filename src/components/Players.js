import React, { useState, useEffect } from "react";

import PlayerList from "./PlayerList";
import NewPlayer from "./NewPlayer";
import styles from './Players.module.css';
import useHttp from '../hooks/use-http';
import apiRoot from '../config';

const Players = (props) => {

  const [players, setPlayers] = useState([]);
  const { isLoadingPlayerList, fetchPlayersError, sendRequest: fetchPlayers } = useHttp();
  const { isLoadingNewPlayer, postNewPlayerError, sendRequest: postPlayer } = useHttp();
  const { isLoadingDeletePlayer, deleteNewPlayerError, sendRequest: deletePlayer } = useHttp();
  const { isLoadingUpdatePlayer, updateNewPlayerError, sendRequest: patchPlayer } = useHttp();

  useEffect(() => {
    const processFetchedPlayers = (fetchedPlayers) => {
      setPlayers(fetchedPlayers);
    };

    fetchPlayers(
      { url: `${apiRoot}/players.json` },
      processFetchedPlayers
    );
  }, [fetchPlayers]);

  function addPlayerHandler(player) {
    postPlayer(
      {
        url: `${apiRoot}/players.json`,
        method: "POST",
        body: {
          player: player
        },
        headers: {
          'Content-Type': 'application/json'
        }
      },
      (newPlayer) => {
        newPlayer.key = newPlayer.id;
        setPlayers(prevPlayers => [newPlayer, ...prevPlayers]);
      }
    );
  }
  
  function updatePlayerHandler(player) {
    const id = player.id;
    delete player.id;
    patchPlayer(
      {
        url: `${apiRoot}/players/${id}.json`,
        method: "PATCH",
        body: {
          player: player
        },
        headers: {
          'Content-Type': 'application/json'
        }
      },
      () => {}
    );
  }
  
  function deletePlayerHandler(player) {
    setPlayers(prevPlayers => prevPlayers.filter(
      p => p.id !== player.id
    ));

    deletePlayer(
      {
        url: `${apiRoot}/players/${player.id}.json`,
        method: "DELETE",
      },
      () => {}
    );
  }

  let newPlayerContent = ''
  if (isLoadingNewPlayer) {
    newPlayerContent = <p className={styles.fallback}>Loading...</p>
  }
  if (postNewPlayerError) {
    newPlayerContent = <p className={styles.error}>{postNewPlayerError}</p>
  }
  
  let playersContent = <p className={styles.fallback}>No players found.</p>
  if (isLoadingPlayerList) {
    playersContent = <p className={styles.fallback}>Loading...</p>
  }
  if (fetchPlayersError) {
    playersContent = <p className={styles.error}>{fetchPlayersError}</p>
  }
  if (!isLoadingPlayerList && players.length > 0) {
    playersContent =
      <PlayerList
        onDeletePlayer={deletePlayerHandler}
        onUpdatePlayer={updatePlayerHandler}
        items={players} />
  }
  return (
    <>
      <div className={styles.card}>
        <NewPlayer onAddPlayer={addPlayerHandler}/>
        {newPlayerContent}
        {playersContent}
      </div>
    </>
  );
};

export default Players;