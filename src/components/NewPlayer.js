import React, { useRef } from 'react';

import styles from './AddPlayer.module.css';

function AddPlayer(props) {
  const firstNameRef = useRef('');
  const lastNameRef = useRef('');
  const birthdateRef = useRef('');
  const genderRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();

    const player = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      birthdate: birthdateRef.current.value,
      gender_id: genderRef.current.value,
    };

    props.onAddPlayer(player);
  }

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor='first-name'>First name</label>
          <input
            type='text'
            id='first-name'
            ref={firstNameRef}
            />
        </div>
        <div className={styles.control}>
          <label htmlFor='last-name'>Last name</label>
          <input
            type='text'
            id='last-name'
            ref={lastNameRef}
          />
        </div>
        <div className={styles.control}>
          <label htmlFor='birthdate'>Birthdate</label>
          <input
            type='date'
            id='birthdate'
            ref={birthdateRef}
          />
        </div>
        <div className={styles.control}>
          <label htmlFor='gender'>Gender</label>
          <select
            id='gender'
            ref={genderRef}>
            <option value="1">Female</option>
            <option value="2">Male</option>
            <option value="3">Non-binary</option>
          </select>
        </div>
      </div>
      <div className={styles.actions}>
        <button type='submit'>
          Add Player
        </button>
      </div>
    </form>
  );
}

export default AddPlayer;