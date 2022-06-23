import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FilterPanel from '../FilterPanel/FilterPanel';
import OrderPanel from '../OrderPanel/OrderPanel';
import ProducCardsStore from '../ProductCardsStore/ProductCardsStore';
import Pagination from '../Pagination/Pagination';

import s from './Store.module.css';
import ProductCardsStore from '../ProductCardsStore/ProductCardsStore';

export default function Store() {

  const exampleCards = [1];

  return (
    <div className = {s.container}>
      <div className = {s.containerGrid}>
        <div className = {s.filterPanel}>
          <FilterPanel />
        </div>
        <div className = {s.orderPanel}>
          <OrderPanel />
        </div>
        <div className = {s.pagination}>
          <Pagination />
        </div>
        <div className = {s.producCardsStore}>
          <ProductCardsStore products = {exampleCards}/>
        </div>
        <div className = {s.paginationBottom}>
          <Pagination />
        </div>
      </div>
    </div>
  );
}