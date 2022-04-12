import React, { useState, useEffect } from "react";
import useHttp from "./use-http";
import { apiRoot } from "../config";

const useDevices = () => {
  const [devices, setDevices] = useState([]);

  const {
    isLoadingDeviceList,
    fetchDevicesError,
    sendRequest: fetchDevices,
  } = useHttp();

  const {
    isLoadingNewDevice,
    postDeviceError,
    sendRequest: postDevice,
  } = useHttp();

  const {
    isLoadingDeleteDevice,
    deleteDeviceError,
    sendRequest: deleteDevice,
  } = useHttp();

  const {
    isLoadingPatchDevice,
    patchDeviceError,
    sendRequest: patchDevice,
  } = useHttp();

  useEffect(() => {
    fetchDevicesHandler();
  }, []);

  function fetchDevicesHandler(device) {
    postDevice(
      {
        url: `${apiRoot}/devices.json`,
      }, result => setDevices(result)
    )
  }

  function createDeviceHandler(device) {
    postDevice(
      {
        url: `${apiRoot}/devices.json`,
        method: "POST",
        body: {
          device: device,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      (newDevice) => {
        newDevice.key = newDevice.id;
        setDevices((prevDevices) => [newDevice, ...prevDevices]);
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
          device: device,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      () => {}
    );
  }

  function deleteDeviceHandler(device) {
    setDevices((prevDevices) => prevDevices.filter((p) => p.id !== device.id));

    deleteDevice(
      {
        url: `${apiRoot}/devices/${device.id}.json`,
        method: "DELETE",
      },
      () => {}
    );
  }

  return {
    devices,
    fetchDevices: fetchDevicesHandler,
    createDevice: createDeviceHandler,
    updateDevice: updateDeviceHandler,
    deleteDevice: deleteDevice, 
    playersDevice: (pId) => devices.find( device => device.playerId = pId)
  };
};

export default useDevices;
