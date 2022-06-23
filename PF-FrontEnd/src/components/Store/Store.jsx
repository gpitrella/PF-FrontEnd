import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FilterPanel from '../FilterPanel/FilterPanel';
import OrderPanel from '../OrderPanel/OrderPanel';
import Pagination from '../Pagination/Pagination';
import ProductCardsStore from '../ProductCardsStore/ProductCardsStore';
import { closeStore } from '../../redux/actions';
import s from './Store.module.css';

export default function Store() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(closeStore());
    }
  }, [])

  const exampleCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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