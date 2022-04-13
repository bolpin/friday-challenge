import React from "react";

import OfferList from "./OfferList";
import styles from './Offers.module.css';
import NewOffer from "./NewOffer";

import { deleteOffer, createOffer, updateOffer } from '../../store/offers-actions';
import { useDispatch, useSelector } from 'react-redux';

const Offers = (props) => {

  const dispatch = useDispatch();

  const offers = useSelector((state) => state.offers.offers);

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