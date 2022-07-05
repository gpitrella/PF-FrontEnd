import "./list.scss"
import Sidebar from "../../components/Dashboard/sidebar/Sidebar"
import Datatable from "../../components/Dashboard/datatable/Datatable"
import s from './List.module.css';

const List = () => {
  return (
    <div className={`list ${s.list}`}>
      <Sidebar/>
      <div className={`listContainer ${s.listContainer}`}>    
        <Datatable/>
      </div>
    </div>
  )
}

export default List