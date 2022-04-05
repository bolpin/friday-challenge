import React from "react";
import Player from "./Player"
import './PlayerList.css'

function PlayerList(props) {
  if (props.items.length === 0) {
    return <h2 className='player-list__fallback'>Found no players.</h2>;
  }

  function ageInYears (dobString) {
    const dob = new Date(dobString);
    const now = new Date();
    const current_year = now.getFullYear();
    const year_diff = current_year - dob.getFullYear();
    const birthday_this_year = new Date(current_year, dob.getMonth(), dob.getDate());
    const has_had_birthday_this_year = (now >= birthday_this_year);

    return has_had_birthday_this_year
        ? year_diff
        : year_diff - 1;
  }

  return (
    <>
      <ul className='player-list'>
        {props.items.map( (player) => (
          <Player
            key={player.id}
            first_name={player.first_name}
            last_name={player.last_name}
            age={ageInYears(player.birthdate)}
            gender={player.gender}
          />
        ))}
      </ul>
    </>
  );
};

export default PlayerList;

