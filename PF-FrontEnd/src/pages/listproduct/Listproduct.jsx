import "./listproduct.scss"
import Sidebar from "../../components/Dashboard/sidebar/Sidebar"
import Navbar from "../../components/Dashboard/navbar/Navbar"
//import Datatable from "../../components/datatable/Datatable"
import Table from "../../components/Dashboard/table/Table"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Table/>
      </div>
    </div>
  )
}

export default List