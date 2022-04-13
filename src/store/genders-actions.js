import { uiActions } from "./ui-slice";
import { gendersActions } from "./genders-slice";
import { apiRoot } from "../config";

export const fetchGenders = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${apiRoot}/genders.json`);

      if (!response.ok) {
        throw new Error(`Could not fetch genders. (${response.status} ${response.statusText})`);
      }

      const data = await response.json();

      return data;
    };

    try {
      const gendersData = await fetchData();
      dispatch(
        gendersActions.replaceGenders({
          genders: gendersData || [],
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