import { uiActions } from "./ui-slice";
import { localesActions } from "./locales-slice";

export const fetchLocales = () => {
  return async (dispatch) => {
    try {
      dispatch(
        localesActions.replaceLocales({
          locales: [
            {
              id: 1,
              code: "en_US",
            },
            {
              id: 2,
              code: "es_AR",
            },
            {
              id: 3,
              code: "es_MX",
            },
            {
              id: 4,
              code: "zh_TW",
            },
          ],
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching locales failed!",
        })
      );
    }
  };
};

