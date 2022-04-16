import React from "react";
import TotalPayoutReport from "./TotalPayoutReport"
import DeviceCountReport from "./DeviceCountReport"
import MatchingPlayersReport from "./MatchingPlayersReport"
import styles from './Reports.module.css'

const Reports = () => {

  return (
    <>
      <div className={styles.reports}>
        <TotalPayoutReport />
        <DeviceCountReport />
        <MatchingPlayersReport />
      </div>
    </>
  );
};

export default Reports;