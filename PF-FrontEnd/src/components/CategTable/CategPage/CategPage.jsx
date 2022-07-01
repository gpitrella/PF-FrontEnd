import "./CategPage.scss"
import Sidebar from "../../Dashboard/sidebar/Sidebar";
import Navbar from "../../Dashboard/navbar/Navbar";
import { CategoryTable } from "../CategTable/CategTableSource";

const CategPage = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <CategoryTable/>
      </div>
    </div>
  )
}

export default CategPage;