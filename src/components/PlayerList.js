import React from "react";
import Player from "./Player"
import styles from './PlayerList.module.css'
// import Device from './Device.js'

function PlayerList(props) {

  return (
    <ul className={styles.list}>
      {props.items.map( (player) => (
        <Player
          key={player.id}
          id={player.id}
          firstName={player.first_name}
          lastName={player.last_name}
          birthdate={player.birthdate}
          gender={player.gender}
          deletePlayer={props.onDeletePlayer}
          updatePlayer={props.onUpdatePlayer}
        />
      ))}
    </ul>
  );
};

export default PlayerList;

