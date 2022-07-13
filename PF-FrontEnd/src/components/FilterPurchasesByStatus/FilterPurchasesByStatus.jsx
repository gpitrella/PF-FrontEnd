import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilterPurchases, setShowLoadingPurchases, getPurchasesWithFiltersAndPaginate } from '../../redux/actions';

import s from './FilterPurchasesByStatus.module.css';

export default function FilterPurchasesByStatus() {

  const { filter } = useSelector(state => state.purchases);
  const dispatch = useDispatch();

  let handleClick = function(newStatus) {
    let newFilter = {
      ...filter,
      status: newStatus,
      page: 1
    };

    dispatch(updateFilterPurchases(newFilter));
    dispatch(setShowLoadingPurchases());
    dispatch(getPurchasesWithFiltersAndPaginate(newFilter));
  }

  return (
    <div className = {s.container}>
      {
        PURCHASES_STATUS_ENUM && PURCHASES_STATUS_ENUM.map((status, index) =>

          <button 
            className = {`${s.btn} ${s[`color_${status.color}`]}`}
            disabled = {filter.status === status.value}
            onClick = {() => handleClick(status.value)}
            key = {`filter-by-status-${status.value}-${index}`}
          >
            {status.value}
          </button>

        )
      }
    </div>
  )
}

const PURCHASES_STATUS_ENUM = [
  {
    value: 'none',
    color: 'white'
  },
  {
    value: 'pending',
    color: 'orange'
  },
  {
    value: 'processing',
    color: 'violet'
  },
  {
    value: 'sending',
    color: 'blue'
  },
  {
    value: 'filled',
    color: 'green'
  },
  {
    value: 'cancelled',
    color: 'red'
  },
];