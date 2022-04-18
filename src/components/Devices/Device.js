import React, { useState } from "react";
import styles from "./Device.module.css";
import formStyles from "../Form.module.css";
import useInput from "../../hooks/use-input";

import { isValidSemVer } from "../../validation"

import { useSelector } from 'react-redux';


const Device = (props) => {

  const players = useSelector((state) => state.players.players);
  const locales = useSelector((state) => state.locales.locales);
  const operatingSystems = useSelector((state) => state.operatingSystems.operatingSystems);

  const [editing, setEditing] = useState(false);

  const requiredFieldMsg = "Required.";

  const {
    value: modelValue,
    isValid: modelIsValid,
    hasError: modelHasError,
    valueChangeHandler: modelChangedHandler,
    blurHandler: modelBlurHandler,
    reset: resetModel,
  } = useInput(val => true, props.model);

  const {
    value: playerIdValue,
    isValid: playerIdIsValid,
    hasError: playerIdHasError,
    valueChangeHandler: playerIdChangedHandler,
    blurHandler: playerIdBlurHandler,
    reset: resetPlayerId,
  } = useInput(val => true, props.playerId);

  const {
    value: operatingSystemIdValue,
    isValid: operatingSystemIdIsValid,
    hasError: operatingSystemIdHasError,
    valueChangeHandler: operatingSystemIdChangedHandler,
    blurHandler: operatingSystemIdBlurHandler,
    reset: resetOperatingSystemId,
  } = useInput(val => true, props.operatingSystemId);

  const {
    value: localeIdValue,
    isValid: localeIdIsValid,
    hasError: localeIdHasError,
    valueChangeHandler: localeIdChangedHandler,
    blurHandler: localeIdBlurHandler,
    reset: resetlocaleId,
  } = useInput(val => true, props.localeId);

  const {
    value: operatingSystemVersionValue,
    isValid: operatingSystemVersionIsValid,
    hasError: operatingSystemVersionHasError,
    valueChangeHandler: operatingSystemVersionChangedHandler,
    blurHandler: operatingSystemVersionBlurHandler,
    reset: resetOperatingSystemVersion,
  } = useInput(val => isValidSemVer(val), props.operatingSystemVersion);

  const isFormValid = () => {
    return (
      modelIsValid &&
      operatingSystemVersionIsValid
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // const deviceId = parseInt(event.target.dataset["deviceId"]);

    if (!isFormValid) {
      return;
    }

    const [
      major_vers,
      minor_vers,
      patch_vers
    ] = operatingSystemVersionValue.match(/^(\d+).(\d+).(\d+)$/).slice(1,4);

    const device = {
      id: props.id,
      os_major_version: major_vers,
      os_minor_version: minor_vers,
      os_patch_version: patch_vers,
      model: modelValue,
      player_id: playerIdValue,
      operating_system_id: operatingSystemIdValue,
      locale_id: localeIdValue,
    };

    props.updateDevice(device);
      
    setEditing((prevEditState) => !prevEditState);
  };

  const deleteDeviceHandler = (event) => {
    const deviceId = parseInt(event.target.dataset["deviceId"]);
    props.deleteDevice({ id: deviceId });
  };

  const editDeviceHandler = (event) => {
    setEditing((prevEditState) => !prevEditState);
    let id = event.target.dataset["deviceId"];
  };

  const cancelEditHandler = (event) => {
    setEditing((prevEditState) => !prevEditState);
  };

  if (editing) {
    return (

      <div className={styles.device}>
        
        <form onSubmit={submitHandler}>
          <div className={formStyles.form__controls}>

            <div className={formStyles.form__control}>
              <label>model</label>
              <input
                type="text"
                value={modelValue}
                onChange={modelChangedHandler}
                onBlur={modelBlurHandler}
              />
              {modelHasError && <div className={formStyles.error}>
                {requiredFieldMsg}
              </div>}
            </div>

            <div className={formStyles.form__control}>
              <label>playerId</label>
              <input
                type="text"
                value={playerIdValue}
                onChange={playerIdChangedHandler}
                onBlur={playerIdBlurHandler}
              />
              {playerIdHasError && <div className={formStyles.error}>
                {requiredFieldMsg}
              </div>}
            </div>

            <div className={formStyles.form__control}>
              <label>Operating System</label>
              <select
                value={operatingSystemIdValue}
                onChange={operatingSystemIdChangedHandler}
                onBlur={operatingSystemIdBlurHandler}
              >
                <option value="0">Select</option>
                {operatingSystems.map((operatingSystem) => (
                  <option
                    key={operatingSystem["id"]}
                    value={operatingSystem["id"]}
                  >
                    {operatingSystem["name"]}
                  </option>
                ))}
              </select>
              {operatingSystemIdHasError && { requiredFieldMsg }}
            </div>

            <div className={formStyles.form__control}>
              <label>Locale</label>
              <select
                value={localeIdValue}
                onChange={localeIdChangedHandler}
                onBlur={localeIdBlurHandler}
              >
                <option value="0">Select</option>
                {locales.map((locale) => (
                  <option key={locale["id"]} value={locale["id"]}>
                    {locale["code"]}
                  </option>
                ))}
              </select>
              {localeIdHasError && <div className={styles.error}>
                {requiredFieldMsg}
              </div>}
            </div>

            <div className={styles.form__control}>
              <label>OS Version</label>
              <input
                type="text"
                value={operatingSystemVersionValue}
                onChange={operatingSystemVersionChangedHandler}
                onBlur={operatingSystemVersionBlurHandler}
              />
              {operatingSystemVersionHasError && <div className={styles.error}>
                {requiredFieldMsg}
              </div>}
            </div>

          </div>
          <div className={styles.form__actions}>
            <button onClick={cancelEditHandler}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }

  const playerName = (playerId) => {
    const p = players.find(player => player.id === playerId);
    return p ? `Owner: ${p.first_name} ${p.last_name}` : "UNKNOWN"
  }

  const osName = (osId) => {
    const os = operatingSystems.find(os => os.id === osId);
    return os ? os.name : "UNKNOWN"
  }

  const localeCode = (localeId) => {
    const locale = locales.find(l => l.id === localeId);
    return locale ? locale.code : "UNKNOWN"
  }

  return (
    <li>
      <div className={styles.device}>
        <h2>
          <div className={styles.device__attribute}>{playerName(playerIdValue)}</div>
        </h2>
        <div className={styles.device__attribute}>
          {modelValue}
        </div>
        <div className={styles.device__attribute}>
          {operatingSystemVersionValue}
        </div>
        <div className={styles.device__attribute}>{osName(operatingSystemIdValue)}</div>
        <div className={styles.device__attribute}>{localeCode(localeIdValue)} </div>
        <button data-device-id={props.id} onClick={deleteDeviceHandler}>
          Delete
        </button>
        <button data-device-id={props.id} onClick={editDeviceHandler}>
          Edit
        </button>
      </div>
    </li>
  );
};

export default Device;
