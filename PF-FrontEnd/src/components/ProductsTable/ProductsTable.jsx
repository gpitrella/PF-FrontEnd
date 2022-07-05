import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductsTableHeader from './ProductsTableHeader/ProductsTableHeader';
import ProductsTableRows from './ProductsTableRows/ProductsTableRows';
import ShowResultCount from '../ShowResultCount/ShowResultCount';
import Pagination from '../Pagination/Pagination';
import MiniModal from '../MiniModal/MiniModal';
import Loading from '../SVG/Loading';
import { 
  closeStore, getBrandsToStore, getCategoriesToStore, getProductsWithFiltersAndPaginate, updateFilter, setShowLoading, waitingResponsePut,
  showMiniModal, waitingResponseDelete, waitingResponsePost
} from '../../redux/actions';
import { buildFilter } from '../../util';

import s from './ProductsTable.module.css';

export default function ProductsTable({}) {

  const dispatch = useDispatch();
  const { products, showStore, showLoading, showError, filter, results, 
    resultPut, resultDelete, resultPost
  } = useSelector(state => state.storepage);
  const { miniModal } = useSelector(state => state.general);

  React.useEffect(() => {
    dispatch(getBrandsToStore());
    dispatch(getCategoriesToStore());

    return () => {
      dispatch(closeStore());
    }
  }, []);

  React.useEffect(() => {
    if (!showStore) return;
    let newFilter = {
      ...filter,
      size: 10,
      hidden: true
    };
    dispatch(updateFilter(newFilter));
    dispatch(setShowLoading());
    dispatch(getProductsWithFiltersAndPaginate(buildFilter(newFilter)));
  }, [showStore]);

  React.useEffect(() => {
    if (resultPut.waitingResponse && resultPut.status) {
      dispatch(showMiniModal(true, 'Success on Editing Product!!!', true, false));
      dispatch(waitingResponsePut(false));
      dispatch(setShowLoading());
      dispatch(getProductsWithFiltersAndPaginate(buildFilter(filter)));
    }
    else if (resultPut.waitingResponse && resultPut.error) {
      dispatch(showMiniModal(true, 'Server Error: Try Again Later...', false, true));
      dispatch(waitingResponsePut(false));
    }
  }, [resultPut]);

  React.useEffect(() => {
    if (resultDelete.waitingResponse && resultDelete.status) {
      dispatch(showMiniModal(true, 'Success on Deleting Product!!!', true, false));
      dispatch(waitingResponseDelete(false));
      dispatch(setShowLoading());
      dispatch(getProductsWithFiltersAndPaginate(buildFilter(filter)));
    }
    else if (resultDelete.waitingResponse && resultDelete.error) {
      dispatch(showMiniModal(true, 'Server Error: Try Again Later...', false, true));
      dispatch(waitingResponseDelete(false));
    }
  }, [resultDelete]);

  React.useEffect(() => {
    if (resultPost.waitingResponse && resultPost.status) {
      dispatch(showMiniModal(true, 'Success on Creating Product!!!', true, false));
      dispatch(waitingResponsePost(false));
      dispatch(setShowLoading());
      dispatch(getProductsWithFiltersAndPaginate(buildFilter(filter)));
    }
    else if (resultPost.waitingResponse && resultPost.error) {
      dispatch(showMiniModal(true, 'Server Error: Try Again Later...', false, true));
      dispatch(waitingResponsePost(false));
    }
  }, [resultPost]);

  if (!showStore) return (
    <div className = {s.containerLoading}>
      <div className = {s.imageContainer}>
        <div className = {s.loadingContainer}>
          <Loading />
        </div>
      </div>
      <span className = {s.spanLoading}>Loading Products</span>
    </div>
  )

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
      {
        miniModal && miniModal.show && <MiniModal />
      }
    </div>
  );
}