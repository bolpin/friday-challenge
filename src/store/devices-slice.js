import { createSlice } from '@reduxjs/toolkit';

const devicesSlice = createSlice({
  name: 'devices',
  initialState: {
    devices: [],
    changed: false,
  },
  reducers: {
    replaceDevices(state, action) {
      state.devices = action.payload.devices
    },
    addDevice(state, action) {
      state.changed = true;
      const newDevice = action.payload;
      state.devices.unshift(newDevice);
    },
    updateDevice(state, action) {
      state.changed = true;
      const updatedDevice = action.payload;
      const existingDevice = state.devices.find((p) => p.id === updatedDevice.id);
      if (existingDevice) {
        existingDevice.gender.id = updatedDevice.gender.id
        existingDevice.gender.name = updatedDevice.gender.name
        existingDevice.first_name = updatedDevice.first_name
        existingDevice.last_name = updatedDevice.last_name
        existingDevice.birthdate = updatedDevice.birthdate
      }
    },
    removeDevice(state, action) {
      state.changed = true;
      const id = action.payload;
      state.devices = state.devices.filter((p) => p.id !== id);
    },
  },
});

export const devicesActions = devicesSlice.actions;

export default devicesSlice;