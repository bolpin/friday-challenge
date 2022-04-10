import React, { useState, useEffect } from "react";

import OfferList from "./OfferList";
import styles from './Offers.module.css';
import NewOffer from "./NewOffer";
import useHttp from '../../hooks/use-http';
import apiRoot from '../../config';

const Offers = (props) => {

  const alphabeticalByTitle = (a,b) => {
    return a.title > b.title;
  }

  const [offers, setOffers] = useState([]);
  const { isLoadingOfferList, fetchOffersError, sendRequest: fetchOffers } = useHttp();
  const { isLoadingNewOffer, postOfferError, sendRequest: postOffer } = useHttp();
  const { isLoadingDeleteOffer, deleteOfferError, sendRequest: deleteOffer } = useHttp();
  const { isLoadingPatchOffer, patchOfferError, sendRequest: patchOffer } = useHttp();

  useEffect(() => {
    const processFetchedOffers = (fetchedOffers) => {
      setOffers(fetchedOffers.sort(alphabeticalByTitle));
    };

    fetchOffers(
      { url: `${apiRoot}/offers.json` },
      processFetchedOffers
    );
  }, [fetchOffers]);

  function addOfferHandler(offer) {
    postOffer(
      {
        url: `${apiRoot}/offers.json`,
        method: "POST",
        body: {
          offer: offer
        },
        headers: {
          'Content-Type': 'application/json'
        }
      },
      (newOffer) => {
        newOffer.key = newOffer.id;
        setOffers(prevOffers => [newOffer, ...prevOffers]);
      }
    );
  }
  
  function updateOfferHandler(offer) {
    const id = offer.id;
    delete offer.id;
    patchOffer(
      {
        url: `${apiRoot}/offers/${id}.json`,
        method: "PATCH",
        body: {
          offer: offer
        },
        headers: {
          'Content-Type': 'application/json'
        }
      },
      obj => {}
    );
  }
  
  function deleteOfferHandler(offer) {
    setOffers(prevOffers => prevOffers.filter(
      p => p.id !== offer.id
    ));

    deleteOffer(
      {
        url: `${apiRoot}/offers/${offer.id}.json`,
        method: "DELETE",
      },
      obj => {}
    );
  }

  let offersContent = <p className={styles.fallback}>No offers found.</p>
  if (isLoadingNewOffer ||
      isLoadingDeleteOffer ||
      isLoadingPatchOffer ||
      isLoadingOfferList) {
    offersContent = <p className={styles.fallback}>Loading...</p>
  }
  if (fetchOffersError ||
      postOfferError ||
      deleteOfferError ||
      patchOfferError) {
    offersContent =
    <p className={styles.error}>
      {fetchOffersError} 
      {postOfferError} 
      {deleteOfferError}
      {patchOfferError}
    </p>
  }

  if (!isLoadingOfferList && offers.length > 0) {
    offersContent =
      <OfferList
        onDeleteOffer={deleteOfferHandler}
        onUpdateOffer={updateOfferHandler}
        items={offers} />
  }
  return (
    <div className={styles.card}>
      <NewOffer onAddOffer={addOfferHandler}/>
      {offersContent}
    </div>
  );
};

export default Offers;