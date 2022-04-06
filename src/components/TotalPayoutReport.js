import React, { useState } from "react";
import './Report.css'

const TotalPayoutReport = () => {

  const [minPlayerAge, setMinPlayerAge] = useState(14);
  const [maxPlayerAge, setMaxPlayerAge] = useState(150);
  const [totalPayout, setTotalPayout] = useState(null);
  const [payoutMinAge, setPayoutMinAge] = useState(14);
  const [payoutMaxAge, setPayoutMaxAge] = useState(150);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

  async function FetchTotalPayout() {
    setIsLoading(true);

    const BASE_URL = 'http://localhost:3000'
    
    try {
      const response = await fetch(`${BASE_URL}/total_payout.json?` +
        new URLSearchParams({ 
          min_age: minPlayerAge,
          max_age: maxPlayerAge
        }));

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const result = data[0];

      setTotalPayout( +result.amount);
      setPayoutMinAge( +result.min_age);
      setPayoutMaxAge( +result.max_age);
    } catch(ex) {
      console.log(ex)
      setError(ex.message)
    } finally {
      setIsLoading(false)
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();
    FetchTotalPayout();
  };

  const minAgeChangedHandler = (event) => {
    setMinPlayerAge(event.target.value);
  }

  const maxAgeChangedHandler = (event) => {
    setMaxPlayerAge(event.target.value);
  }

  let content = <p>No payout.</p>
  if (totalPayout > 0) {
    content = 
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
    content = <p>{error}</p>
  }
  if (isLoading) {
    content = <p>Loading...</p>
  }

  return (
    <div className='report-form'>
      <form onSubmit={submitHandler}>
        <div className='report-form__controls'>
          <div className='report-form__control'>
            <label>Minimum player age</label>
            <input type="number" value={minPlayerAge} onChange={minAgeChangedHandler}></input>
          </div>

          <div className='report-form__control'>
            <label>Maximum player age</label>
            <input type="number" value={maxPlayerAge} onChange={maxAgeChangedHandler}></input>
          </div>
        </div>

        <div className='report-form__controls'>
          <div className='report-form__control'>
            <button type='submit'>Get total payout</button>
          </div>
        </div>
      </form>
      { content }
    </div>
  );
};

export default TotalPayoutReport;