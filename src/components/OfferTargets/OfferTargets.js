import React, { useState, useEffect } from "react";

import OfferTargetList from "./OfferTargetList";
import styles from './OfferTargets.module.css';
import OfferTargetForm from "./OfferTargetForm";
import useHttp from '../../hooks/use-http';
import { apiRoot } from '../../config';

const OfferTargets = (props) => {

  const [offerTargets, setOfferTargets] = useState([]);
  const { isLoadingOfferTargetList, fetchOfferTargetsError, sendRequest: fetchOfferTargets } = useHttp();
  const { isLoadingNewOfferTarget, postOfferTargetError, sendRequest: postOfferTarget } = useHttp();
  const { isLoadingDeleteOfferTarget, deleteOfferTargetError, sendRequest: deleteOfferTarget } = useHttp();
  const { isLoadingPatchOfferTarget, patchOfferTargetError, sendRequest: patchOfferTarget } = useHttp();

  useEffect(() => {
    const processFetchedOfferTargets = (fetchedOfferTargets) => {
      setOfferTargets(fetchedOfferTargets);
    };

    fetchOfferTargets(
      { url: `${apiRoot}/offer_targets.json` },
      processFetchedOfferTargets
    );
  }, [fetchOfferTargets]);

  function createOfferTargetHandler(offer) {
    postOfferTarget(
      {
        url: `${apiRoot}/offer_targets.json`,
        method: "POST",
        body: {
          offer: offer
        },
        headers: {
          'Content-Type': 'application/json'
        }
      },
      (newOfferTarget) => {
        newOfferTarget.key = newOfferTarget.id;
        setOfferTargets(prevOfferTargets => [newOfferTarget, ...prevOfferTargets]);
      }
    );
  }
  
  function updateOfferTargetHandler(offer) {
    const id = offer.id;
    delete offer.id;
    patchOfferTarget(
      {
        url: `${apiRoot}/offer_targets/${id}.json`,
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

  function deleteOfferTargetHandler(offer) {
    setOfferTargets(prevOfferTargets => prevOfferTargets.filter(
      p => p.id !== offer.id
    ));

    deleteOfferTarget(
      {
        url: `${apiRoot}/offer_targets/${offer.id}.json`,
        method: "DELETE",
      },
      obj => {}
    );
  }

  let offerTargetsContent = <p className={styles.fallback}>No offer targets found.</p>
  if (isLoadingNewOfferTarget ||
      isLoadingDeleteOfferTarget ||
      isLoadingPatchOfferTarget ||
      isLoadingOfferTargetList) {
    offerTargetsContent = <p className={styles.fallback}>Loading...</p>
  }
  if (fetchOfferTargetsError ||
      postOfferTargetError ||
      deleteOfferTargetError ||
      patchOfferTargetError) {
    offerTargetsContent =
    <p className={styles.error}>
      {fetchOfferTargetsError}
      {postOfferTargetError}
      {deleteOfferTargetError}
      {patchOfferTargetError}
    </p>
  }

  if (!isLoadingOfferTargetList && offerTargets.length > 0) {
    offerTargetsContent =
      <OfferTargetList
        onDeleteOfferTarget={deleteOfferTargetHandler}
        onUpdateOfferTarget={updateOfferTargetHandler}
        items={offerTargets} />
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
        props={props.locale_id}
        updateOfferTarget={props.onUpdateOfferTarget}
        submitAction={createOfferTargetHandler}
        submitButtonText="Create Offer Target"
      />
      {/* <NewOfferTarget onCreateOfferTarget={createOfferTargetHandler}/> */}
      {offerTargetsContent}
    </div>
  );
};

export default OfferTargets;