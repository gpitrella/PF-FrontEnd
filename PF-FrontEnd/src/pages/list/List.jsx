import "./list.scss"
import Sidebar from "../../components/Dashboard/sidebar/Sidebar"
import Navbar from "../../components/Dashboard/navbar/Navbar"
import Datatable from "../../components/Dashboard/datatable/Datatable"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        
        <Datatable/>
      </div>
    </div>
  )
}

export default List