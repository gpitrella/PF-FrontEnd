import "./listproduct.scss"
import Sidebar from "../../components/Dashboard/sidebar/Sidebar"
import CreateProduct from '../../components/CreateProduct/CreateProduct';

import s from './CreateProductPage.module.css';

const CreateProductPage = () => {
  return (
    <div className={`list ${s.list}`}>
      <Sidebar/>
      <div className={`listContainer ${s.listContainer}`}>
        <CreateProduct />
      </div>
    </div>
  )
}

export default CreateProductPage