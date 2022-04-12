import { createSlice } from '@reduxjs/toolkit';

const alphabeticalByTitle = (a, b) => {
  return a.title > b.title;
};

const offerTargetsSlice = createSlice({
  name: 'offerTargets',
  initialState: {
    offerTargets: [],
    changed: false,
  },
  reducers: {
    replaceOfferTargets(state, action) {
      state.offerTargets = action.payload.offerTargets.sort(alphabeticalByTitle);
    },
    addOfferTarget(state, action) {
      state.changed = true;
      const newOfferTarget = action.payload;
      state.offerTargets.unshift(newOfferTarget);
    },
    updateOfferTarget(state, action) {
      state.changed = true;
      const updatedOfferTarget = action.payload;
      const existingOfferTarget = state.offerTargets.find((p) => p.id === updatedOfferTarget.id);
      debugger
      if (existingOfferTarget) {
        existingOfferTarget.gender.id = updatedOfferTarget.gender.id
        existingOfferTarget.gender.name = updatedOfferTarget.gender.name
        existingOfferTarget.first_name = updatedOfferTarget.first_name
        existingOfferTarget.last_name = updatedOfferTarget.last_name
        existingOfferTarget.birthdate = updatedOfferTarget.birthdate
      }
    },
    removeOfferTarget(state, action) {
      state.changed = true;
      const id = action.payload;
      state.offerTargets = state.offerTargets.filter((p) => p.id !== id);
    },
  },
});

export const offerTargetsActions = offerTargetsSlice.actions;

export default offerTargetsSlice;