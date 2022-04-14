import React, { useState, useEffect } from "react";
import styles from '../Form.module.css';
import useHttp from '../../hooks/use-http';

const TotalPayoutReport = () => {

  const [minPlayerAge, setMinPlayerAge] = useState(14);
  const [maxPlayerAge, setMaxPlayerAge] = useState(99);

  const [totalPayout, setTotalPayout] = useState(null);
  const [payoutMinAge, setPayoutMinAge] = useState(14);
  const [payoutMaxAge, setPayoutMaxAge] = useState(99);

  const { isLoading, error, sendRequest: fetchPayout } = useHttp();

  const processPayoutResult = (payoutResult) => {
      setTotalPayout( +payoutResult[0].amount);
      setPayoutMinAge( +payoutResult[0].min_age);
      setPayoutMaxAge( +payoutResult[0].max_age);
    }

  const payoutRequestOptions = {
    url:`http://localhost:3000/total_payout.json?min_age=${minPlayerAge}&max_age=${maxPlayerAge}`
  };

  useEffect(() => {
    fetchPayout( payoutRequestOptions, processPayoutResult);
  }, [fetchPayout]);

  const submitHandler = (event) => {
    event.preventDefault();
    fetchPayout( payoutRequestOptions, processPayoutResult);
  };

  const minAgeChangedHandler = (event) => {
    const newMinAge = event.target.value;
    setMinPlayerAge(newMinAge); 
  }

  const maxAgeChangedHandler = (event) => {
    const newMaxAge = event.target.value;
    setMaxPlayerAge(newMaxAge);
  }

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
              value={minPlayerAge}
              min="14"
              max="120"
              onChange={minAgeChangedHandler}
            />
          </div>

          <div className={styles.form__control}>
            <label>Maximum player age</label>
            <input
              type="number"
              min="14"
              max="120"
              value={maxPlayerAge}
              onChange={maxAgeChangedHandler}
            />
          </div>
        </div>
        <div className={styles.form__actions}>
          <button type='submit'>
            Get total payout
          </button>
        </div>
      </form>
 
      {resultContent}
    </div>
  );
};

export default TotalPayoutReport;
