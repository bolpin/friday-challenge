import { uiActions } from "./ui-slice";
import { playersActions } from "./players-slice";
import { apiRoot } from "../config";

// Redux toolkit provides us with action-creators when we call
// createSlice.  The action-creator is accessible through
// slice.actions.
//
// We can also create our own action-creator-thunks that in turn
// dispatch to the automatically-generated ones, such as we do
// below.
//
// deletePlayer, e.g., is an action creator that returns
// an action object to be dispatched later. This is a way to handle
// async side-effects and keep the code out of components, for
// better clarity and code re-use.
//
// The point of all this is to provide a place where we can run
// side-effect code such as talking to the DB in an asynchronous
// way *prior* to running the reducer code that will update the
// state.  As shown here, we can modify different parts of the
// state after we've executed our side-effect code by 
// dispatching to various parts of the state: ui-notifications
// as well as players, for example.  This can be thought of as
// a flow of side-effects.

// Of course, we could do this stuff in components using useEffect,
// but that would create somewhat cluttered components.
export const deletePlayer = (playerId) => {

  // notice how these can be asynchronous, if needed.
  // Redux will actually invoke this method for us when it sees that 
  // we have created an action-creator that returns this function.
  return async (dispatch) => {
    
    // yet another level of nesting is necessary, so that we can wrap our
    // api calls in a try/catch block
    const fetchData = async () => {
      const response = await fetch(`${apiRoot}/players/${playerId}.json`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Could not delete player. (${response.status} ${response.statusText})`);
      }
    };

    try {
      await fetchData();
      dispatch(playersActions.removePlayer(playerId));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error deleting",
          message: error.message
        })
      );
    }
  };
};

export const updatePlayer = (playerData) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const id = playerData.id;
      delete playerData.id;
      const response = await fetch(`${apiRoot}/players/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify({
          player: playerData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Could not update player. (${response.status} ${response.statusText})`);
      }

      const data = await response.json();
      return data;
    };

    try {
      const player = await fetchData();
      dispatch(playersActions.updatePlayer(player));
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

export const createPlayer = (playerData) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${apiRoot}/players.json`, {
        method: "POST",
        body: JSON.stringify({
          player: playerData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Could not create player. (${response.status} ${response.statusText})`);
      }
      const data = await response.json();
      return data;
    };

    try {
      const newPlayer = await fetchData();
      dispatch(playersActions.addPlayer(newPlayer));
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

export const fetchPlayers = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      // // Here is where we could initialize some "spinner":
      // dispatch(
      //   uiActions.showNotification({
      //     status: "pending",
      //     title: "Pending action",
      //     message: "Fetching players..."
      //   })
      // );
      const response = await fetch(`${apiRoot}/players.json`);

      if (!response.ok) {
        throw new Error(`Could not fetch players. (${response.status} ${response.statusText})`);
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
      // ... and hide the "spinner"
      // dispatch(
      //   uiActions.hideNotification({})
      // );
      // ... or show success msg:
      // dispatch(
      //   uiActions.showNotification({
      //     status: "success",
      //     title: "Success",
      //     message: "Players Fetched",
      //   })
      // );
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
