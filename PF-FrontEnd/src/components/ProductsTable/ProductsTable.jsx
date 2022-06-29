import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductsTableHeader from './ProductsTableHeader/ProductsTableHeader';
import ProductsTableRows from './ProductsTableRows/ProductsTableRows';
import ShowResultCount from '../ShowResultCount/ShowResultCount';
import Pagination from '../Pagination/Pagination';
import { 
  closeStore, getBrandsToStore, getCategoriesToStore, getProductsWithFiltersAndPaginate, updateFilter, setShowLoading 
} from '../../redux/actions';
import { buildFilter } from '../../util';

import s from './ProductsTable.module.css';

export default function ProductsTable({}) {

  const dispatch = useDispatch();
  const { products, showStore, showLoading, showError, filter, results } = useSelector(state => state.storepage);

  const index = 10;

  React.useEffect(() => {
    dispatch(getBrandsToStore());
    dispatch(getCategoriesToStore());
  }, []);

  React.useEffect(() => {
    if (!showStore) return;
    let newFilter = {
      ...filter,
      size: 10
    };
    dispatch(updateFilter(newFilter));
    dispatch(setShowLoading());
    dispatch(getProductsWithFiltersAndPaginate(buildFilter(newFilter)));
  }, [showStore]);

  if (!showStore) return <span>Loading</span>;

  return (
    <div className = {s.container}>
      <table className = {s.table}>
        <thead>
          <ProductsTableHeader loading = {showLoading} order = {filter.order} orderBy = {filter.orderBy}/>
        </thead>
        <tbody>
          <ProductsTableRows products = {products} />
        </tbody>
      </table>
      <div className = {s.pagination}>
        <ShowResultCount loading = {showLoading} results = {results} page = {filter.page} pages = {filter.pages} simple = {true} />
        <Pagination simple = {true}/>
      </div>
    </div>
  );
}