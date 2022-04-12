import { uiActions } from './ui-slice';
import { playersActions } from './players-slice';
import { apiRoot } from '../config';

export const fetchPlayers = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${apiRoot}/players.json`
      );

      if (!response.ok) {
        throw new Error('Could not fetch players!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const playersData = await fetchData();
      dispatch(
        playersActions.replacePlayers({
          players: playersData || [],
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching players failed!',
        })
      );
    }
  };
};
