import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PurchasesTableHeader from './PurchasesTableHeader/PurchasesTableHeader';
import PurchasesTableRows from './PurchasesTableRows/PurchasesTableRows';
import { setOriginalPurchases, resetPurchases, setShowLoadingPurchases } from '../../redux/actions';
import ShowResultCount from '../ShowResultCount/ShowResultCount';
import Pagination from '../Pagination/Pagination';

import s from './PurchasesTable.module.css';

export default function PurchasesTable({}) {

  const dispatch = useDispatch();
  const { purchases, showPurchases, filter, showLoading } = useSelector(state => state.purchases);
  const { branchOffices } = useSelector(state => state.general);

  React.useEffect(() => {
    dispatch(setShowLoadingPurchases());
    dispatch(setOriginalPurchases());

    return () => dispatch(resetPurchases());
  }, []);

  return (
    <div className = {s.container}>
      <table className = {s.table}>
        <thead>
          <PurchasesTableHeader loading = {false} order = {{}} orderBy = {{}}/>
        </thead>
        <tbody>
          <PurchasesTableRows purchases = {purchases} />
        </tbody>
      </table>
      <div className = {s.pagination}>
        <ShowResultCount 
          loading = {showLoading}
          results = {filter.results}
          page = {filter.page}
          pages = {filter.pages}
          simple = {true}
        />
        <Pagination simple = {true} purchases = {true}/>
      </div>
    </div>
  );
}