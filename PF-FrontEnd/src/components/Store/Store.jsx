import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import FilterPanel from '../FilterPanel/FilterPanel';
import OrderPanel from '../OrderPanel/OrderPanel';
import Pagination from '../Pagination/Pagination';
import ProductCardsStore from '../ProductCardsStore/ProductCardsStore';
import LoadingStore from '../LoadingStore/LoadingStore';
import { closeStore, getBrandsToStore, getCategoriesToStore, getProductsWithFiltersAndPaginate,
          setShowLoading, updateFilter } from '../../redux/actions';
import { buildFilter } from '../../util';

import s from './Store.module.css';

export default function Store() {

  const dispatch = useDispatch();
  const { showLoading, showError, showStore, products, noProducts, filter } = useSelector(state => state.storepage);
  const params = useParams();

  React.useEffect(() => {

    if (params.discount) handleUpdateFilter('discount', true);
    if (params.name) handleUpdateFilter('name', params.name);
    if (params.category) handleUpdateFilter('category', params.category);
    if (params.brand) handleUpdateFilter('brand', [params.brand]);

    dispatch(getBrandsToStore());
    dispatch(getCategoriesToStore());

    return () => {
      dispatch(closeStore());
    }
  }, [])

  React.useEffect(() => {
    if (params && params.name && showStore) {
      handleUpdateFilter('name', params.name);
      dispatch(getProductsWithFiltersAndPaginate(buildFilter({
        ...filter,
        name: params.name
      })));
      dispatch(setShowLoading());
    }
  }, [params.name])

  React.useEffect(() => {
    if (!showStore) return;
    dispatch(getProductsWithFiltersAndPaginate(buildFilter(filter)));
    dispatch(setShowLoading());
  }, [showStore]);

  let handleUpdateFilter = function(property, value) {
    let newFilter = { 
      ...filter,
      [property]: value,
      page: 1
    }
    dispatch(updateFilter(newFilter));
  }

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
          !showLoading && !showError && products && products.length > 0 &&
          <div className = {s.producCardsStore}>
            <ProductCardsStore products = {products}/>
          </div>
        }
        <LoadingStore loading = {showLoading} error = {showError} noResults = {noProducts}/>
        <div className = {s.paginationBottom}>
          <Pagination />
        </div>
      </div>
    </div>
  );
}