import "./listproduct.scss"
import Sidebar from "../../components/Dashboard/sidebar/Sidebar"
import EditProduct from '../../components/EditProduct/EditProduct';

import s from './EditProductPage.module.css';

const EditProductPage = () => {
  return (
    <div className={`list ${s.list}`}>
      <Sidebar/>
      <div className={`listContainer ${s.listContainer}`}>
        <EditProduct />
      </div>
    </div>
  )
}

export default EditProductPage