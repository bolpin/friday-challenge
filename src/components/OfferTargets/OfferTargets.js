import React, { useState, useEffect } from "react";

import OfferTargetList from "./OfferTargetList";
import OfferTargetForm from "./OfferTargetForm";
import styles from './OfferTargets.module.css';

import { deleteOfferTarget, createOfferTarget, updateOfferTarget } from '../../store/offer-targets-actions';
import { useDispatch, useSelector } from 'react-redux';

const OfferTargets = (props) => {
  const dispatch = useDispatch();
  const offerTargets = useSelector((state) => state.offerTargets.offerTargets);

  function createOfferTargetHandler(offerTarget) {
    dispatch(createOfferTarget(offerTarget));
  }
  
  function updateOfferTargetHandler(offerTarget) {
    dispatch(updateOfferTarget(offerTarget));
  }
  
  function deleteOfferTargetHandler(offerTarget) {
    dispatch(deleteOfferTarget(offerTarget.id));
  }
  
  return (
    <div className={styles.card}>
      <OfferTargetForm
        id={props.id}
        offerId={props.offer_id}
        minAge={props.min_age}
        maxAge={props.max_age}
        genderId={props.gender_id}
        operatingSystemId={props.operating_system_id}
        minOsVersion={props.min_os_version}
        localeId={props.locale_id}
        updateOfferTarget={props.onUpdateOfferTarget}
        submitAction={createOfferTargetHandler}
        submitButtonText="Create Offer Target"
      />
      <OfferTargetList
        onDeleteOfferTarget={deleteOfferTargetHandler}
        onUpdateOfferTarget={updateOfferTargetHandler}
        items={offerTargets} />
    </div>
  );
};

export default OfferTargets;