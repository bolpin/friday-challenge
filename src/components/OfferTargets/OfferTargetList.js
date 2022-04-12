import React from "react";
import OfferTarget from "./OfferTarget"
import styles from './OfferTargetList.module.css'

function OfferTargetList(props) {

  return (
    <ul className={styles.list}>
      {props.items.map( (offerTarget) => (
        <OfferTarget
          key={offerTarget.id}
          id={offerTarget.id}
          offerId={offerTarget.offer_id}
          minAge={offerTarget.min_player_age}
          maxAge={offerTarget.max_player_age}
          genderId={offerTarget.gender_id}
          operatingSystemId={offerTarget.operating_system_id}
          minOsMajorVersion={offerTarget.min_os_major_version}
          minOsMinorVersion={offerTarget.min_os_minor_version}
          minOsPatchVersion={offerTarget.min_os_patch_version}
          deleteOfferTarget={props.onDeleteOfferTarget}
          updateOfferTarget={props.onUpdateOfferTarget}
        />
      ))}
    </ul>
  );
};

export default OfferTargetList;

