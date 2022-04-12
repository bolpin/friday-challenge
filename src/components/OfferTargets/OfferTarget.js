import React, { useState } from "react";
import styles from "./OfferTarget.module.css";
import OfferTargetForm from "./OfferTargetForm"

const OfferTarget = (props) => {
  const [editing, setEditing] = useState(false);

  // const {
  //   value: offerIdValue,
  //   isValid: offerIdIsValid,
  //   hasError: offerIdHasError,
  //   valueChangeHandler: offerIdChangedHandler,
  //   blurHandler: offerIdBlurHandler,
  //   reset: resetOfferId,
  // } = useInput(() => true, props.offerId);

  // const {
  //   value: minAgeValue,
  //   isValid: minAgeIsValid,
  //   hasError: minAgeHasError,
  //   valueChangeHandler: minAgeChangedHandler,
  //   blurHandler: minAgeBlurHandler,
  //   reset: resetMinAge,
  // } = useInput((age) => age > 0, props.minAge);

  // const {
  //   value: maxAgeValue,
  //   isValid: maxAgeIsValid,
  //   hasError: maxAgeHasError,
  //   valueChangeHandler: maxAgeChangedHandler,
  //   blurHandler: maxAgeBlurHandler,
  //   reset: resetMaxAge,
  // } = useInput((age) => true, props.maxAge);

  // const {
  //   value: genderIdValue,
  //   isValid: genderIdIsValid,
  //   hasError: genderIdHasError,
  //   valueChangeHandler: genderIdChangedHandler,
  //   blurHandler: genderIdBlurHandler,
  //   reset: resetGenderId,
  // } = useInput((genderId) => genderId > 0 && genderId < 4, props.genderId);

  // const {
  //   value: operatingSystemIdValue,
  //   isValid: operatingSystemIdIsValid,
  //   hasError: operatingSystemIdHasError,
  //   valueChangeHandler: operatingSystemIdChangedHandler,
  //   blurHandler: operatingSystemIdBlurHandler,
  //   reset: resetOperatingSystemId,
  // } = useInput((name) => name.trim().length > 0, props.operatingSystemId);

  // const {
  //   value: minOsVersionValue,
  //   isValid: minOsVersionIsValid,
  //   hasError: minOsVersionHasError,
  //   valueChangeHandler: minOsVersionChangedHandler,
  //   blurHandler: minOsVersionBlurHandler,
  //   reset: resetMinOsVersion,
  // } = useInput((name) => name.trim().length > 0, props.minOsVersion);

  // const {
  //   value: localeIdValue,
  //   isValid: localeIdIsValid,
  //   hasError: localeIdHasError,
  //   valueChangeHandler: localeIdChangedHandler,
  //   blurHandler: localeIdBlurHandler,
  //   reset: resetLocaleId,
  // } = useInput((localeId) => localeId > 0, props.localeId);

  // const isFormValid = () => {
  //   return (
  //     offerIdIsValid &&
  //     minAgeIsValid &&
  //     maxAgeIsValid &&
  //     genderIdIsValid &&
  //     minOsVersionIsValid &&
  //     operatingSystemIdIsValid &&
  //     localeIdIsValid
  //   );
  // };

  // const submitHandler = (event) => {

  //   event.preventDefault();
  //   const offerId = parseInt(event.target.dataset["offerId"]);

  //   if (!isFormValid) {
  //     return;
  //   }
  //   props.updateOfferTarget({
  //     id: props.id,
  //     min_age: minAgeValue,
  //     max_age: maxAgeValue,
  //     gender_id: genderIdValue,
  //     operating_system_id: operatingSystemIdValue,
  //     min_os_vers: minOsVersionValue,
  //     locale_id: localeIdValue,
  //   });
  //   setEditing((prevEditState) => !prevEditState);
  // };

  const deleteOfferTargetHandler = (event) => {
    const offerId = parseInt(event.target.dataset["offerId"]);
    props.deleteOfferTarget({ id: offerId });
  };

  const toggleEditingState = (event) => {
    setEditing((prevEditState) => !prevEditState);
  }

  function formatMoney(cents) {
    return '$' + (cents/100.0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  if (editing) {
    return (
      <>
        <OfferTargetForm
          id={props.id}
          offerId={props.offer_id}
          minAge={props.min_age}
          maxAge={props.max_age}
          genderId={props.gender_id}
          operatingSystemId={props.operating_system_id}
          minOsVersion={props.min_os_version}
          props={props.locale_id}
          updateOfferTarget={props.onUpdateOfferTarget}
        />
        <button onClick={toggleEditingState}>Cancel</button>
      </>
   );
  }

  return (
    <li>
      <div className={styles.offer}>
        <h2>
          {props.offer_id} age:{props.min_age}-{props.max_age}
        </h2>
        <div className={styles.offer__attribute}>{props.gender_id}</div>
        <div className={styles.offer__attribute}>{props.operating_system_id} points</div>
        <div className={styles.offer__attribute}>{props.min_os_version} points</div>
        <div className={styles.offer__attribute}>{props.locale_id} points</div>
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
