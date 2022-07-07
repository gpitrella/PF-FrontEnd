import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFilterPurchases, setShowLoadingPurchases, getPurchasesWithFiltersAndPaginate } from '../../../redux/actions';
import { headerData } from '../config';
// import { buildFilter } from '../../../util';

import s from './PurchasesTableHeader.module.css';

export default function PurchasesTableHeader({ loading }) {

  const dispatch = useDispatch();
  const { filter } = useSelector(state => state.purchases);

  let handleChangeOrder = function(newOrderBy) {
    if (loading) return;

    let newFilter = {
      ...filter,
      orderBy: newOrderBy,
      order: filter.order === 'asc' ? 'desc' : 'asc'
    };

    dispatch(updateFilterPurchases(newFilter));
    dispatch(setShowLoadingPurchases());
    dispatch(getPurchasesWithFiltersAndPaginate(newFilter));
  }

  return (
    <>
      <tr className = {s.header}>
      {
        headerData && headerData.map((param, index) => (

          <th className = {`${s.headerParam} ${s[param.className]}`} key = {`header-purchases-${param.name}-${index}`}>
            <div className = {s.containerParam}>
              {param.name}
              {
                param.enableSort && <span className = {s.btnOrder} onClick = {() => handleChangeOrder(param.name)}>
                { filter.orderBy !== param.name ? '🔹' : (  filter.order === 'asc' ?  '🔺' : '🔻' )}
                </span>
              }
            </div>
          </th>

        ))
      }
      </tr>
    </>
  );
}