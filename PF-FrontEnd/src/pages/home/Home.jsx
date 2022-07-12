import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

import Sidebar from "../../components/Dashboard/sidebar/Sidebar";
import "./home.scss";
import Widget from "../../components/Dashboard/widget/Widget";
import Featured from "../../components/Dashboard/featured/Featured";
import Chart from "../../components/Dashboard/chart/Chart";
import Table from "../../components/Dashboard/table/Table";
import { countAllOrders, getAllUsers, getOrdersToday, sumAllOrders, sumAllToday, sumBeforeLastMonth, sumLastMonth, sumLastThreeMonth, sumLastWeek } from '../../redux/actions';
import { Link } from 'react-router-dom';

const Home = () => {

  const dispatch = useDispatch();

  const { allusers } = useSelector((state) => state.userReducer);
  const { countOrders, totalSales, totalSalesToday, lastSalesWeek, lastSalesMonth, beforeLastMonth, lastThreeMonth, allOrdersToday } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(countAllOrders());
    dispatch(sumAllOrders());
    dispatch(sumAllToday());
    dispatch(sumLastWeek());
    dispatch(sumLastMonth());
    dispatch(sumBeforeLastMonth());
    dispatch(sumLastThreeMonth());
    dispatch(getOrdersToday())
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        
        <div className="widgets">
          <Link to="/admin/users/list" style={{ textDecoration: "none" }}>
            <Widget type="user" />
          </Link>
          <Link to = '/admin/purchases/list'>
            <Widget type="order" />
          </Link>
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
