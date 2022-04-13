import { createSlice } from '@reduxjs/toolkit';

const offersSlice = createSlice({
  name: 'offers',
  initialState: {
    offers: [],
    changed: false,
  },
  reducers: {
    replaceOffers(state, action) {
      state.offers = action.payload.offers
    },
    addOffer(state, action) {
      state.changed = true;
      const newOffer = action.payload;
      state.offers.unshift(newOffer);
    },
    updateOffer(state, action) {
      state.changed = true;
      const updatedOffer = action.payload;
      const existingOffer = state.offers.find((p) => p.id === updatedOffer.id);
      debugger
      if (existingOffer) {
        existingOffer.description = updatedOffer.description
        existingOffer.header = updatedOffer.header
        existingOffer.payout_cents = updatedOffer.payout_cents
        existingOffer.points = updatedOffer.points
        existingOffer.title = updatedOffer.title
      }
    },
    removeOffer(state, action) {
      state.changed = true;
      const id = action.payload;
      state.offers = state.offers.filter((p) => p.id !== id);
    },
  },
});

export const offersActions = offersSlice.actions;

export default offersSlice;