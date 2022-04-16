import { createSlice } from '@reduxjs/toolkit';

const alphabeticalByName = (a, b) => {
  if (a.last_name === b.last_name) {
    return a.first_name > b.first_name ? 1 : -1;
  }
  return a.last_name > b.last_name ? 1 : -1;
};

const playersSlice = createSlice({
  name: 'players',
  initialState: {
    players: [],
    changed: false,
  },
  reducers: {
    replacePlayers(state, action) {
      state.players = action.payload.players.sort(alphabeticalByName);
    },
    addPlayer(state, action) {
      state.changed = true;
      const newPlayer = action.payload;
      state.players.unshift(newPlayer);
    },
    updatePlayer(state, action) {
      state.changed = true;
      const updatedPlayer = action.payload;
      const existingPlayer = state.players.find((p) => p.id === updatedPlayer.id);
      if (existingPlayer) {
        existingPlayer.gender.id = updatedPlayer.gender.id
        existingPlayer.gender.name = updatedPlayer.gender.name
        existingPlayer.first_name = updatedPlayer.first_name
        existingPlayer.last_name = updatedPlayer.last_name
        existingPlayer.birthdate = updatedPlayer.birthdate
      }
    },
    removePlayer(state, action) {
      state.changed = true;
      const id = action.payload;
      state.players = state.players.filter((p) => p.id !== id);
    },
  },
});

// this is the actual redux-toolkit-generated "action-creator"
// it provides the reducers we need to update the state.
export const playersActions = playersSlice.actions;

export default playersSlice;