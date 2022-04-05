import React from "react";
import Card from "../UI/Card"
import TotalPayoutReport from "./TotalPayoutReport"
import DeviceCountReport from "./DeviceCountReport"
import './Report.css'

const Report = () => {

  return (
    <>
      <Card className='report'>
        <TotalPayoutReport />
        <DeviceCountReport />
      </Card>
    </>
  );
};

export default Report;