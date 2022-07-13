import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./listproduct.scss";
import Sidebar from "../../components/Dashboard/sidebar/Sidebar";
import FilterPurchasesBySucursal from '../../components/FilterPurchasesBySucursal/FilterPurchasesBySucursal';
import FilterPurchasesByStatus from '../../components/FilterPurchasesByStatus/FilterPurchasesByStatus';
import PurchasesTable from '../../components/PurchasesTable/PurchasesTable';
import Loading from '../../components/SVG/Loading';
import { getBranchOffices, resetCheckoutAddress } from '../../redux/actions';

import s from './ListPurchases.module.css';

const ListPurchases = () => {

  const dispatch = useDispatch();
  const { branchOffices } = useSelector(state => state.general);

  React.useEffect(() => {
    dispatch(getBranchOffices());

    return () => {
      dispatch(resetCheckoutAddress());
    }
  }, []);

  return (
    <div className={`list ${s.list}`}>
      <Sidebar/>
      <div className={`listContainer ${s.listContainer}`}>
        {
          (!branchOffices || branchOffices.length === 0) &&
          <div className = {s.containerLoading}>
            <div className = {s.imageContainer}>
              <div className = {s.loadingContainer}>
                <Loading />
              </div>
            </div>
            <span className = {s.spanLoading}>Loading Purchases</span>
          </div>
        }
        {
          branchOffices && branchOffices.length > 0 &&
          <>
            <FilterPurchasesBySucursal sucursals = {branchOffices}/>
            <FilterPurchasesByStatus />
            <PurchasesTable />
          </>
        }
      </div>
    </div>
  )
}

export default ListPurchases;