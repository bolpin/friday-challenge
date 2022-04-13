import React, { useState } from "react";
import styles from "./OfferTarget.module.css";
import OfferTargetForm from "./OfferTargetForm"
import { locales, operatingSystems, genders } from '../../config';

const OfferTarget = (props) => {
  const [editing, setEditing] = useState(false);

  const deleteOfferTargetHandler = (event) => {
    const offerId = parseInt(event.target.dataset["offerId"]);
    props.deleteOfferTarget({ id: offerId });
  };

  const toggleEditingState = (event) => {
    setEditing((prevEditState) => !prevEditState);
  }

  // function formatMoney(cents) {
  //   return '$' + (cents/100.0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  // }

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
          updateOfferTarget={props.onUpdateOfferTarget}
        />
        <button onClick={toggleEditingState}>Cancel</button>
      </>
   );
  }

  return (
    <li>
      <div className={styles.offerTarget}>
        <h2>
         Offer id: {props.offerId}   age:{props.minAge}-{props.maxAge}
        </h2>
        <div className={styles.offer__attribute}>{operatingSystems.find( os => os.id === props.operatingSystemId).name}</div>
        <div className={styles.offer__attribute}>Min OS version: {props.minOsMajorVersion}.{props.minOsMinorVersion}.{props.minOsPatchVersion}</div>
        <div className={styles.offer__attribute}>{genders.find( gender => gender.id === props.genderId).code}</div>
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
