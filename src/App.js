import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import './Player.css'
// import { useInput } from "../hooks"

const baseURL = "http://localhost:3000";

export default function App() {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/players/4.json`).then((response) => {
      setPlayer(response.data);
    });
  }, []);

  function updatePlayer(ev) {
    axios
      .put(`${baseURL}/players/4`, {
        first_name: player.first_name,
        last_name: player.last_name
      })
      .then((response) => {
        setPlayer(response.data);
      });
  }


  if (!player) return null;

  return (
    <>
      <div class='player'>
        <h1>{player.first_name} {player.last_name}</h1>
        <p>{player.birthdate}</p>
        <p>{player.gender.name}</p>
        <form onSubmit={updatePlayer}>
          <input
            value={player.first_name}
            onChange={event => setPlayer({...player, first_name: event.target.value})}
            type="text"
            placeholder='first name'
            required
          />
          <input
            value={player.last_name}
            onChange={event => setPlayer({...player, last_name: event.target.value})}
            type="text"
            placeholder='last name'
            required
          />
          <button type='submit' onClick={updatePlayer}>Update Player</button>
        </form>
      </div>
    </>
  );
}
