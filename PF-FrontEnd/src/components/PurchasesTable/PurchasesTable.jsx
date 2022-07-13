import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PurchasesTableHeader from './PurchasesTableHeader/PurchasesTableHeader';
import PurchasesTableRows from './PurchasesTableRows/PurchasesTableRows';
import { setOriginalPurchases, resetPurchases, setShowLoadingPurchases, showMiniModal, waitingResponsePutPurchase } 
from '../../redux/actions';
import ShowResultCount from '../ShowResultCount/ShowResultCount';
import Pagination from '../Pagination/Pagination';
import MiniModal from '../MiniModal/MiniModal';

import s from './PurchasesTable.module.css';

export default function PurchasesTable({}) {

  const dispatch = useDispatch();
  const { purchases, showPurchases, filter, showLoading, resultPut } = useSelector(state => state.purchases);
  const { branchOffices, miniModal } = useSelector(state => state.general);

  React.useEffect(() => {
    dispatch(setShowLoadingPurchases());
    dispatch(setOriginalPurchases());

    return () => dispatch(resetPurchases());
  }, []);

  React.useEffect(() => {
    if (resultPut.waitingResponse && resultPut.status) {
      dispatch(showMiniModal(true, 'Success on Editing Purchase Order!!!', true, false));
      dispatch(waitingResponsePutPurchase(false));
      dispatch(setShowLoadingPurchases());
      dispatch(setOriginalPurchases());
    }
    else if (resultPut.waitingResponse && resultPut.error) {
      dispatch(showMiniModal(true, resultPut.errorMsg, false, true));
      dispatch(waitingResponsePutPurchase(false));
    }
  }, [resultPut]);

  return (
    <div className = {s.container}>
      <table className = {s.table}>
        <thead>
          <PurchasesTableHeader loading = {showLoading} />
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
      {
        miniModal && miniModal.show && <MiniModal />
      }
    </div>
  );
}