import { uiActions } from "./ui-slice";
import { localesActions } from "./locales-slice";
import { apiRoot } from "../config";

export const fetchLocales = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${apiRoot}/locales.json`);

      if (!response.ok) {
        throw new Error(`Could not fetch locales. (${response.status} ${response.statusText})`);
      }

      const data = await response.json();

      return data;
    };

    try {
      const localesData = await fetchData();
      dispatch(
        localesActions.replaceLocales({
          locales: localesData || [],
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