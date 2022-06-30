import "./listproduct.scss"
import Sidebar from "../../components/Dashboard/sidebar/Sidebar"
// import Navbar from "../../components/Dashboard/navbar/Navbar"
//import Datatable from "../../components/datatable/Datatable"
//import Table from "../../components/Dashboard/table/Table"
import ProductsTable from '../../components/ProductsTable/ProductsTable';

import s from './ListProducts.module.css';

const ListProducts = () => {
  return (
    <div className={`list ${s.list}`}>
      <Sidebar/>
      <div className={`listContainer ${s.listContainer}`}>
        <ProductsTable />
      </div>
    </div>
  )
}

export default ListProducts