import "./listproduct.scss"
import Sidebar from "../../components/Dashboard/sidebar/Sidebar"
//import SearchProduct from '../../components/SearchProduct/SearchProduct';
import PurchasesTable from '../../components/PurchasesTable/PurchasesTable';

import s from './ListPurchases.module.css';

const ListPurchases = () => {
  return (
    <div className={`list ${s.list}`}>
      <Sidebar/>
      <div className={`listContainer ${s.listContainer}`}>
        <PurchasesTable />
      </div>
    </div>
  )
}

export default ListPurchases