import React, { useState, useEffect } from "react";
import styles from '../Form.module.css';
import useHttp from '../../hooks/use-http';
import useInput from '../../hooks/use-input';

import { isValidSemVer } from "../../validation";
import { apiRoot } from '../../config';


const DeviceCountReport = () => {

  const [os, setOs] = useState('android');
  const [deviceCount, setDeviceCount] = useState(0);

  const { isLoading, httpError, sendRequest: fetchDeviceCount } = useHttp();

  const semVerErrMsg = "Version format invalid."
  const requiredErrMsg = "Required."

  const {
    value: osValue,
    isValid: osIsValid,
    hasError: osHasError,
    valueChangeHandler: osChangedHandler,
    blurHandler: osBlurHandler,
    reset: resetOS,
  } = useInput(val => val !== '');

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


  const processDeviceCountResult = (deviceCountResult) => {
    setDeviceCount(+deviceCountResult[0].count);
  }

  // useEffect(() => {
  //   fetchDeviceCount(requestOptions, processDeviceCountResult);
  // }, [fetchDeviceCount]);

  let formIsValid = false;

  if (osIsValid && minVersionIsValid && maxVersionIsValid) {
    formIsValid = true;
  }

  const requestOptions = {
    url: `${apiRoot}/device_count.json?os=${os}&min_vers=${minVersionValue}&max_vers=${maxVersionValue}`,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    fetchDeviceCount(requestOptions, processDeviceCountResult);
  };


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
            <select
              type="select"
              value={osValue}
              onChange={osChangedHandler}
              onBlur={osBlurHandler}
            >
              <option value="">Select</option>
              <option value="android">Android</option>
              <option value="ios">iOS</option>
            </select>
            { osHasError && <div className={styles.error}>
                {requiredErrMsg}
              </div>}
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