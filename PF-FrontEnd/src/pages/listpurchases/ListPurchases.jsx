import React from 'react';
import { useSelector } from 'react-redux';
import "./listproduct.scss";
import Sidebar from "../../components/Dashboard/sidebar/Sidebar";
import FilterPurchasesBySucursal from '../../components/FilterPurchasesBySucursal/FilterPurchasesBySucursal';
import FilterPurchasesByStatus from '../../components/FilterPurchasesByStatus/FilterPurchasesByStatus';
import PurchasesTable from '../../components/PurchasesTable/PurchasesTable';

import s from './ListPurchases.module.css';

const ListPurchases = () => {
  return (
    <div className={`list ${s.list}`}>
      <Sidebar/>
      <div className={`listContainer ${s.listContainer}`}>
        <FilterPurchasesBySucursal sucursals = {BRANCH_OFFICES}/>
        <FilterPurchasesByStatus />
        <PurchasesTable />
      </div>
    </div>
  )
}

const BRANCH_OFFICES = [
  {
    value: 'none',
    name: 'NO SUCURSAL SELECTED'
  },
  {
    value: 'MERLO',
    name: 'SUCURSAL MERLO'
  },
  {
    value: 'ADROGUE',
    name: 'SUCURSAL ADROGUE'
  },
  {
    value: 'CABA',
    name: 'SUCURSAL CABA'
  }
];

export default ListPurchases;