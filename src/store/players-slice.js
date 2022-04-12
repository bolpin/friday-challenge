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
      state.changed = true;
      const newPlayer = action.payload.newPlayer;
      state.players.push({
        id: newPlayer.id,
        first_name: newPlayer.firstName,
        last_name: newPlayer.lastName,
        birthdate: newPlayer.birthdate,
        gender_id: newPlayer.genderId,
      });
    },
    updatePlayer(state, action) {
      state.changed = true;
      const playerId = action.payload.id;
      const existingPlayer = state.players.find((p) => p.id === id);
      existingPlayer.gender_id = action.payload.genderId
      existingPlayer.first_name = action.payload.firstName
      existingPlayer.last_name = action.payload.firstName
      existingPlayer.birthdate = action.payload.firstName
    },
    removePlayer(state, action) {
      state.changed = true;
      const id = action.payload;
      const existingPlayer = state.players.find((p) => p.id === id);
      state.players = state.players.filter((p) => p.id !== id);
    },
  },
});

export const playersActions = playersSlice.actions;

export default playersSlice;