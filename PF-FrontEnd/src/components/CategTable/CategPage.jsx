import "./CategPage.scss"
import Sidebar from "../Dashboard/sidebar/Sidebar";
import Navbar from "../Dashboard/navbar/Navbar";
import { CategSource } from "./CategTableSource";

const CategPage = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <CategSource/>
      </div>
    </div>
  )
}

export default CategPage;