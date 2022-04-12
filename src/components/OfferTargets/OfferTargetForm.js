import React, { useState, useEffect } from "react";
import styles from "./OfferTarget.module.css";
import formStyles from "../Form.module.css";
import useInput from "../../hooks/use-input";
import useLookup from "../../hooks/use-lookup";

const OfferTargetForm = (props) => {

  const genders = useLookup('genders').values
  const locales = useLookup('locales').values
  const operatingSystems = useLookup('operating_systems').values

  const requiredFieldMsg = "Required.";

  const {
    value: offerIdValue,
    isValid: offerIdIsValid,
    hasError: offerIdHasError,
    valueChangeHandler: offerIdChangedHandler,
    blurHandler: offerIdBlurHandler,
    reset: resetOfferId,
  } = useInput(() => true, props.offerId);

  const {
    value: minAgeValue,
    isValid: minAgeIsValid,
    hasError: minAgeHasError,
    valueChangeHandler: minAgeChangedHandler,
    blurHandler: minAgeBlurHandler,
    reset: resetMinAge,
  } = useInput((age) => age > 0, props.minAge);

  const {
    value: maxAgeValue,
    isValid: maxAgeIsValid,
    hasError: maxAgeHasError,
    valueChangeHandler: maxAgeChangedHandler,
    blurHandler: maxAgeBlurHandler,
    reset: resetMaxAge,
  } = useInput((age) => true, props.maxAge);

  const {
    value: genderIdValue,
    isValid: genderIdIsValid,
    hasError: genderIdHasError,
    valueChangeHandler: genderIdChangedHandler,
    blurHandler: genderIdBlurHandler,
    reset: resetGenderId,
  } = useInput((genderId) => genderId > 0 && genderId < 4, props.genderId);

  const {
    value: operatingSystemIdValue,
    isValid: operatingSystemIdIsValid,
    hasError: operatingSystemIdHasError,
    valueChangeHandler: operatingSystemIdChangedHandler,
    blurHandler: operatingSystemIdBlurHandler,
    reset: resetOperatingSystemId,
  } = useInput((name) => name.trim().length > 0, props.operatingSystemId);

  const {
    value: minOsVersionValue,
    isValid: minOsVersionIsValid,
    hasError: minOsVersionHasError,
    valueChangeHandler: minOsVersionChangedHandler,
    blurHandler: minOsVersionBlurHandler,
    reset: resetMinOsVersion,
  } = useInput((name) => name.trim().length > 0, props.minOsVersion);

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

    // const offerId = parseInt(event.target.dataset["offerId"]);

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
    <div className={styles.offer_target}>
      <form onSubmit={submitHandler}>
        <div className={formStyles.form__controls}>
          <div className={formStyles.form__control}>
            <input
              type="number"
              value={minAgeValue}
              onChange={minAgeChangedHandler}
            />
          </div>
          <div className={formStyles.form__control}>
            <input
              type="number"
              value={maxAgeValue}
              onChange={maxAgeChangedHandler}
            />
          </div>
          <div className={formStyles.form__control}>
            <input
              type="text"
              value={minOsVersionValue}
              onChange={minOsVersionChangedHandler}
            />
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
            <button type="submit">{props.submitButtonText}</button>
          </div>
        </div>
      </form>
    </div>
  )
};

export default OfferTargetForm;