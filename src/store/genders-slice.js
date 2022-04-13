import { createSlice } from '@reduxjs/toolkit';

const gendersSlice = createSlice({
  name: 'genders',
  initialState: {
    genders: [],
    changed: false,
  },
  reducers: {
    replaceGenders(state, action) {
      state.genders = action.payload.genders;
    },
  },
});

export const gendersActions = gendersSlice.actions;

export default gendersSlice;