import { uiActions } from "./ui-slice";
import { offersActions } from "./offers-slice";
import { apiRoot } from "../config";

export const deleteOffer = (offerId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${apiRoot}/offers/${offerId}.json`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Could not delete offer. (${response.status} ${response.statusText})`);
      }
    };

    try {
      await fetchData();
      dispatch(offersActions.removeOffer(offerId));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: error.message
        })
      );
    }
  };
};

export const updateOffer = (offerData) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const id = offerData.id;
      delete offerData.id;
      const response = await fetch(`${apiRoot}/offers/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify({
          offer: offerData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Could not update offer. (${response.status} ${response.statusText})`);
      }

      const data = await response.json();
      return data;
    };

    try {
      const offer = await fetchData();
      dispatch(offersActions.updateOffer(offer));
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

export const createOffer = (offerData) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${apiRoot}/offers.json`, {
        method: "POST",
        body: JSON.stringify({
          offer: offerData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Could not create offer. (${response.status} ${response.statusText})`);
      }
      const data = await response.json();
      return data;
    };

    try {
      const newOffer = await fetchData();
      dispatch(offersActions.addOffer(newOffer));
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

export const fetchOffers = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${apiRoot}/offers.json`);

      if (!response.ok) {
        throw new Error(`Could not fetch offers. (${response.status} ${response.statusText})`);
      }

      const data = await response.json();

      return data;
    };

    try {
      const offersData = await fetchData();
      dispatch(
        offersActions.replaceOffers({
          offers: offersData || [],
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
