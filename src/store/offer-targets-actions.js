import { uiActions } from "./ui-slice";
import { offerTargetsActions } from "./offer-targets-slice";
import { apiRoot } from "../config";

export const deleteOfferTarget = (offerTargetId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${apiRoot}/offerTargets/${offerTargetId}.json`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Could not delete offerTarget");
      }
    };

    try {
      await fetchData();
      dispatch(offerTargetsActions.removeOfferTarget(offerTargetId));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Delete offerTarget failed",
        })
      );
    }
  };
};

export const updateOfferTarget = (offerTargetData) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const id = offerTargetData.id;
      delete offerTargetData.id;
      const response = await fetch(`${apiRoot}/offer_targets/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify({
          offerTarget: offerTargetData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Could not update offerTarget");
      }

      const data = await response.json();
      return data;
    };

    try {
      const offerTarget = await fetchData();
      dispatch(offerTargetsActions.updateOfferTarget(offerTarget));
    } catch (error) {
      debugger
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Update offerTarget failed",
        })
      );
    }
  };
};

export const createOfferTarget = (offerTargetData) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${apiRoot}/offer_targets.json`, {
        method: "POST",
        body: JSON.stringify({
          offerTarget: offerTargetData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Could not create offerTarget");
      }
      const data = await response.json();
      return data;
    };

    try {
      const newOfferTarget = await fetchData();
      dispatch(offerTargetsActions.addOfferTarget(newOfferTarget));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Create offerTarget failed",
        })
      );
    }
  };
};

export const fetchOfferTargets = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${apiRoot}/offer_targets.json`);

      if (!response.ok) {
        throw new Error("Could not fetch offerTargets");
      }

      const data = await response.json();

      return data;
    };

    try {
      const offerTargetsData = await fetchData();
      dispatch(
        offerTargetsActions.replaceOfferTargets({
          offerTargets: offerTargetsData || [],
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Fetching offerTargets failed!",
        })
      );
    }
  };
};
