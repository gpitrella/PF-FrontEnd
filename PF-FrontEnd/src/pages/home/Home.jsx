import Sidebar from "../../components/Dashboard/sidebar/Sidebar";
import Navbar from "../../components/Dashboard/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/Dashboard/widget/Widget";
import Featured from "../../components/Dashboard/featured/Featured";
import Chart from "../../components/Dashboard/chart/Chart";
import Table from "../../components/Dashboard/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
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
