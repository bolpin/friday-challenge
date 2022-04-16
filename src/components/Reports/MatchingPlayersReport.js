import React, { useEffect } from 'react';
import styles from '../Form.module.css';
import listStyles from './MatchingPlayersReport.module.css';
import MatchingPlayer from './MatchingPlayer'

import useInput from '../../hooks/use-input';

import { useSelector, useDispatch } from 'react-redux';
import { fetchMatchingPlayers } from '../../store/offer-targets-actions';
import { fetchOfferTargets } from '../../store/offer-targets-actions';


const MatchingPlayersReport = () => {

  const offerTargets = useSelector((state) => state.offerTargets.offerTargets);
  const matchingPlayers = useSelector((state) => state.offerTargets.matchingPlayers);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchOfferTargets());
  }, [dispatch]);

  const requiredErrMsg = "Required."

  const {
    value: offerTargetIdValue,
    isValid: offerTargetIdIsValid,
    hasError: offerTargetIdHasError,
    valueChangeHandler: offerTargetIdChangedHandler,
    blurHandler: offerTargetIdBlurHandler,
    reset: resetOfferTargetId,
  } = useInput(val => val !== '');

  let formIsValid = false;

  if (offerTargetIdIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    dispatch(fetchMatchingPlayers(offerTargetIdValue));
  };


  return (
    <>
      <div className={styles.form}>
        <form onSubmit={submitHandler}>
          <div className={styles.form__controls}>
            <div className={styles.form__control}>
              <label>Offer Target</label>
              <select
                value={offerTargetIdValue}
                onChange={offerTargetIdChangedHandler}
                onBlur={offerTargetIdBlurHandler}
              >
                <option value="">Select</option>
                {offerTargets.map((target) => (
                  <option
                    key={target["id"]}
                    value={target["id"]}
                  >
                    {target["id"]}
                  </option>
                ))}
              </select>
              {offerTargetIdHasError && <div className={styles.error}>
                {requiredErrMsg}
              </div>}
            </div>
          </div>
      
          <div className={styles.form__actions}>
            <button
              type='submit'
              disabled={!formIsValid}>
                Get Matching Players
            </button>
          </div>
        </form>

      </div>

      {matchingPlayers && matchingPlayers.length === 0 && <p>
        No matches found.</p>}
      <ul className={listStyles.list}>
        {matchingPlayers && matchingPlayers.map( player => (
          <MatchingPlayer
            key={player.id}
            id={player.id}
            firstName={player.first_name}
            lastName={player.last_name}
            birthdate={player.birthdate}
            genderId={player.gender.id}
          />
        ))}
      </ul>
    </>
  ) 
}

export default MatchingPlayersReport;