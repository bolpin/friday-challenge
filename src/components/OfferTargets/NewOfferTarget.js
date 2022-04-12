import React from "react";
import OfferTargetForm from "./OfferTargetForm";

function NewOfferTarget(props) {

  return (
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
      submitAction={props.onCreateOfferTarget}
      submitButtonText="Create Offer Target"
  />
  );
}

export default NewOfferTarget;
