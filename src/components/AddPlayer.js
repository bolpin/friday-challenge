import React, { useRef } from 'react';

import classes from './AddPlayer.module.css';

function AddPlayer(props) {
  const firstNameRef = useRef('');
  const lastNameRef = useRef('');
  const birthdateRef = useRef('');
  const genderRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const player = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      birthdate: birthdateRef.current.value,
      gender_id: genderRef.current.value,
    };

    props.onAddPlayer(player);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='first-name'>First name</label>
        <input type='text' id='first-name' ref={firstNameRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='last-name'>Last name</label>
        <input type='text' id='last-name' ref={lastNameRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='birthdate'>Birthdate</label>
        <input type='date' id='birthdate' ref={birthdateRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='gender'>Gender</label>
        <input type='text' id='gender' ref={genderRef} />
      </div>
      <button>Add Player</button>
    </form>
  );
}

export default AddPlayer;