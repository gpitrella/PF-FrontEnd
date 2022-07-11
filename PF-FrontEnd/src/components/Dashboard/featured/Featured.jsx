import React from 'react'
import { useSelector } from "react-redux";

import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  const { totalSalesToday, totalSales, lastSalesWeek, lastSalesMonth } = useSelector((state) => state.dashboard);

  const porcentajeventa = Math.round(totalSalesToday/totalSales*100)

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={porcentajeventa} text={`${porcentajeventa} %`} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">{Math.round(totalSalesToday)}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">{Math.round(lastSalesWeek)}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">{Math.round(lastSalesMonth)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
