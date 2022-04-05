import React, { useState } from "react";
import axios from 'axios';
import './Report.css'

const DeviceCountReport = () => {

  const BASE_URL = 'http://localhost:3000'

  const [minOSVersion, setMinOSVersion] = useState('0.0.0');
  const [maxOSVersion, setMaxOSVersion] = useState('1.0.0');
  const [os, setOs] = useState('android');
  const [deviceCount, setDeviceCount] = useState(null);
  const [queryMinVers, setQueryMinVers] = useState(null);
  const [queryMaxVers, setQueryMaxVers] = useState(null);
  const [queryOs, setQueryOs] = useState(null);
  const [httpErrorMsg, setHttpErrorMsg] = useState(null);

  const minOSVersionChangedHandler = (event) => {
    setMinOSVersion(event.target.value);
  }

  const maxOSVersionChangedHandler = (event) => {
    setMaxOSVersion(event.target.value);
  }

  const osChangedHandler = (event) => {
    setOs(event.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    // curl -X GET http://localhost:3000/device_count.json -d 'min_vers=1.0.0&os=android&max_vers=2'
    axios.get(`${BASE_URL}/device_count.json`, { params: {
        os: os,
        min_vers: minOSVersion,
        max_vers: maxOSVersion
      }})
      .then((response) => {
        setDeviceCount( +response.data[0].count);
        setQueryMinVers( response.data[0].min_vers);
        setQueryMaxVers( response.data[0].max_vers);
        setQueryOs( response.data[0].os);
      })
      .catch(function (error) {
        if (error.response) {
          setHttpErrorMsg(`Error ${error.response.status} ${error.response.data}`)
        } else if (error.request) {
          setHttpErrorMsg(`Error ${error.request}`)
        } else {
          setHttpErrorMsg(`Error ${error.message}`)
        }
      });
  };

  return (
    <div className='report-form'>
      <form onSubmit={submitHandler}>
        <div className='report-form__controls'>
          <div className='report-form__control'>
            <label>OS</label>
            <select type="select" value={os} onChange={osChangedHandler}>
              <option value="android">Android</option>
              <option value="ios">iOS</option>
            </select>
          </div>
          <div className='report-form__control'>
            <label>Minimum player version</label>
            <input type="text" value={minOSVersion} onChange={minOSVersionChangedHandler}></input>
          </div>

          <div className='report-form__control'>
            <label>Maximum OS version</label>
            <input type="text" value={maxOSVersion} onChange={maxOSVersionChangedHandler}></input>
          </div>

          <div className='report-form__actions'>
            <button type='submit'>Get device count</button>
          </div>
        </div>
      </form>
      {httpErrorMsg !== null &&
          <p className='error'>
            {httpErrorMsg}
          </p>
      }
      {deviceCount !== null && 
        <>
          <p>
            Total number of {queryOs} devices from version {queryMinVers} to version {queryMaxVers}:
          </p>
          <h1>
            {deviceCount}
          </h1>
        </>
      }
    </div>
  );
};

export default DeviceCountReport;