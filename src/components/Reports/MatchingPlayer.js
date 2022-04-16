import React, { useState } from "react";
import styles from "./MatchingPlayer.module.css";
import { useSelector } from 'react-redux';

const MatchingPlayer = (props) => {
  const genders = useSelector(state => state.genders.genders);

  const genderName = (genderId) => {
    const gender = genders.find(g => g.id == genderId);
    return gender ? gender.name : "Unknown"
  }

  return(
    <li>
      <div className={styles.player}>
        <h2>
          {props.firstName} {props.lastName}
        </h2>
        <div className={styles.player__attribute}> 
          {genderName(props.genderId)}
        </div>
        <div className={styles.player__attribute}> 
          {props.birthdate}
        </div>
      </div>
    </li>
  );
};

export default MatchingPlayer;