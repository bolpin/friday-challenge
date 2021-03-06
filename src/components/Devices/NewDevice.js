import React, { useEffect, useState } from 'react';
import useInput from '../../hooks/use-input';
import styles from '../Form.module.css';
import {isValidSemVer } from '../../validation'
import { fetchPlayers } from '../../store/players-actions';
import { fetchOperatingSystems } from '../../store/operating-systems-actions';
import { fetchLocales } from '../../store/locales-actions';
import { fetchDevices } from '../../store/devices-actions';

import { useDispatch, useSelector } from 'react-redux';


function NewDevice(props) {

  const players = useSelector((state) => state.players.players);
  const devices = useSelector((state) => state.devices.devices);
  const operatingSystems = useSelector((state) => state.operatingSystems.operatingSystems);
  const locales = useSelector((state) => state.locales.locales);

  const dispatch = useDispatch();

  // let initialRender = true;

  // useEffect(() => {
  //   if (initialRender) {
  //     initialRender = false;
  //     dispatch(fetchPlayers());
  //     dispatch(fetchDevices());
  //     dispatch(fetchLocales());
  //     dispatch(fetchOperatingSystems());
  //   }
  // }, []);

  const deviceOwningPlayerIds = devices.map(d => d.player_id)
  const devicelessPlayers = players.filter(p => !(deviceOwningPlayerIds.includes(p.id)))

  const semVerErrorMsg = "Version format invalid."
  const requiredFieldMsg = "Required."

  const {
    value: modelValue,
    isValid: modelIsValid,
    hasError: modelHasError,
    valueChangeHandler: modelChangedHandler,
    blurHandler: modelBlurHandler,
    reset: resetModel,
  } = useInput( model => model.trim().length > 0);

  const {
    value: operatingSystemIdValue,
    isValid: operatingSystemIdIsValid,
    hasError: operatingSystemIdHasError,
    valueChangeHandler: operatingSystemIdChangedHandler,
    blurHandler: operatingSystemIdBlurHandler,
    reset: resetOperatingSystemId,
  } = useInput( val => val > 0);

  const {
    value: playerIdValue,
    isValid: playerIdIsValid,
    hasError: playerIdHasError,
    valueChangeHandler: playerIdChangedHandler,
    blurHandler: playerIdBlurHandler,
    reset: resetPlayerId
  } = useInput( val => val > 0);

  const {
    value: operatingSystemVersionValue,
    isValid: operatingSystemVersionIsValid,
    hasError: operatingSystemVersionHasError,
    valueChangeHandler: operatingSystemVersionChangedHandler,
    blurHandler: operatingSystemVersionBlurHandler,
    reset: resetOperatingSystemVersion,
  } = useInput(isValidSemVer);

  const {
    value: localeIdValue,
    isValid: localeIdIsValid,
    hasError: localeIdHasError,
    valueChangeHandler: localeIdChangedHandler,
    blurHandler: localeIdBlurHandler,
    reset: resetLocaleId,
  } = useInput( val => val > 0);

  let formIsValid = false;
  if (modelIsValid &&
    operatingSystemIdIsValid &&
    playerIdIsValid &&
    operatingSystemVersionIsValid &&
    localeIdIsValid) {
      formIsValid = true;
    }

  function submitHandler(event) {
    event.preventDefault();

    const device = {
      model: modelValue,
      operating_system_id: operatingSystemIdValue,
      player_id: playerIdValue,
      operating_system_version: operatingSystemVersionValue,
      locale_id: localeIdValue,
    };

    props.onAddDevice(device);
  }

  return (
    <div className={styles.form}>
      <form onSubmit={submitHandler}>
        <div className={styles.form__controls}>

          <div className={styles.form__control}>
            <label>model</label>
            <input
              type="text"
              value={modelValue}
              onChange={modelChangedHandler}
              onBlur={modelBlurHandler}
            />
            {modelHasError && <div className={styles.error}>
              {requiredFieldMsg}
            </div>}
          </div>

          <div className={styles.form__control}>
            <label>Device Owner</label>
            <select
              value={playerIdValue}
              onChange={playerIdChangedHandler}
              onBlur={playerIdBlurHandler}
            >
              <option value="Select">Select</option>
              {devicelessPlayers.map((player) => (
                <option
                  key={player["id"]}
                  value={player["id"]}
                >
                  {player["first_name"]} {player["last_name"]}
                </option>
              ))}
            </select>
            {playerIdHasError && <div className={styles.error}>
              {requiredFieldMsg}
            </div>}
          </div>

          <div className={styles.form__control}>
            <label>Operating System</label>
            <select
              value={operatingSystemIdValue}
              onChange={operatingSystemIdChangedHandler}
              onBlur={operatingSystemIdBlurHandler}
            >
              <option value="0">Select</option>
              {operatingSystems.map((operatingSystem) => (
                <option
                  key={operatingSystem['id']}
                  value={operatingSystem['id']}
                >
                  {operatingSystem['name']}
                </option>
              ))}
            </select>
            {operatingSystemIdHasError && <div className={styles.error}> 
              { requiredFieldMsg }
            </div>}
          </div>

          <div className={styles.form__control}>
            <label>Locale</label>
            <select
              value={localeIdValue}
              onChange={localeIdChangedHandler}
              onBlur={localeIdBlurHandler}
            >
              <option value="0">Select</option>
              {locales.map((locale) => (
                <option
                  key={locale["id"]}
                  value={locale["id"]}
                >
                  {locale["code"]}
                </option>
              ))}
            </select>
            {localeIdHasError && <div className={styles.error}> 
              { requiredFieldMsg }
            </div>}
          </div>

          <div className={styles.form__control}>
            <label>OS Version (e.g. 1.0.0)</label>
            <input
              type="text"
              value={operatingSystemVersionValue}
              onChange={operatingSystemVersionChangedHandler}
              onBlur={operatingSystemVersionBlurHandler}
            />
            {operatingSystemVersionHasError && <div className={styles.error}>
              {semVerErrorMsg}
            </div>}
          </div>

        </div>

        <div className={styles.form__actions}>
          <button
            type='submit'
            disabled={!formIsValid}
          >
            Add Device
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewDevice;