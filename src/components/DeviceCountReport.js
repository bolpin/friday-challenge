import React, { useState, useEffect, useCallback } from "react";
import './Report.css'

const DeviceCountReport = () => {

  const [minOSVersion, setMinOSVersion] = useState('0.0.0');
  const [maxOSVersion, setMaxOSVersion] = useState('1.0.0');
  const [os, setOs] = useState('android');
  const [deviceCount, setDeviceCount] = useState(0);
  const [queryMinVers, setQueryMinVers] = useState(null);
  const [queryMaxVers, setQueryMaxVers] = useState(null);
  const [queryOs, setQueryOs] = useState(null);
  const [httpErrorMsg, setHttpErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const minOSVersionChangedHandler = (event) => {
    setMinOSVersion(event.target.value);
  }

  const maxOSVersionChangedHandler = (event) => {
    setMaxOSVersion(event.target.value);
  }

  const osChangedHandler = (event) => {
    setOs(event.target.value);
  }

  const FetchDeviceCount = useCallback( async () => {
    setIsLoading(true);
    try {
      // curl -X GET http://localhost:3000/device_count.json -d 'min_vers=1.0.0&os=android&max_vers=2'
      const BASE_URL = 'http://localhost:3000'
      const response = await fetch(`${BASE_URL}/device_count.json?` + new URLSearchParams({
        os: os,
        min_vers: minOSVersion,
        max_vers: maxOSVersion
      }));
      const data = await response.json();

      const result = data[0]
      setDeviceCount( +result.count);
      setQueryMinVers(result.min_vers);
      setQueryMaxVers(result.max_vers);
      setQueryOs( result.os);
      } catch(ex) {
        console.log(ex)
      } finally {
        setIsLoading(false)
      }
  }, [os, minOSVersion, maxOSVersion]);

  const submitHandler = (event) => {
    event.preventDefault();
    FetchDeviceCount();
  };

  useEffect(() => {
    FetchDeviceCount();
  }, [FetchDeviceCount]);


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
      {isLoading && <p>Loading...</p>}
      {!isLoading && deviceCount === 0 && <p>No devices found.</p>}
      {!isLoading && deviceCount > 0 && 
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