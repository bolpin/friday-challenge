import React, { useState } from "react";

import styles from "./OfferTarget.module.css";
import formStyles from "../Form.module.css";

import useInput from "../../hooks/use-input";

import { useSelector } from 'react-redux';

const OfferTarget = (props) => {

  const [editing, setEditing] = useState(false);

  const operatingSystems = useSelector((state) => state.operatingSystems.operatingSystems);
  const genders = useSelector((state) => state.genders.genders);
  const locales = useSelector((state) => state.locales.locales);

  const requiredFieldMsg = "Required.";

  const deleteOfferTargetHandler = (event) => {
    const offerId = parseInt(event.target.dataset["offerId"]);
    props.deleteOfferTarget({ id: offerId });
  };

  const toggleEditingState = (event) => {
    setEditing((prevEditState) => !prevEditState);
  }

  const genderName = (id) => {
    const g = genders.find(gender => gender.id === id);
    return g ? g.name : "UNKOWN"
  }

  const osName = (osId) => {
    const os = operatingSystems.find(os => os.id === osId);
    return os ? os.name : "UNKOWN"
  }

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
  } = useInput(val => true, props.operatingSystemId);

  const {
    value: minOsVersionValue,
    isValid: minOsVersionIsValid,
    hasError: minOsVersionHasError,
    valueChangeHandler: minOsVersionChangedHandler,
    blurHandler: minOsVersionBlurHandler,
    reset: resetMinOsVersion,
  } = useInput(val => true, `${props.minOsMajorVersion}.${props.minOsMinorVersion}.${props.minOsPatchVersion}`);

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

  if (editing) {
    return (
      <>
        <div className={styles.offerTarget}>
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

              <div className={formStyles.form__control}>
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

              <div className={formStyles.form__control}>
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

              <div className={formStyles.form__actions}>
                <button onClick={toggleEditingState}>Cancel</button>
                <button type="submit">Save</button>
              </div>
            </div>
          </form>
        </div>
      </>
   );
  }

  return (
    <li>
      <div className={styles.offerTarget}>
        <h2>
         Offer: {props.offerId}   age:{props.minAge}-{props.maxAge}
        </h2>
        <div className={styles.offer__attribute}>{osName(props.operatingSystemId)}</div>
        <div className={styles.offer__attribute}>Min OS version: {props.minOsMajorVersion}.{props.minOsMinorVersion}.{props.minOsPatchVersion}</div>
        <div className={styles.offer__attribute}>{genderName(props.genderId).code}</div>
        <button data-offer-id={props.id} onClick={deleteOfferTargetHandler}>
          Delete
        </button>
        <button data-offer-id={props.id} onClick={toggleEditingState}>
          Edit
        </button>
      </div>
    </li>
  );
};
  
export default OfferTarget;
