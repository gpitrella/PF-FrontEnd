import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { updateFilter, getProductsWithFiltersAndPaginate, setShowLoading } from '../../../redux/actions';
import { headerData } from '../config';
// import { buildFilter } from '../../../util';

import s from './PurchasesTableHeader.module.css';

export default function PurchasesTableHeader({ loading, orderBy, order }) {

  //const dispatch = useDispatch();
  //const { filter } = useSelector(state => state.storepage);

  // let handleChangeOrder = function(newOrderBy) {
  //   if (loading) return;

  //   let newFilter = {
  //     ...filter,
  //     orderBy: newOrderBy,
  //     order: order === 'asc' ? 'desc' : 'asc'
  //   };

  //   dispatch(updateFilter(newFilter));
  //   dispatch(setShowLoading());
  //   dispatch(getProductsWithFiltersAndPaginate(buildFilter(newFilter)));
  // }

  return (
    <>
      <tr className = {s.header}>
      {
        headerData && headerData.map((param, index) => (

          <th className = {`${s.headerParam} ${s[param.className]}`} key = {`header-purchases-${param.name}-${index}`}>
            <div className = {s.containerParam}>
              {param.name}
              {
                param.enableSort && <span className = {s.btnOrder} onClick = { () => console.log('ok')}>
                { orderBy !== param.name ? '🔹' : (  order === 'asc' ?  '🔺' : '🔻' )}
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