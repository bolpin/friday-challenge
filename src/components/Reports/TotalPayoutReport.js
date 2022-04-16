import React, { useState, useEffect } from "react";
import styles from '../Form.module.css';
import useHttp from '../../hooks/use-http';
import useInput from '../../hooks/use-input';
import { apiRoot } from '../../config';


const TotalPayoutReport = () => {

  const requiredErrMsg = "Required.";
  
  const {
    value: minAgeValue,
    isValid: minAgeIsValid,
    hasError: minAgeHasError,
    valueChangeHandler: minAgeChangedHandler,
    blurHandler: minAgeBlurHandler,
    reset: resetMinAge,
  } = useInput(val => val > 0, 14);

  const {
    value: maxAgeValue,
    isValid: maxAgeIsValid,
    hasError: maxAgeHasError,
    valueChangeHandler: maxAgeChangedHandler,
    blurHandler: maxAgeBlurHandler,
    reset: resetMaxAge,
  } = useInput(val => val > 0, 99);

  const [totalPayout, setTotalPayout] = useState(null);
  const [payoutMinAge, setPayoutMinAge] = useState(14);
  const [payoutMaxAge, setPayoutMaxAge] = useState(99);

  const { isLoading, error, sendRequest: fetchPayout } = useHttp();

  const processPayoutResult = (payoutResult) => {
      setTotalPayout( +payoutResult[0].amount);
      setPayoutMinAge( +payoutResult[0].min_age);
      setPayoutMaxAge( +payoutResult[0].max_age);
    }

  let formIsValid = false;

  if (minAgeIsValid && maxAgeIsValid) {
    formIsValid = true;
  }

  const payoutRequestOptions = {
    url:`${apiRoot}/total_payout.json?min_age=${minAgeValue}&max_age=${maxAgeValue}`
  };

  // useEffect(() => {
  //   fetchPayout( payoutRequestOptions, processPayoutResult);
  // }, [fetchPayout]);


  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    fetchPayout( payoutRequestOptions, processPayoutResult);
  };


  let resultContent = <p>No payout.</p>

  if (totalPayout > 0) {
    resultContent = 
      <>
        Total payout for players aged {payoutMinAge}-{payoutMaxAge}:
        <h1>
          {(totalPayout / 100).toLocaleString("en-us", {
            style: "currency",
            currency: "USD"
          })} 
        </h1>
      </>
  }

  if (error) {
    resultContent = <p className='error'>{error}</p>
  }

  if (isLoading) {
    resultContent = <p>Loading...</p>
  }

  return (
    <div className={styles.form}>
      <form onSubmit={submitHandler}>
        <div className={styles.form__controls}>
          <div className={styles.form__control}>
            <label>Minimum player age</label>
            <input
              type="number"
              value={minAgeValue}
              min="14"
              max="120"
              onChange={minAgeChangedHandler}
              onBlur={minAgeBlurHandler}
            />
              { minAgeHasError && <div className={styles.error}>
                {requiredErrMsg}
              </div>}
          </div>

          <div className={styles.form__control}>
            <label>Maximum player age</label>
            <input
              type="number"
              min="14"
              max="120"
              value={maxAgeValue}
              onChange={maxAgeChangedHandler}
              onBlur={maxAgeBlurHandler}
            />
              { maxAgeHasError && <div className={styles.error}>
                {requiredErrMsg}
              </div>}
          </div>
        </div>

        <div className={styles.form__actions}>
          <button type='submit'
            disabled={!formIsValid}
          >
            Get total payout
          </button>
        </div>
      </form>
 
      {resultContent}
    </div>
  );
};

export default TotalPayoutReport;
