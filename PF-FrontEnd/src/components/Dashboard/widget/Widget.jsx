import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";


const Widget = ({ type }) => {
  let data;
  
  const { allusers } = useSelector((state) => state.userReducer);
  const { countOrders, totalSales } = useSelector((state) => state.dashboard);

  let totalusers = allusers.length
  let totalSale = Math.round(totalSales*0.20)

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "TOTAL SALES",
        isMoney: true,
        link: "",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.title === 'TOTAL SALES' && `$ ${Math.round(totalSales)}`}
          {data.title === "USERS" && `${totalusers}`}
          {data.title === "ORDERS" && `${countOrders}`}
          {data.title === 'EARNINGS' && `$ ${totalSale}`}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {data.title === 'EARNINGS' && <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>}
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
