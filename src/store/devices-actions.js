import { uiActions } from "./ui-slice";
import { devicesActions } from "./devices-slice";
import { apiRoot } from "../config";

export const deleteDevice = (deviceId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${apiRoot}/devices/${deviceId}.json`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Could not delete device. (${response.status} ${response.statusText})`);
      }
    };

    try {
      await fetchData();
      dispatch(devicesActions.removeDevice(deviceId));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: error.message
        })
      );
    }
  };
};

export const updateDevice = (deviceData) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const id = deviceData.id;
      delete deviceData.id;
      const response = await fetch(`${apiRoot}/devices/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify({
          device: deviceData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Could not update device. (${response.status} ${response.statusText})`);
      }

      const data = await response.json();
      return data;
    };

    try {
      const device = await fetchData();
      dispatch(devicesActions.updateDevice(device));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: error.message,
        })
      );
    }
  };
};

export const createDevice = (deviceData) => {
  return async (dispatch) => {
    const fetchData = async () => {
      debugger
      const response = await fetch(`${apiRoot}/devices.json`, {
        method: "POST",
        body: JSON.stringify({
          device: deviceData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Could not create device. (${response.status} ${response.statusText})`);
      }
      const data = await response.json();
      return data;
    };

    try {
      const newDevice = await fetchData();
      debugger
      dispatch(devicesActions.addDevice(newDevice));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: error.message,
        })
      );
    }
  };
};

export const fetchDevices = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${apiRoot}/devices.json`);

      if (!response.ok) {
        throw new Error(`Could not fetch devices. (${response.status} ${response.statusText})`);
      }

      const data = await response.json();

      return data;
    };

    try {
      const devicesData = await fetchData();
      dispatch(
        devicesActions.replaceDevices({
          devices: devicesData || [],
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: error.message,
        })
      );
    }
  };
};
