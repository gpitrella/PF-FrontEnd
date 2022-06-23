import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FilterPanel from '../FilterPanel/FilterPanel';
import OrderPanel from '../OrderPanel/OrderPanel';
import Pagination from '../Pagination/Pagination';
import ProductCardsStore from '../ProductCardsStore/ProductCardsStore';
import LoadingStore from '../LoadingStore/LoadingStore';
import { closeStore, getBrandsToStore, getCategoriesToStore, getProductsWithFiltersAndPaginate,
          setShowLoading } from '../../redux/actions';

import s from './Store.module.css';

export default function Store() {

  const dispatch = useDispatch();
  const { showLoading, showError, showStore, products } = useSelector(state => state.storepage);

  React.useEffect(() => {

    dispatch(getBrandsToStore());
    dispatch(getCategoriesToStore());

    return () => {
      dispatch(closeStore());
    }
  }, [])

  React.useEffect(() => {
    if (!showStore) return;
    dispatch(getProductsWithFiltersAndPaginate());
    dispatch(setShowLoading());
  }, [showStore]);

  if (!showStore) return <span>Loading...</span>;

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
        {
          !showLoading && !showError &&
          <div className = {s.producCardsStore}>
            <ProductCardsStore products = {products}/>
          </div>
        }
        <LoadingStore loading = {showLoading} error = {showError}/>
        <div className = {s.paginationBottom}>
          <Pagination />
        </div>
      </div>
    </div>
  );
}