import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilterPurchases, setShowLoadingPurchases, getPurchasesWithFiltersAndPaginate } from '../../redux/actions';

import s from './FilterPurchasesBySucursal.module.css';

export default function FilterPurchasesBySucursal({ sucursals }) {

  const dispatch = useDispatch();
  const { filter } = useSelector(state => state.purchases);

  let handleChange = function(e) {
    let { value } = e.target;

    if (value === 'filter.sucursal') return;

    let newFilter = { 
      ...filter,
      sucursal: value,
      page: 1
    };
    handleFilterChange(newFilter);
  }

  let handleReset = function() {
    let newFilter = { 
      ...filter,
      status: 'none',
      sucursal: 'none',
      page: 1
    };
    handleFilterChange(newFilter);
  }

  let handleFilterChange = function(newFilter) {
    dispatch(updateFilterPurchases(newFilter));
    dispatch(setShowLoadingPurchases());
    dispatch(getPurchasesWithFiltersAndPaginate(newFilter));
  }

  return (
    <div className = {s.container}>
      <label className = {s.lbl}>{'Filter Purchases'}</label>
      <select className = {s.select} value = {filter.sucursal} onChange = {handleChange} >
        {
          sucursals && sucursals.map((sucursal, index) =>  {
            return (
              <option 
                value = {sucursal.value}
                key = {`option-${sucursal.value}-${index}`}
              >
                {sucursal.name.toUpperCase()}
              </option>
            ) 
          })
        }
      </select>
      <button 
        className = {`${s.btn} ${s.red}`}
        onClick = {handleReset} 
        disabled = {filter.status === 'none' && filter.sucursal === 'none'}
      >
        Reset Filters
      </button>
    </div>
  )
}