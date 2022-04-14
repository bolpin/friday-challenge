import React, { useState, useEffect } from "react";
import styles from "../Form.module.css";
import useInput from "../../hooks/use-input";
import { useSelector } from 'react-redux';

const NewOfferTarget = (props) => {

  const operatingSystems = useSelector((state) => state.operatingSystems.operatingSystems);
  const genders = useSelector((state) => state.genders.genders);
  const locales = useSelector((state) => state.locales.locales);

  const requiredFieldMsg = "Required.";
  const semVerErrMsg = "Version format invalid."

  const isValidSemVer = (str) => {
    return /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/.test(str);
  }
  const {
    value: offerIdValue,
    isValid: offerIdIsValid,
    hasError: offerIdHasError,
    valueChangeHandler: offerIdChangedHandler,
    blurHandler: offerIdBlurHandler,
    reset: resetOfferId,
  } = useInput(val => true, props.offerId);

  const {
    value: minAgeValue,
    isValid: minAgeIsValid,
    hasError: minAgeHasError,
    valueChangeHandler: minAgeChangedHandler,
    blurHandler: minAgeBlurHandler,
    reset: resetMinAge,
  } = useInput(age => age > 0, props.minAge);

  const {
    value: maxAgeValue,
    isValid: maxAgeIsValid,
    hasError: maxAgeHasError,
    valueChangeHandler: maxAgeChangedHandler,
    blurHandler: maxAgeBlurHandler,
    reset: resetMaxAge,
  } = useInput(age => age > 0, props.maxAge);

  const {
    value: genderIdValue,
    isValid: genderIdIsValid,
    hasError: genderIdHasError,
    valueChangeHandler: genderIdChangedHandler,
    blurHandler: genderIdBlurHandler,
    reset: resetGenderId,
  } = useInput(genderId => genderId > 0 && genderId < 4, props.genderId);

  const {
    value: operatingSystemIdValue,
    isValid: operatingSystemIdIsValid,
    hasError: operatingSystemIdHasError,
    valueChangeHandler: operatingSystemIdChangedHandler,
    blurHandler: operatingSystemIdBlurHandler,
    reset: resetOperatingSystemId,
  } = useInput(val => true, props.operatingSystemId);

  const {
    value: minOsVersionValue,
    isValid: minOsVersionIsValid,
    hasError: minOsVersionHasError,
    valueChangeHandler: minOsVersionChangedHandler,
    blurHandler: minOsVersionBlurHandler,
    reset: resetMinOsVersion,
  } = useInput(isValidSemVer, props.minOsVersion);

  const {
    value: localeIdValue,
    isValid: localeIdIsValid,
    hasError: localeIdHasError,
    valueChangeHandler: localeIdChangedHandler,
    blurHandler: localeIdBlurHandler,
    reset: resetLocaleId,
  } = useInput((localeId) => localeId > 0, props.localeId);

  const isFormValid = () => {
    return (
      offerIdIsValid &&
      minAgeIsValid &&
      maxAgeIsValid &&
      genderIdIsValid &&
      minOsVersionIsValid &&
      operatingSystemIdIsValid &&
      localeIdIsValid
    );
  };

  function submitHandler(event) {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    const offerTarget = {
      id: props.id,
      min_age: minAgeValue,
      max_age: maxAgeValue,
      gender_id: genderIdValue,
      operating_system_id: operatingSystemIdValue,
      min_os_vers: minOsVersionValue,
      locale_id: localeIdValue,
    };

    props.submitAction(offerTarget);
  }

  return (
    <div className={styles.form}>
      <form onSubmit={props.onCreateOfferTarget}>
        <div className={styles.form__controls}>
          <h1>Offer Id ???</h1>
          <div className={styles.form__control}>
            <label>Minimum Age</label>
            <input
              type="number"
              value={minAgeValue}
              onChange={minAgeChangedHandler}
            />
            {minAgeHasError && { requiredFieldMsg }}
          </div>

          <div className={styles.form__control}>
            <label>Maximum Age</label>
            <input
              type="number"
              value={maxAgeValue}
              onChange={maxAgeChangedHandler}
            />
            {maxAgeHasError && { requiredFieldMsg }}
          </div>

          <div className={styles.form__control}>
            <label>Min. OS Version</label>
            <input
              type="text"
              value={minOsVersionValue}
              onChange={minOsVersionChangedHandler}
            />
            {minOsVersionHasError && { semVerErrMsg }}
          </div>

          <div className={styles.form__control}>
            <label>Gender</label>
            <select
              value={genderIdValue}
              onChange={genderIdChangedHandler}
              onBlur={genderIdBlurHandler}
            >
              <option value="0">Select</option>
              {genders.map((gender) => (
                <option key={gender["id"]} value={gender["id"]}>
                  {gender["name"]}
                </option>
              ))}
            </select>
            {genderIdHasError && { requiredFieldMsg }}
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
                  key={operatingSystem["id"]}
                  value={operatingSystem["id"]}
                >
                  {operatingSystem["name"]}
                </option>
              ))}
            </select>
            {operatingSystemIdHasError && { requiredFieldMsg }}
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
                <option key={locale["id"]} value={locale["id"]}>
                  {locale["code"]}
                </option>
              ))}
            </select>
            {localeIdHasError && { requiredFieldMsg }}
          </div>

          <div className={styles.form__actions}>
            <button type="submit">Create Offer Target</button>
          </div>
        </div>
      </form>
    </div>
  )
};

export default NewOfferTarget;
