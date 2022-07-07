import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PurchasesTableHeader from './PurchasesTableHeader/PurchasesTableHeader';
import PurchasesTableRows from './PurchasesTableRows/PurchasesTableRows';
import Loading from '../SVG/Loading';
import { setOriginalPurchases, resetPurchases } from '../../redux/actions';
import ShowResultCount from '../ShowResultCount/ShowResultCount';
import Pagination from '../Pagination/Pagination';

import s from './PurchasesTable.module.css';

export default function PurchasesTable({}) {

  const dispatch = useDispatch();
  const { purchases, showPurchases, filter, showLoading } = useSelector(state => state.purchases);

  React.useEffect(() => {
    dispatch(setOriginalPurchases());

    return () => dispatch(resetPurchases());
  }, []);

  if (!showPurchases) return (
    <div className = {s.containerLoading}>
      <div className = {s.imageContainer}>
        <div className = {s.loadingContainer}>
          <Loading />
        </div>
      </div>
      <span className = {s.spanLoading}>Loading Purchases</span>
    </div>
  )

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