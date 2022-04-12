import { createSlice } from '@reduxjs/toolkit';

const localesSlice = createSlice({
  name: 'locales',
  initialState: {
    locales: [],
    changed: false,
  },
  reducers: {
    replaceLocales(state, action) {
      state.locales = action.payload.locales;
    },
  },
});

export const localesActions = localesSlice.actions;

export default localesSlice;