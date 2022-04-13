import React, { useState, useEffect } from "react";
import styles from './Form.module.css';
import useHttp from '../hooks/use-http';
import useInput from '../hooks/use-input';

const DeviceCountReport = () => {

  const [os, setOs] = useState('android');
  const [deviceCount, setDeviceCount] = useState(0);

  const { isLoading, httpError, sendRequest: fetchDeviceCount } = useHttp();

  // from https://semver.org/
  const isValidSemVer = (str) => {
    return /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/.test(str);
  }
  const semVerErrMsg = "Version format invalid."

  const {
    value: minVersionValue,
    isValid: minVersionIsValid,
    hasError: minVersionHasError,
    valueChangeHandler: minVersionChangedHandler,
    blurHandler: minVersionBlurHandler,
    reset: resetMinVersion,
  } = useInput(isValidSemVer);

  const {
    value: maxVersionValue,
    isValid: maxVersionIsValid,
    hasError: maxVersionHasError,
    valueChangeHandler: maxVersionChangedHandler,
    blurHandler: maxVersionBlurHandler,
    reset: resetMaxVersion,
  } = useInput(isValidSemVer);


  const requestOptions = {
    url: `http://localhost:3000/device_count.json?os=${os}&min_vers=${minVersionValue}&max_vers=${maxVersionValue}`,
  };
  
  const processDeviceCountResult = (deviceCountResult) => {
    setDeviceCount(+deviceCountResult[0].count);
  }

  // useEffect(() => {
  //   fetchDeviceCount(requestOptions, processDeviceCountResult);
  // }, [fetchDeviceCount]);

  let formIsValid = false;

  if (minVersionIsValid && maxVersionIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) { return; }

    fetchDeviceCount(requestOptions, processDeviceCountResult);
  };

  const osChangedHandler = (event) => {
    setOs(event.target.value);
  }

  let resultContent = <p>No devices found.</p>

  if (deviceCount > 0) {
    resultContent = 
      <>
        <p>
          Total number of {os} devices from version {minVersionValue} to version {maxVersionValue}:
        </p>
        <h1>
          {deviceCount}
        </h1>
      </>
  }

  if (httpError) {
    resultContent = <div className={styles.error}>{httpError}</div>
  }

  if (isLoading) {
    resultContent = <p>Loading...</p>
  }

  return (
    <div className={styles.form}>
      <form onSubmit={submitHandler}>
        <div className={styles.form__controls}>
          <div className={styles.form__control}>
            <label>OS</label>
            <select type="select" value={os} onChange={osChangedHandler}>
              <option value="android">Android</option>
              <option value="ios">iOS</option>
            </select>
          </div>

          <div className={styles.form__control}>
            <label>Minimum OS version (e.g. 1.0.0)</label>
            <input
              type="text"
              value={minVersionValue}
              onChange={minVersionChangedHandler}
              onBlur={minVersionBlurHandler}
            />
            {minVersionHasError && <div className={styles.error}>
                {semVerErrMsg}
              </div>}
          </div>

          <div className={styles.form__control}>
            <label>Maximum OS version (e.g. 1.0.0)</label> 
            <input
              type="text"
              value={maxVersionValue}
              onChange={maxVersionChangedHandler}
              onBlur={maxVersionBlurHandler}
            />
            {maxVersionHasError && <div className={styles.error}>
              {semVerErrMsg}
              </div>}
          </div>

        </div>
        <div className={styles.form__actions}>
            <button
              type='submit'
              disabled={!formIsValid}>
                Get device count
            </button>
        </div>
      </form>
      {resultContent}
    </div>
  );
};

export default DeviceCountReport;