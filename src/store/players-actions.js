import { uiActions } from "./ui-slice";
import { playersActions } from "./players-slice";
import { apiRoot } from "../config";

export const deletePlayer = (playerId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${apiRoot}/players/${playerId}.json`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Could not delete player");
      }
    };

    try {
      await fetchData();
      dispatch(playersActions.removePlayer(playerId));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Delete player failed",
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
        throw new Error("Could not update player");
      }

      const data = await response.json();
      return data;
    };

    try {
      const player = await fetchData();
      dispatch(playersActions.updatePlayer(player));
    } catch (error) {
      debugger
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Update player failed",
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
        throw new Error("Could not create player");
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
          message: "Create player failed",
        })
      );
    }
  };
};

export const fetchPlayers = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${apiRoot}/players.json`);

      if (!response.ok) {
        throw new Error("Could not fetch players");
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
          status: "error",
          title: "Error",
          message: "Fetching players failed!",
        })
      );
    }
  };
};
