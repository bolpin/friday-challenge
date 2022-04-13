import { uiActions } from "./ui-slice";
import { operatingSystemsActions } from "./operating-systems-slice";
import { apiRoot } from "../config";

export const fetchOperatingSystems = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${apiRoot}/operating_systems.json`);

      if (!response.ok) {
        throw new Error(`Could not fetch operating systems. (${response.status} ${response.statusText})`);
      }

      const data = await response.json();

      return data;
    };

    try {
      const operatingSystemsData = await fetchData();
      dispatch(
        operatingSystemsActions.replaceOperatingSystems({
          operatingSystems: operatingSystemsData || [],
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