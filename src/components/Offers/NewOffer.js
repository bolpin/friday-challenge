import React from 'react';
import useInput from '../../hooks/use-input';
import styles from '../Form.module.css';

function NewOffer(props) {

  const requiredFieldMsg = "Required."

  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangedHandler,
    blurHandler: titleBlurHandler,
    reset: resetFirstName,
  } = useInput((name) => name.trim().length > 0);

  const {
    value: headerValue,
    isValid: headerIsValid,
    hasError: headerHasError,
    valueChangeHandler: headerChangedHandler,
    blurHandler: headerBlurHandler,
    reset: resetHeader,
  } = useInput((name) => name.trim().length > 0);

  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangedHandler,
    blurHandler: descriptionBlurHandler,
    reset: resetDescription
  } = useInput( description => description.trim().length > 0);

  const {
    value: pointsValue,
    isValid: pointsIsValid,
    hasError: pointsHasError,
    valueChangeHandler: pointsChangedHandler,
    blurHandler: pointsBlurHandler,
    reset: resetPoints,
  } = useInput( points => points > 0);

  const {
    value: payoutValue,
    isValid: payoutIsValid,
    hasError: payoutHasError,
    valueChangeHandler: payoutChangedHandler,
    blurHandler: payoutBlurHandler,
    reset: resetPayout,
  } = useInput( points => points > 0);

  function submitHandler(event) {
    event.preventDefault();

    const offer = {
      title: titleValue,
      header: headerValue,
      description: descriptionValue,
      points: pointsValue,
      payout_cents: payoutValue,
    };

    props.onAddOffer(offer);
  }
  let formIsValid = false;

  if (titleIsValid &&
    headerIsValid &&
    descriptionIsValid &&
    pointsIsValid &&
    payoutIsValid) {
      formIsValid = true;
    }

  return (
    <div className={styles.form}>
      <form onSubmit={submitHandler}>
        <div className={styles.form__controls}>

          <div className={styles.form__control}>
            <label>Title</label>
            <input
              type="text"
              value={titleValue}
              onChange={titleChangedHandler}
              onBlur={titleBlurHandler}
            />
            {titleHasError && <div className={styles.error}>
              {requiredFieldMsg}
            </div>}
          </div>

          <div className={styles.form__control}>
            <label>Header</label> 
            <input
              type="text"
              value={headerValue}
              onChange={headerChangedHandler}
              onBlur={headerBlurHandler}
            />
            {headerHasError && <div className={styles.error}>
              {requiredFieldMsg}
            </div>}
          </div>

          <div className={styles.form__control}>
            <label>Description</label>
            <input
              type="text"
              value={descriptionValue}
              onChange={descriptionChangedHandler}
              onBlur={descriptionBlurHandler}
            />
            {descriptionHasError && <div className={styles.error}>
              {requiredFieldMsg}
            </div>}
          </div>

          <div className={styles.form__control}>
            <label>Points</label>
            <input
              type="number"
              min='0'
              value={pointsValue}
              onChange={pointsChangedHandler}
              onBlur={pointsBlurHandler}
            />
            {pointsHasError && <div className={styles.error}>
              Must be greater than 0.
            </div>}
          </div>

          <div className={styles.form__control}>
            <label>Payout (cents)</label>
            <input
              type='number'
              min='0'
              value={payoutValue}
              onChange={payoutChangedHandler}
              onBlur={payoutBlurHandler}
            />
            {payoutHasError && <div className={styles.error}>
              Must be greater than $0.00.
            </div>}
          </div>
        </div>

        <div className={styles.form__actions}>
          <button
            type='submit'
            disabled={!formIsValid}
          >
            Add Offer
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewOffer;