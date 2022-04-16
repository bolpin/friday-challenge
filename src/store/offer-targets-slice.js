import { createSlice } from '@reduxjs/toolkit';

const alphabeticalByTitle = (a, b) => {
  return a.title > b.title ? 1 : -1;
};

const alphabeticalByNames = (a, b) => {
  if (a.last_name === b.last_name) {
    return a.first_name > b.first_name ? 1 : -1;
  }
  return a.last_name > b.last_name ? 1 : -1;
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
    replaceMatchingPlayers(state, action) {
      state.matchingPlayers = action.payload.matchingPlayers.sort(alphabeticalByNames);
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
      if (existingOfferTarget) {
        existingOfferTarget.gender_id = updatedOfferTarget.gender_id;
        existingOfferTarget.locale_id = updatedOfferTarget.locale_id;
        existingOfferTarget.min_os_major_version = updatedOfferTarget.min_os_major_version;
        existingOfferTarget.min_os_minor_version = updatedOfferTarget.min_os_minor_version;
        existingOfferTarget.min_os_patch_version = updatedOfferTarget.min_os_patch_version;
        existingOfferTarget.min_player_age = updatedOfferTarget.min_player_age;
        existingOfferTarget.offer_id = updatedOfferTarget.offer_id;
        existingOfferTarget.operating_system_id = updatedOfferTarget.operating_system_id;
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