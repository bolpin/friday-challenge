import React from 'react';
import useInput from '../../hooks/use-input';
import styles from '../Form.module.css';

function NewPlayer(props) {

  const nameTooShortMsg = "Name is too short."
  const requiredFieldMsg = "Required."
  const minAgeMsg = "Players must be 14 years old."
  
  const validateOldEnough = (dob) => {
    // leap-years not included, so could add three days for the approx.
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
  } = useInput(validateOldEnough);

  const {
    value: genderIdValue,
    isValid: genderIdIsValid,
    hasError: genderIdHasError,
    valueChangeHandler: genderIdChangedHandler,
    blurHandler: genderIdBlurHandler,
    reset: resetGenderId,
  } = useInput( genderId => genderId > 0 && genderId < 4);

  const resetForm = () => {
    resetFirstName();
    resetLastName();
    resetBirthdate();
    resetGenderId();
  }

  function submitHandler(event) {
    event.preventDefault();

    const player = {
      first_name: firstNameValue,
      last_name: lastNameValue,
      birthdate: birthdateValue,
      gender_id: genderIdValue,
    };

    props.onCreatePlayer(player);
    resetForm();
  }
  let formIsValid = false;

  if (firstNameIsValid &&
    lastNameIsValid &&
    genderIdIsValid &&
    birthdateIsValid) {
      formIsValid = true;
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
              {nameTooShortMsg}
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
              {nameTooShortMsg}
            </div>}
          </div>

          <div className={styles.form__control}>
            <label>Gender</label>
            <select
              value={genderIdValue}
              onChange={genderIdChangedHandler}
              onBlur={genderIdBlurHandler}
            >
              <option value="0">Select</option>
              <option value="1">Female</option>
              <option value="2">Male</option>
              <option value="3">Non-binary</option>
            </select>
            {genderIdHasError && <div className={styles.error}>
              {requiredFieldMsg}
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
              {minAgeMsg}
            </div>}
          </div>
        </div>

        <div className={styles.form__actions}>
          <button
            type='submit'
            disabled={!formIsValid}
          >
            Add Player
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewPlayer;