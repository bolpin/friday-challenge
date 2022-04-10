import React, { useState } from "react";
import styles from "./Offer.module.css";
import formStyles from "../Form.module.css";
import useInput from "../../hooks/use-input";

const Offer = (props) => {
  const [editing, setEditing] = useState(false);

  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangedHandler,
    blurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput((name) => name.trim().length > 0, props.title);

  const {
    value: headerValue,
    isValid: headerIsValid,
    hasError: headerHasError,
    valueChangeHandler: headerChangedHandler,
    blurHandler: headerBlurHandler,
    reset: resetHeader,
  } = useInput((name) => name.trim().length > 0, props.header);

  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangedHandler,
    blurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput((name) => name.trim().length > 0, props.description);

  const {
    value: pointsValue,
    isValid: pointsIsValid,
    hasError: pointsHasError,
    valueChangeHandler: pointsChangedHandler,
    blurHandler: pointsBlurHandler,
    reset: resetPoints,
  } = useInput((points) => points > 0, props.points);

  const {
    value: payoutValue,
    isValid: payoutIsValid,
    hasError: payoutHasError,
    valueChangeHandler: payoutChangedHandler,
    blurHandler: payoutBlurHandler,
    reset: resetPayout,
  } = useInput((payout) => payout > 0, props.payoutCents);

  const isFormValid = () => {
    return (
      titleIsValid &&
      headerIsValid &&
      payoutIsValid &&
      pointsIsValid &&
      descriptionIsValid
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const offerId = parseInt(event.target.dataset["offerId"]);

    if (!isFormValid) {
      return;
    }
    props.updateOffer({
      id: props.id,
      title: titleValue,
      header: headerValue,
      description: descriptionValue,
      payout_cents: payoutValue,
      points: pointsValue,
    });
    setEditing((prevEditState) => !prevEditState);
  };

  const deleteOfferHandler = (event) => {
    const offerId = parseInt(event.target.dataset["offerId"]);
    props.deleteOffer({ id: offerId });
  };

  const editOfferHandler = (event) => {
    setEditing((prevEditState) => !prevEditState);
    let id = event.target.dataset["offerId"];
  };

  const cancelEditHandler = (event) => {
    setEditing((prevEditState) => !prevEditState);
  };

  function formatMoney(cents) {
    return '$' + (cents/100.0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  if (editing) {
    return (
      <div className={styles.offer}>
        <form onSubmit={submitHandler}>
          <div className={formStyles.form__controls}>
            <div className={formStyles.form__control}>
              <input
                type="text"
                value={titleValue}
                onChange={titleChangedHandler}
              />
            </div>
            <div className={formStyles.form__control}>
              <input
                type="text"
                value={headerValue}
                onChange={headerChangedHandler}
              />
            </div>
            <div className={formStyles.form__control}>
              <input
                type="text"
                value={descriptionValue}
                onChange={descriptionChangedHandler}
              />
            </div>
            <div className={formStyles.form__control}>
              <input
                type="number"
                value={pointsValue}
                onChange={pointsChangedHandler}
              />
            </div>
            <div className={formStyles.form__control}>
              <input
                type="number"
                value={payoutValue}
                onChange={payoutChangedHandler}
              />
            </div>
            <div className={styles.form__actions}>
              <button onClick={cancelEditHandler}>Cancel</button>
              <button type="submit">Save</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <li>
      <div className={styles.offer}>
        <h2>
          {titleValue} {headerValue}
        </h2>
        <div className={styles.offer__attribute}>{descriptionValue}</div>
        <div className={styles.offer__attribute}>{pointsValue} points</div>
        <div className={styles.offer__attribute}>Payout: {formatMoney(payoutValue)}</div>
        <button data-offer-id={props.id} onClick={deleteOfferHandler}>
          Delete
        </button>
        <button data-offer-id={props.id} onClick={editOfferHandler}>
          Edit
        </button>
      </div>
    </li>
  );
};

export default Offer;
