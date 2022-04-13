import React, { useState, useEffect } from "react";

import DeviceList from "./DeviceList";
import styles from './Devices.module.css';
import NewDevice from "./NewDevice";

import { deleteDevice, createDevice, updateDevice } from '../../store/devices-actions';
import { useDispatch, useSelector } from 'react-redux';

const Devices = (props) => {


  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices.devices);

  function addDeviceHandler(deviceData) {
    const [major_vers,
      minor_vers,
      patch_vers] = deviceData.operating_system_version.match(/^(\d+).(\d+).(\d+)$/).slice(1,4);

    const device = {
      ...deviceData,
      os_major_version: major_vers,
      os_minor_version: minor_vers,
      os_patch_version: patch_vers,
    }
    delete device.operating_system_version
    dispatch(createDevice(device));
  }

  function updateDeviceHandler(device) {
    dispatch(updateDevice(device));
  }

  function deleteDeviceHandler(device) {
    dispatch(deleteDevice(device.id));
  }

  return (
    <div className={styles.card}>
      <NewDevice onAddDevice={addDeviceHandler}/>
      <DeviceList
        onDeleteDevice={deleteDeviceHandler}
        onUpdateDevice={updateDeviceHandler}
        items={devices} />
    </div>
  );
};

export default Devices;