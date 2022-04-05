import React, { useState, useEffect } from "react";
import axios from 'axios';
import PlayerList from "./PlayerList"
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

  return (
    <>
      <Card className='players'>
        <PlayerList items={players} />
      </Card>
    </>
  );
};

export default Players;