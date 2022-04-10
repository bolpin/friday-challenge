import React, { useState } from "react"
import styles from "./Player.module.css"
import useInput from "../hooks/use-input"

const Player = (props) => {

  const [editing, setEditing] = useState(false);

  const validateOldEnough = (dob) => {
    // we'll add three days for the approx.
    // number of leap years in 14 years
    const threeDays = 3 * 24 * 60 * 60 * 1000;

    const approx14YrsInMilliseconds = 14 * 365 * 24 * 60 * 60 * 1000 + threeDays;
    const ageInMilliseconds = new Date() - new Date(dob);
    return ageInMilliseconds > approx14YrsInMilliseconds;
  }

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangedHandler,
    blurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput((name) => name.trim().length > 0, props.firstName);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangedHandler,
    blurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput((name) => name.trim().length > 0, props.lastName);

  const {
    value: birthdateValue,
    isValid: birthdateIsValid,
    hasError: birthdateHasError,
    valueChangeHandler: birthdateChangedHandler,
    blurHandler: birthdateBlurHandler,
    reset: resetBirthdate,
  } = useInput(
    validateOldEnough,
    new Date(props.birthdate).toISOString().split('T')[0]
  );

  const {
    value: genderIdValue,
    isValid: genderIdIsValid,
    hasError: genderIdHasError,
    valueChangeHandler: genderIdChangedHandler,
    blurHandler: genderIdBlurHandler,
    reset: resetGenderId,
  } = useInput( (genderId) => genderId > 0 && genderId < 4, props.gender.id);

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

  const isFormValid = () => {
    return firstNameIsValid &&
      lastNameIsValid &&
      genderIdIsValid &&
      birthdateIsValid
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const playerId = parseInt(event.target.dataset['playerId'])
    if (!isFormValid) {
      return;
    }
    props.updatePlayer(
      {
        id: props.id,
        first_name: firstNameValue,
        last_name: lastNameValue,
        gender_id: genderIdValue,
        birthdate: birthdateValue
      }
    )
    setEditing(prevEditState => !prevEditState);
  }

  const genderName = (genderId) => {
    switch(`${genderId}`) {
      case '1': return 'female'
      case '2': return 'male'
      default: return 'non-binary'
    }
  }

  const deletePlayerHandler = (event) => {
    const playerId = parseInt(event.target.dataset['playerId'])
    props.deletePlayer({id: playerId})
  }

  const editPlayerHandler = (event) => {
    setEditing(prevEditState => !prevEditState);

    let id = event.target.dataset['playerId']
  }

  const cancelEditHandler = (event) => {
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
                value={firstNameValue}
                onChange={firstNameChangedHandler}
              />
            </div>
            <div className={styles.form__control}>
              <input
                type='text'
                value={lastNameValue}
                onChange={lastNameChangedHandler}
              />
            </div>
            <div className={styles.form__control}>
              <select
                value={genderIdValue}
                onChange={genderIdChangedHandler} >
                <option value='1'>Female</option>
                <option value='2'>Male</option>
                <option value='3'>Non-binary</option>
              </select>
            </div>
            <div className={styles.form__control}>
              <input
                type='date'
                value={birthdateValue}
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
          {firstNameValue} {lastNameValue}
        </h2>
        <div className={styles.player__attribute}> 
          {genderName(genderIdValue)}
        </div>
        <div className={styles.player__attribute}> 
          {ageInYears(birthdateValue)} years old
        </div>
        <button data-player-id={props.id} onClick={deletePlayerHandler}>Delete</button>
        <button data-player-id={props.id} onClick={editPlayerHandler}>Edit</button>
      </div>
    </li>
  );
};

export default Player;