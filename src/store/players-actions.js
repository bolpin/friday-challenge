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

      const data = await response.json();

      return data;
    };

    try {
      const playersData = await fetchData();
      dispatch(
        playersActions.removePlayer(
          playersId
        )
      );
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

export const updatePlayer = (player) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${apiRoot}/players.json`, {
        url: `${apiRoot}/players/${player.id}.json`,
        method: "PATCH",
        body: {
          player: player,
        },
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
      const playersData = await fetchData();
      dispatch(playersActions.updatePlayer(player));
    } catch (error) {
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

export const createPlayer = (player) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${apiRoot}/players.json`, {
        method: "POST",
        body: {
          player: player,
        },
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
      const playersData = await fetchData();
      dispatch(playersActions.addPlayer(player));
    } catch (error) {
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
