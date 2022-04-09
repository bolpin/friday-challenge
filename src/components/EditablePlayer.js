import React, { useState, useEffect } from "react"
import axios from "axios";
import styles from "./EditablePlayer.module.css";

const EditablePlayer = (props) => {

  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [genderId, setGenderId] = useState(props.gender.id);
  const [birthdate, setBirthdate] = useState(new Date(props.birthdate).toISOString().split('T')[0]);

  const BASE_URL = 'http://localhost:3000';
  const submitHandler = (event) => {
    event.preventDefault();
    console.log("submitted!")
    axios.patch(`${BASE_URL}/players/${props.id}.json`, { 
      player: {
        first_name: firstName,
        last_name: lastName,
        gender_id: genderId,
        birthdate: birthdate
      }
    }).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log("ERROR")
      console.log(error.message)
    });
  }

  const firstNameChangedHandler = (event) => {
    setFirstName(event.target.value);
  }

  const lastNameChangedHandler = (event) => {
    setLastName(event.target.value);
  }

  const genderIdChangedHandler = (event) => {
    setGenderId(event.target.value);
  }

  const birthdateChangedHandler = (event) => {
    setBirthdate(event.target.value);
  }

  return(
    <div className={styles.player}>
      <form onSubmit={submitHandler}>
        <div className={styles.form__controls}>
          <div className={styles.form__control}>
            <input 
              type='text'
              value={firstName}
              onChange={firstNameChangedHandler}
            />
          </div>
          <div className={styles.form__control}>
            <input
              type='text'
              value={lastName}
              onChange={lastNameChangedHandler}
            />
          </div>
          <div className={styles.form__control}>
            <select
              value={genderId}
              onChange={genderIdChangedHandler} >
              <option value='1'>Female</option>
              <option value='2'>Male</option>
              <option value='3'>Non-binary</option>
            </select>
          </div>
          <div className={styles.form__control}>
            <input
              type='date'
              value={birthdate}
              onChange={birthdateChangedHandler}
              min='1920-01-01'
              max='2009-01-01'
            />
          </div>
          <div className={styles.form__actions}>
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditablePlayer;