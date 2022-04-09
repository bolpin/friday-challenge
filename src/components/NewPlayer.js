import React from 'react';
import useInput from '../hooks/use-input';
import styles from './Form.module.css';

function NewPlayer(props) {

  const nameErrorMsg = "Name is too short."

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangedHandler,
    blurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput((name) => name.trim().length > 0);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangedHandler,
    blurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput((name) => name.trim().length > 0);

  const {
    value: birthdateValue,
    isValid: birthdateIsValid,
    hasError: birthdateHasError,
    valueChangeHandler: birthdateChangedHandler,
    blurHandler: birthdateBlurHandler,
    reset: resetBirthdate,
  } = useInput((dob) => new Date(dob) < new Date('2008-04-08'));

  const {
    value: genderIdValue,
    isValid: genderIdIsValid,
    hasError: genderIdHasError,
    valueChangeHandler: genderIdChangedHandler,
    blurHandler: genderIdBlurHandler,
    reset: resetGenderId,
  } = useInput((genderId) => true);

  const birthdateRef = useRef('');
  const genderRef = useRef('');

  const resetForm = () => {
    resetFirstName();
    resetLastName();
    resetBirthdate();
  }

  function submitHandler(event) {
    event.preventDefault();

    const player = {
      first_name: firstNameValue,
      last_name: lastNameValue,
      birthdate: birthdateValue,
      gender_id: genderIdValue,
    };

    props.onAddPlayer(player);
    resetForm();
  }

  return (
    <div className={styles.form}>
      <form onSubmit={submitHandler}>
        <div className={styles.form__controls}>

          <div className={styles.form__control}>
            <label>First name</label>
            <input
              type="text"
              value={firstNameValue}
              onChange={firstNameChangedHandler}
              onBlur={firstNameBlurHandler}
            />
            {firstNameHasError && <div className={styles.error}>
              {nameErrorMsg}
            </div>}
          </div>

          <div className={styles.form__control}>
            <label>Last name</label> 
            <input
              type="text"
              value={lastNameValue}
              onChange={lastNameChangedHandler}
              onBlur={lastNameBlurHandler}
            />
            {lastNameHasError && <div className={styles.error}>
              {nameErrorMsg}
            </div>}
          </div>

          <div className={styles.form__control}>
            <label>Gender</label>
            <select
              value={genderIdValue}
              onChange={genderIdChangedHandler}
              onBlur={genderIdBlurHandler}
              >
              <option value="1">Female</option>
              <option value="2">Male</option>
              <option value="3">Non-binary</option>
            </select>
            {genderIdHasError && <div className={styles.error}>
              Please select.
            </div>}
          </div>

          <div className={styles.form__control}>
            <label>Birthdate</label>
            <input
              type='date'
              value={birthdateValue}
              onChange={birthdateChangedHandler}
              onBlur={birthdateBlurHandler}
            />
            {birthdateHasError && <div className={styles.error}>
              Please select.
            </div>}
          </div>
        </div>

        <div className={styles.form__actions}>
          <button type='submit'>
            Add Player
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewPlayer;