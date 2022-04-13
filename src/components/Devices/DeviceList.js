import React from "react";
import Device from "./Device"
import styles from './DeviceList.module.css'

function DeviceList(props) {

  return (
    <ul className={styles.list}>
      {props.items.map( (device) => (
        <Device
          key={device.id}
          id={device.id}
          model={device.model}
          playerId={device.player_id}
          operatingSystemId={device.operating_system_id}
          operatingSystemVersion={
            `${device.os_major_version}.${device.os_minor_version}.${device.os_patch_version}`
          }
          localeId={device.locale_id}
          deleteDevice={props.onDeleteDevice}
          updateDevice={props.onUpdateDevice}
        />
      ))}
    </ul>
  );
};

export default DeviceList;

