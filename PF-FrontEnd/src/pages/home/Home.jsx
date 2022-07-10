import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";

import Sidebar from "../../components/Dashboard/sidebar/Sidebar";
import "./home.scss";
import Widget from "../../components/Dashboard/widget/Widget";
import Featured from "../../components/Dashboard/featured/Featured";
import Chart from "../../components/Dashboard/chart/Chart";
import Table from "../../components/Dashboard/table/Table";
import { countAllOrders, getAllUsers, sumAllOrders, sumAllToday, sumBeforeLastMonth, sumLastMonth, sumLastThreeMonth, sumLastWeek } from '../../redux/actions';
import { Link } from 'react-router-dom';

const Home = () => {

  const dispatch = useDispatch();

  const { allusers } = useSelector((state) => state.userReducer);
  const { countOrders, totalSales, totalSalesToday, lastSalesWeek, lastSalesMonth, beforeLastMonth, lastThreeMonth } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(countAllOrders());
    dispatch(sumAllOrders());
    dispatch(sumAllToday());
    dispatch(sumLastWeek());
    dispatch(sumLastMonth());
    dispatch(sumBeforeLastMonth());
    dispatch(sumLastThreeMonth())
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  
  //console.log(countOrders, totalSales, totalSalesToday, 'cant. ordenes / total ventas / total ventas hoy')

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        
        <div className="widgets">
          <Link to="/admin/users/list" style={{ textDecoration: "none" }}>
          <Widget type="user" />
          </Link>
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 3 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
