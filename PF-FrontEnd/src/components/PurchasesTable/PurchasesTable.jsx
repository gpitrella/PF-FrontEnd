import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PurchasesTableHeader from './PurchasesTableHeader/PurchasesTableHeader';
import PurchasesTableRows from './PurchasesTableRows/PurchasesTableRows';
// import ShowResultCountPurchases from '../ShowResultCountPurchases/ShowResultCountPurchases';
// import PaginationPurchases from '../PaginationPurchases/PaginationPurchases';

import s from './PurchasesTable.module.css';

export default function PurchasesTable({}) {

  const { purchases } = useSelector(state => state.purchases);

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
{/*      <div className = {s.pagination}>
        <ShowResultCountPurchases loading = {showLoading} results = {results} page = {filter.page} pages = {filter.pages} simple = {true} />
        <PaginationPurchases simple = {true}/>
      </div>*/}
    </div>
  );
}