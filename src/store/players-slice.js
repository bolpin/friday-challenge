import { createSlice } from '@reduxjs/toolkit';

const playersSlice = createSlice({
  name: 'players',
  initialState: {
    players: [],
    changed: false,
  },
  reducers: {
    replacePlayers(state, action) {
      state.players = action.payload.players;
    },
    addPlayer(state, action) {
      const newPlayer = action.payload;
      state.changed = true;
      state.players.push({
        id: newPlayer.id,
        first_name: newPlayer.firstName,
        last_name: newPlayer.lastName,
        birthdate: newPlayer.birthdate,
        gender_id: newPlayer.genderId,
      });
    },
    removePlayer(state, action) {
      const id = action.payload;
      const existingPlayer = state.players.find((p) => p.id === id);
      state.changed = true;
      state.players = state.players.filter((p) => p.id !== id);
    },
  },
});

export const playersActions = playersSlice.actions;

export default playersSlice;