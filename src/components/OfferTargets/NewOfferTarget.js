import React, { useState, useEffect } from "react";
import styles from "../Form.module.css";
import useInput from "../../hooks/use-input";
import { useSelector } from 'react-redux';
import { isValidSemVer } from '../../validation';

const NewOfferTarget = (props) => {

  const operatingSystems = useSelector((state) => state.operatingSystems.operatingSystems);
  const genders = useSelector((state) => state.genders.genders);
  const locales = useSelector((state) => state.locales.locales);
  const offers = useSelector((state) => state.offers.offers);

  const requiredErrMsg = "Required.";
  const semVerErrMsg = "Version format invalid."

  const {
    value: offerIdValue,
    isValid: offerIdIsValid,
    hasError: offerIdHasError,
    valueChangeHandler: offerIdChangedHandler,
    blurHandler: offerIdBlurHandler,
    reset: resetOfferId,
  } = useInput(val => val > 0);

  const {
    value: minAgeValue,
    isValid: minAgeIsValid,
    hasError: minAgeHasError,
    valueChangeHandler: minAgeChangedHandler,
    blurHandler: minAgeBlurHandler,
    reset: resetMinAge,
  } = useInput(age => age > 13, 14);

  const {
    value: maxAgeValue,
    isValid: maxAgeIsValid,
    hasError: maxAgeHasError,
    valueChangeHandler: maxAgeChangedHandler,
    blurHandler: maxAgeBlurHandler,
    reset: resetMaxAge,
  } = useInput(age => age > 13, 99);

  const {
    value: genderIdValue,
    isValid: genderIdIsValid,
    hasError: genderIdHasError,
    valueChangeHandler: genderIdChangedHandler,
    blurHandler: genderIdBlurHandler,
    reset: resetGenderId,
  } = useInput(genderId => genderId > 0 && genderId < 4);

  const {
    value: operatingSystemIdValue,
    isValid: operatingSystemIdIsValid,
    hasError: operatingSystemIdHasError,
    valueChangeHandler: operatingSystemIdChangedHandler,
    blurHandler: operatingSystemIdBlurHandler,
    reset: resetOperatingSystemId,
  } = useInput(val => val !== '');

  const {
    value: minOsVersionValue,
    isValid: minOsVersionIsValid,
    hasError: minOsVersionHasError,
    valueChangeHandler: minOsVersionChangedHandler,
    blurHandler: minOsVersionBlurHandler,
    reset: resetMinOsVersion,
  } = useInput(isValidSemVer);

  const {
    value: localeIdValue,
    isValid: localeIdIsValid,
    hasError: localeIdHasError,
    valueChangeHandler: localeIdChangedHandler,
    blurHandler: localeIdBlurHandler,
    reset: resetLocaleId,
  } = useInput(val => val > 0);

  let formIsValid = false;
  if (
    offerIdIsValid &&
    minAgeIsValid &&
    maxAgeIsValid &&
    genderIdIsValid &&
    minOsVersionIsValid &&
    operatingSystemIdIsValid &&
    localeIdIsValid) {
    formIsValid = true;
  }

  function submitHandler(event) {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const [major_vers,
      minor_vers,
      patch_vers] = minOsVersionValue.match(/^(\d+).(\d+).(\d+)$/).slice(1,4);

    const offerTarget = {
      offer_id: offerIdValue,
      min_player_age: minAgeValue,
      max_player_age: maxAgeValue,
      gender_id: genderIdValue,
      operating_system_id: operatingSystemIdValue,
      min_os_major_version: major_vers,
      min_os_minor_version: minor_vers,
      min_os_patch_version: patch_vers,
      locale_id: localeIdValue,
    };

    props.onCreateOfferTarget(offerTarget);
  }

  return (
    <div className={styles.form}>
      <form onSubmit={submitHandler}>
        <div className={styles.form__controls}>

          <div className={styles.form__control}>
            <label>Offer</label>
            <select
              value={offerIdValue}
              onChange={offerIdChangedHandler}
              onBlur={offerIdBlurHandler}
            >
              <option value="0">Select</option>
              {offers.map((offer) => (
                <option key={offer["id"]} value={offer["id"]}>
                  {offer["title"]}
                </option>
              ))}
            </select>
            {offerIdHasError && 
            <div className={styles.error}>
            {requiredErrMsg}
            </div>}
          </div>

          <div className={styles.form__control}>
            <label>Minimum Age</label>
            <input
              type="number"
              value={minAgeValue}
              min='0'
              max='120'
              onChange={minAgeChangedHandler}
              onBlur={minAgeBlurHandler}
            />
            {minAgeHasError && 
            <div className={styles.error}>
            {requiredErrMsg}
            </div>}
          </div>

          <div className={styles.form__control}>
            <label>Maximum Age</label>
            <input
              type="number"
              min='0'
              max='120'
              value={maxAgeValue}
              onChange={maxAgeChangedHandler}
              onBlur={maxAgeBlurHandler}
            />
            {maxAgeHasError && 
            <div className={styles.error}>
            {requiredErrMsg}
            </div>}
          </div>


          <div className={styles.form__control}>
            <label>Min. OS Version</label>
            <input
              type="text"
              value={minOsVersionValue}
              onChange={minOsVersionChangedHandler}
              onBlur={minOsVersionBlurHandler}
            />
            {minOsVersionHasError && 
            <div className={styles.error}>
            {semVerErrMsg}
            </div>}
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
            {genderIdHasError && 
            <div className={styles.error}>
            {requiredErrMsg}
            </div>}
          </div>

          <div className={styles.form__control}>
            <label>Operating System</label>
            <select
              value={operatingSystemIdValue}
              onChange={operatingSystemIdChangedHandler}
              onBlur={operatingSystemIdBlurHandler}
            >
              <option value="">Select</option>
              {operatingSystems.map((operatingSystem) => (
                <option
                  key={operatingSystem["id"]}
                  value={operatingSystem["id"]}
                >
                  {operatingSystem["name"]}
                </option>
              ))}
            </select>
            {operatingSystemIdHasError && 
            <div className={styles.error}>
            {requiredErrMsg}
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
                <option key={locale["id"]} value={locale["id"]}>
                  {locale["code"]}
                </option>
              ))}
            </select>
            {localeIdHasError && 
            <div className={styles.error}>
            {requiredErrMsg}
            </div>}
          </div>
        </div>

        <div className={styles.form__actions}>
        <button
          type='submit'
          disabled={!formIsValid}
        >
          Add Offer Target
        </button>
      </div>
    </form>
  </div>
  );
}

export default NewOfferTarget;
