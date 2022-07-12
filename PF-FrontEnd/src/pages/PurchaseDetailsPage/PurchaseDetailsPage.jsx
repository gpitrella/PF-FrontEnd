import "./listproduct.scss"
import Sidebar from "../../components/Dashboard/sidebar/Sidebar"
import PurchaseDetails from '../../components/PurchaseDetails/PurchaseDetails';

import s from './PurchaseDetailsPage.module.css';

const PurchaseDetailsPage = () => {

  return (
    <div className={`list ${s.list}`}>
      <Sidebar/>
      <div className={`listContainer ${s.listContainer}`}>
        <PurchaseDetails />
      </div>
    </div>
  )
}

export default PurchaseDetailsPage