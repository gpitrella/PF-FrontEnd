import "./listproduct.scss"
import Sidebar from "../../components/Dashboard/sidebar/Sidebar"
import FilterPurchasesByStatus from '../../components/FilterPurchasesByStatus/FilterPurchasesByStatus';
import PurchasesTable from '../../components/PurchasesTable/PurchasesTable';

import s from './ListPurchases.module.css';

const ListPurchases = () => {
  return (
    <div className={`list ${s.list}`}>
      <Sidebar/>
      <div className={`listContainer ${s.listContainer}`}>
        <FilterPurchasesByStatus />
        <PurchasesTable />
      </div>
    </div>
  )
}

export default ListPurchases