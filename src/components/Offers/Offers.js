import React, { useEffect } from "react";

import OfferList from "./OfferList";
import styles from './Offers.module.css';
import NewOffer from "./NewOffer";

import { deleteOffer, createOffer, updateOffer } from '../../store/offers-actions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOffers } from '../../store/offers-actions';


const Offers = (props) => {

  const dispatch = useDispatch();

  const offers = useSelector((state) => state.offers.offers);


  useEffect(() => {
    // load up the db data into state slices:
    dispatch(fetchOffers());
    // dispatch(fetchPlayers());
    // dispatch(fetchDevices());
    // dispatch(fetchLocales());
    // dispatch(fetchOperatingSystems());
    // dispatch(fetchOfferTargets());
    // dispatch(fetchGenders());
  }, [dispatch]);

  function addOfferHandler(offer) {
    dispatch(createOffer(offer));
  }

  function updateOfferHandler(offer) {
    dispatch(updateOffer(offer));
  }

  function deleteOfferHandler(offer) {
    dispatch(deleteOffer(offer.id));
  }

  // const alphabeticalByTitle = (a,b) => {
  //   return a.title > b.title;
  // }


  return (
    <div className={styles.card}>
      <NewOffer onAddOffer={addOfferHandler}/>
      <OfferList
        onDeleteOffer={deleteOfferHandler}
        onUpdateOffer={updateOfferHandler}
        items={offers} />
    </div>
  );
};

export default Offers;