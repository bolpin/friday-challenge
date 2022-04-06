import React, { useState, useEffect } from "react";
import axios from 'axios';
import PlayerList from "./PlayerList"
import AddPlayer from "./AddPlayer"
import Card from "../UI/Card"
import './Players.css'

const Players = () => {

  const BASE_URL = 'http://localhost:3000'

  const DUMMY_PLAYERS = [
    {id:1,first_name:"Suz",last_name:"Who",birthdate: new Date(1980,3, 25),gender:
      {id:1,name:"female"},
    },
    {id:2,first_name:"Bev",last_name:"Who",birthdate: new Date(1980,3, 25),gender:
      {id:1,name:"female"},
    },
    {id:3,first_name:"Cindy-Lou",last_name:"Who",birthdate: new Date(1980,3, 25),gender:
      {id:1,name:"female"},
    }
  ];

  const [players, setPlayers] = useState(DUMMY_PLAYERS);

  useEffect(() => {
    axios.get(`${BASE_URL}/players.json`).then((response) => {
      setPlayers(response.data);
    });
  }, []);

  async function addPlayerHandler(player) {
    console.log(player);
    const response = await fetch(`${BASE_URL}/players.json`, {
      method: "POST",
      body: JSON.stringify({
        player: player
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <>
      <Card className='add-player'>
        <AddPlayer onAddPlayer={addPlayerHandler}/>
      </Card>
      <Card className='players'>
        <PlayerList items={players} />
      </Card>
    </>
  );
};

export default Players;