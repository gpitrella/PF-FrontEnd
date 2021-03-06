import "./listproduct.scss"
import Sidebar from "../../components/Dashboard/sidebar/Sidebar"
import SearchProduct from '../../components/SearchProduct/SearchProduct';
import ProductsTable from '../../components/ProductsTable/ProductsTable';

import s from './ListProducts.module.css';
import { Link } from "react-router-dom";

const ListProducts = () => {
  return (
    <div className={`list ${s.list}`}>
      <Sidebar/>
      <div className={`listContainer ${s.listContainer}`}>
        <SearchProduct />
        <ProductsTable />
      </div>
    </div>
  )
}

export default ListProducts