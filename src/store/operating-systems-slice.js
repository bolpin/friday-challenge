import { createSlice } from '@reduxjs/toolkit';

const operatingSystemsSlice = createSlice({
  name: 'operatingSystems',
  initialState: {
    operatingSystems: [],
    changed: false,
  },
  reducers: {
    replaceOperatingSystems(state, action) {
      state.operatingSystems = action.payload.operatingSystems;
    },
  },
});

export const operatingSystemsActions = operatingSystemsSlice.actions;

export default operatingSystemsSlice;