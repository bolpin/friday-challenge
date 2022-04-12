import React, { useState, useEffect } from "react";

import DeviceList from "./DeviceList";
import styles from './Devices.module.css';
import NewDevice from "./NewDevice";
import useHttp from '../../hooks/use-http';
import { apiRoot } from '../../config';

const Devices = (props) => {

  const [devices, setDevices] = useState([]);
  const { isLoadingDeviceList, fetchDevicesError, sendRequest: fetchDevices } = useHttp();
  const { isLoadingNewDevice, postDeviceError, sendRequest: postDevice } = useHttp();
  const { isLoadingDeleteDevice, deleteDeviceError, sendRequest: deleteDevice } = useHttp();
  const { isLoadingPatchDevice, patchDeviceError, sendRequest: patchDevice } = useHttp();

  useEffect(() => {
    const processFetchedDevices = (fetchedDevices) => {
      setDevices(fetchedDevices);
    };

    fetchDevices(
      { url: `${apiRoot}/devices.json` },
      processFetchedDevices
    );
  }, [fetchDevices]);

  function addDeviceHandler(device) {
    postDevice(
      {
        url: `${apiRoot}/devices.json`,
        method: "POST",
        body: {
          device: device
        },
        headers: {
          'Content-Type': 'application/json'
        }
      },
      (newDevice) => {
        newDevice.key = newDevice.id;
        setDevices(prevDevices => [newDevice, ...prevDevices]);
      }
    );
  }
  
  function updateDeviceHandler(device) {
    const id = device.id;
    delete device.id;
    patchDevice(
      {
        url: `${apiRoot}/devices/${id}.json`,
        method: "PATCH",
        body: {
          device: device
        },
        headers: {
          'Content-Type': 'application/json'
        }
      },
      obj => {}
    );
  }
  
  function deleteDeviceHandler(device) {
    setDevices(prevDevices => prevDevices.filter(
      p => p.id !== device.id
    ));

    deleteDevice(
      {
        url: `${apiRoot}/devices/${device.id}.json`,
        method: "DELETE",
      },
      obj => {}
    );
  }

  let devicesContent = <p className={styles.fallback}>No devices found.</p>
  if (isLoadingNewDevice ||
      isLoadingDeleteDevice ||
      isLoadingPatchDevice ||
      isLoadingDeviceList) {
    devicesContent = <p className={styles.fallback}>Loading...</p>
  }
  if (fetchDevicesError ||
      postDeviceError ||
      deleteDeviceError ||
      patchDeviceError) {
    devicesContent =
    <p className={styles.error}>
      {fetchDevicesError}
      {postDeviceError}
      {deleteDeviceError}
      {patchDeviceError}
    </p>
  }

  if (!isLoadingDeviceList && devices.length > 0) {
    devicesContent =
      <DeviceList
        onDeleteDevice={deleteDeviceHandler}
        onUpdateDevice={updateDeviceHandler}
        items={devices} />
  }
  return (
    <div className={styles.card}>
      <NewDevice onAddDevice={addDeviceHandler}/>
      {devicesContent}
    </div>
  );
};

export default Devices;