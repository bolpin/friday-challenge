import { uiActions } from "./ui-slice";
import { offerTargetsActions } from "./offer-targets-slice";
import { apiRoot } from "../config";

export const deleteOfferTarget = (offerTargetId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${apiRoot}/offer_targets/${offerTargetId}.json`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Could not delete offer target. (${response.status} ${response.statusText})`);
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
          message: error.message,
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
          offer_target: offerTargetData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Could not update offer target. (${response.status} ${response.statusText})`);
      }

      const data = await response.json();
      return data;
    };

    try {
      const offerTarget = await fetchData();
      dispatch(offerTargetsActions.updateOfferTarget(offerTarget));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: error.message,
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
          offer_target: offerTargetData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Could not create offer target. (${response.status} ${response.statusText})`);
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
          message: error.message,
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
        throw new Error(`Could not fetch offer target. (${response.status} ${response.statusText})`);
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
          message: error.message,
        })
      );
    }
  };
};

export const fetchMatchingPlayers = (offerTargetId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${apiRoot}/offer_target_players/index/${offerTargetId}.json`);

      if (!response.ok) {
        throw new Error(`Could not fetch matching players. (${response.status} ${response.statusText})`);
      }

      const data = await response.json();

      return data;
    };

    try {
      const matchingPlayersData = await fetchData();
      dispatch(
        offerTargetsActions.replaceMatchingPlayers({
          matchingPlayers: matchingPlayersData || [],
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: error.message,
        })
      );
    }
  };
};
