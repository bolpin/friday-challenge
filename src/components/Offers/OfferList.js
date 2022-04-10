import React from "react";
import Offer from "./Offer"
import styles from './OfferList.module.css'

function OfferList(props) {

  return (
    <ul className={styles.list}>
      {props.items.map( (offer) => (
        <Offer
          key={offer.id}
          id={offer.id}
          title={offer.title}
          header={offer.header}
          description={offer.description}
          points={offer.points}
          payoutCents={offer.payout_cents}
          deleteOffer={props.onDeleteOffer}
          updateOffer={props.onUpdateOffer}
        />
      ))}
    </ul>
  );
};

export default OfferList;

