import "./BrandsPage.scss"
import Sidebar from "../Dashboard/sidebar/Sidebar";
import Navbar from "../Dashboard/navbar/Navbar";
import { BrandsSource } from "./BrandsTableSource";

const BrandsPage = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <BrandsSource/>
      </div>
    </div>
  )
}

export default BrandsPage;