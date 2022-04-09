import React, { useState } from "react"
import styles from "./Player.module.css"

const Player = (props) => {

  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [genderId, setGenderId] = useState(props.gender.id);
  const [birthdate, setBirthdate] = useState(new Date(props.birthdate).toISOString().split('T')[0]);

  const [editing, setEditing] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  function ageInYears(bday) {
    const dob = new Date(bday);
    const now = new Date();
    const current_year = now.getFullYear();
    const year_diff = current_year - dob.getFullYear();
    const birthday_this_year = new Date(current_year, dob.getMonth(), dob.getDate());
    const has_had_birthday_this_year = (now >= birthday_this_year);

    return has_had_birthday_this_year
      ? year_diff
      : year_diff - 1;
  }

  const genderName = (id) => {
    if (id > 2) {
      return 'non-binary'
    }
    return id === 1 ? 'female' : 'male';
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const playerId = parseInt(event.target.dataset['playerId'])
    if (!isTouched) {
      return;
    }
    props.updatePlayer(
      {
        id: props.id,
        first_name: firstName,
        last_name: lastName,
        gender_id: genderId,
        birthdate: birthdate
      }
    )
    setEditing(prevEditState => !prevEditState);
  }

  const firstNameChangedHandler = (event) => {
    setIsTouched(true)
    setFirstName(event.target.value);
  }

  const lastNameChangedHandler = (event) => {
    setIsTouched(true)
    setLastName(event.target.value);
  }

  const genderIdChangedHandler = (event) => {
    setIsTouched(true)
    setGenderId(event.target.value);
  }

  const birthdateChangedHandler = (event) => {
    setIsTouched(true)
    setBirthdate(event.target.value);
  }

  const deletePlayerHandler = (event) => {
    const playerId = parseInt(event.target.dataset['playerId'])
    props.deletePlayer({id: playerId})
  }

  const editPlayerHandler = (event) => {
    setEditing(prevEditState => !prevEditState);

    let id = event.target.dataset['playerId']
    console.log(`editing...${id}`)
  }

  const reset = () => {
    setFirstName(props.firstName);
    setLastName(props.lastName);
    setGenderId(props.gender.id);
    setBirthdate(new Date(props.birthdate).toISOString().split('T')[0]);
  }

  const cancelEditHandler = (event) => {
    reset()
    setEditing(prevEditState => !prevEditState)
  }

  if (editing) {
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
              <button onClick={cancelEditHandler}>Cancel</button>
              <button type="submit">Save</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
  
  return(
    <li>
      <div className={styles.player}>
        <h2>
          {firstName} {lastName}
        </h2>
        <div className={styles.player__attribute}> 
          {genderName(genderId)}
        </div>
        <div className={styles.player__attribute}> 
          {ageInYears(birthdate)} years old
        </div>
        <button data-player-id={props.id} onClick={deletePlayerHandler}>Delete</button>
        <button data-player-id={props.id} onClick={editPlayerHandler}>Edit</button>
      </div>
    </li>
  );
};

export default Player;