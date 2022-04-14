import React, { useState, useEffect } from "react";

import NewOfferTarget from "./NewOfferTarget";
import OfferTargetList from "./OfferTargetList";
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
      <NewOfferTarget
        onCreateOfferTarget={createOfferTargetHandler}
      />
      <OfferTargetList
        onDeleteOfferTarget={deleteOfferTargetHandler}
        onUpdateOfferTarget={updateOfferTargetHandler}
        items={offerTargets} />
    </div>
  );
};

export default OfferTargets;