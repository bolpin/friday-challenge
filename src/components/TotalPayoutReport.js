import React, { useState } from "react";
import axios from 'axios';
import './Report.css'

const TotalPayoutReport = () => {

  const BASE_URL = 'http://localhost:3000'

  const [minPlayerAge, setMinPlayerAge] = useState(14);
  const [maxPlayerAge, setMaxPlayerAge] = useState(150);
  const [totalPayout, setTotalPayout] = useState(null);
  const [payoutMinAge, setPayoutMinAge] = useState(14);
  const [payoutMaxAge, setPayoutMaxAge] = useState(150);

  const submitHandler = (event) => {
    event.preventDefault();

    axios.get(`${BASE_URL}/total_payout.json`, { params: {
      min_age: minPlayerAge,
      max_age: maxPlayerAge
    }
      }).then((response) => {
        console.log(response.data);
        setTotalPayout( +response.data[0].amount);
        setPayoutMinAge( +response.data[0].min_age);
        setPayoutMaxAge( +response.data[0].max_age);
      });
  };

  const minAgeChangedHandler = (event) => {
    setMinPlayerAge(event.target.value);
  }

  const maxAgeChangedHandler = (event) => {
    setMaxPlayerAge(event.target.value);
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
      {totalPayout !== null && 
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
    </div>
  );
};

export default TotalPayoutReport;