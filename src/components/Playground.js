import React from "react";

import { useSelector } from 'react-redux';

const Playground = (props) => {

  const players = useSelector((state) => state.players.players);

  return (
    <>
      {players.map((player) => ( 
        <p>
          {player.last_name}
        </p>
      ))}
    </>
  );
};

export default Playground;
