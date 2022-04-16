import React, { useState, useEffect } from "react";

import NewOfferTarget from "./NewOfferTarget";
import OfferTargetList from "./OfferTargetList";
import styles from './OfferTargets.module.css';

import { deleteOfferTarget, createOfferTarget, updateOfferTarget } from '../../store/offer-targets-actions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOfferTargets } from '../../store/offer-targets-actions';
import { fetchOffers } from '../../store/offers-actions';
import { fetchGenders } from '../../store/genders-actions';
import { fetchLocales } from '../../store/locales-actions';
import { fetchOperatingSystems } from '../../store/operating-systems-actions';


const OfferTargets = (props) => {

  const dispatch = useDispatch();
  const offerTargets = useSelector((state) => state.offerTargets.offerTargets);
  const genders = useSelector((state) => state.genders.genders);

  useEffect(() => {
    // load up the db data into state slices:
    dispatch(fetchOffers());
    dispatch(fetchOperatingSystems());
    dispatch(fetchGenders());
    dispatch(fetchOfferTargets());
    dispatch(fetchLocales());
  }, [dispatch]);

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