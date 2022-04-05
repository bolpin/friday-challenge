import React from "react"
import Card from "../UI/Card"
import "./Player.css"

const Player = (props) => {
  return(
    <li>
      <Card className='player'>
        <h2>
          {props.first_name} {props.last_name}
        </h2>
        <div className='player__gender'> 
          {props.gender.name}
        </div>
        <div className='player__age'> 
          {props.age} years old
        </div>
      </Card>
    </li>
  );
};

export default Player;