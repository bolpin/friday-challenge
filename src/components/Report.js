import React from "react";
import TotalPayoutReport from "./TotalPayoutReport"
import DeviceCountReport from "./DeviceCountReport"
import styles from './Report.module.css'

const Report = () => {

  return (
    <>
      <div className={styles.reports}>
        <TotalPayoutReport />
        <DeviceCountReport />
      </div>
    </>
  );
};

export default Report;