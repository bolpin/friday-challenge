import React, { useState, useEffect } from "react";

import PlayerList from "./PlayerList";
import NewPlayer from "./NewPlayer";
import styles from "./Players.module.css";
import useHttp from "../hooks/use-http";
import { apiRoot } from "../config";


const Players = (props) => {
  const alphabeticalByName = (a, b) => {
    if (a.lastName === b.lastName) {
      return a.firstName > b.firstName;
    }
    return a.lastName > b.lastName;
  };

  const [players, setPlayers] = useState([]);

  const {
    isLoadingPlayerList,
    fetchPlayersError,
    sendRequest: fetchPlayers,
  } = useHttp();
  const {
    isLoadingNewPlayer,
    postPlayerError,
    sendRequest: postPlayer,
  } = useHttp();
  const {
    isLoadingDeletePlayer,
    deletePlayerError,
    sendRequest: deletePlayer,
  } = useHttp();
  const {
    isLoadingPatchPlayer,
    patchPlayerError,
    sendRequest: patchPlayer,
  } = useHttp();

  useEffect(() => {
    const processFetchedPlayers = (fetchedPlayers) => {
      setPlayers(fetchedPlayers.sort(alphabeticalByName));
    };

    fetchPlayers({ url: `${apiRoot}/players.json` }, processFetchedPlayers);
  }, [fetchPlayers]);

  function addPlayerHandler(player) {
    postPlayer(
      {
        url: `${apiRoot}/players.json`,
        method: "POST",
        body: {
          player: player,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      (newPlayer) => {
        newPlayer.key = newPlayer.id;
        setPlayers((prevPlayers) => [newPlayer, ...prevPlayers]);
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
          player: player,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      () => {}
    );
  }

  function deletePlayerHandler(player) {
    setPlayers((prevPlayers) => prevPlayers.filter((p) => p.id !== player.id));

    deletePlayer(
      {
        url: `${apiRoot}/players/${player.id}.json`,
        method: "DELETE",
      },
      () => {}
    );
  }

  let playersContent = <p className={styles.fallback}>No players found.</p>;

  if (
    isLoadingNewPlayer ||
    isLoadingDeletePlayer ||
    isLoadingPatchPlayer ||
    isLoadingPlayerList
  ) {
    playersContent = <p className={styles.fallback}>Loading...</p>;
  }
  if (
    fetchPlayersError ||
    postPlayerError ||
    deletePlayerError ||
    patchPlayerError
  ) {
    playersContent = (
      <p className={styles.error}>
        {fetchPlayersError}
        {postPlayerError}
        {deletePlayerError}
        {patchPlayerError}
      </p>
    );
  }

  if (!isLoadingPlayerList && players.length > 0) {
    playersContent = (
      <PlayerList
        onDeletePlayer={deletePlayerHandler}
        onUpdatePlayer={updatePlayerHandler}
        items={players}
      />
    );
  }
  return (
    <>
      <div className={styles.card}>
        <NewPlayer onAddPlayer={addPlayerHandler} />
        {playersContent}
      </div>
    </>
  );
};

export default Players;
