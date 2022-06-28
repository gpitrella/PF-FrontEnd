import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import FilterPanel from '../FilterPanel/FilterPanel';
import OrderPanel from '../OrderPanel/OrderPanel';
import Pagination from '../Pagination/Pagination';
import ShowResultCount from '../ShowResultCount/ShowResultCount';
import ProductCardsStore from '../ProductCardsStore/ProductCardsStore';
import LoadingStore from '../LoadingStore/LoadingStore';
import { closeStore, getBrandsToStore, getCategoriesToStore, getProductsWithFiltersAndPaginate,
          setShowLoading, updateFilter } from '../../redux/actions';
import { buildFilter, buildPathWithFilter } from '../../util';

import s from './Store.module.css';
import Loading from '../SVG/Loading';

export default function Store() {

  const dispatch = useDispatch();
  const { showLoading, showError, showStore, products, noProducts, filter, results } = useSelector(state => state.storepage);
  const [ dispatching, setDispatching ] = React.useState(false);
  const [ queryName, setqueryName ] = React.useState('');
  const params = useParams();

  React.useEffect(() => {

    let idTimeOut = setTimeout(() => {

      if (params.discount) handleUpdateFilter('discount', true);
      if (params.category) handleUpdateFilter('category', params.category);
      if (params.brand) handleUpdateFilter('brand', [params.brand]);

      dispatch(getBrandsToStore());
      dispatch(getCategoriesToStore());

    }, Math.random() * 400 + 1000);

    return () => {
      dispatch(closeStore());
      setqueryName('');
      setDispatching(false);
      clearTimeout(idTimeOut);
    }
  }, [])

  // React.useEffect(() => {
  //   if (params && params.name) {
  //     handleUpdateFilter('name', params.name);
  //     console.log('Actualizo el filtro por nombre.');
  //   }
  // }, [params.name]);

  // React.useEffect(() => {
  //   if (!showStore) return;
  //   console.log('Empiezo a cargar los productos con el filtro.', filter);
  //   dispatch(getProductsWithFiltersAndPaginate(buildFilter(filter)));
  //   dispatch(setShowLoading());
  // }, [showStore]);

  React.useEffect(() => {   
    if (params.name !== queryName) setqueryName(params.name)
  }, [params.name])

  React.useEffect(() => {
    if (!showStore || (dispatching && params.name === queryName)) return;

    if (params && params.name) {
      handleUpdateFilter('name', params.name);
      dispatch(getProductsWithFiltersAndPaginate(buildFilter({
        ...filter,
        name: params.name,
        page: 1,
      })));
    }
    else {
      dispatch(getProductsWithFiltersAndPaginate(buildFilter({
        ...filter,
        category: params.category ? params.category : 'None',
        brand: params.brand ? [params.brand] : [],
        discount: params.discount ? params.discount : false,
        page: 1,
        name: ''
      })));
    }
    dispatch(setShowLoading());
    setDispatching(true);
  }, [showStore, params.name]);

  let handleUpdateFilter = function(property, value) {
    let newFilter = { 
      ...filter,
      [property]: value,
      page: 1
    }
    if (property !== 'name') newFilter.name = '';
    dispatch(updateFilter(newFilter));
  }

  if (!showStore) {
    return (
      <div className = {s.container}>
        <div className = {s.imageContainer}>
          <div className = {s.loadingContainer}>
            <Loading />
          </div>
        </div>
        <span className = {s.spanLoading}>Loading Store</span>
      </div>
    )
  }

  return (
    <div className = {s.container}>

      <div className = {s.containerGrid}>
        <div className = {s.containerTitle}>
        {
          filter && buildPathWithFilter(filter).map((element, index) => 
            <><span className = {s.arrow}>{'/'}</span><span className = {s.path}> {element} </span></>       
          )
        }
        </div>
        <div className = {s.filterPanel}>
          <FilterPanel />
        </div>
        <div className = {s.subHeaderZone}>

          <ShowResultCount loading = {showLoading} results = {results} page = {filter.page} pages = {filter.pages} />

          <div className = {s.orderPanel}>
            <OrderPanel />
          </div>

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