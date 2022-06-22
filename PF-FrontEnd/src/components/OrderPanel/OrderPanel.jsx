import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilter, resetFilter } from '../../redux/actions';

import s from './OrderPanel.module.css';

export default function OrderPanel() {

  const dispatch = useDispatch();
  const { filter } = useSelector(state => state.storepage);

  let handleChange = function(e) {
    let { value, name } = e.target;
    dispatch(updateFilter({ ...filter, [name]: value }));
  };

  return (
    <div className = {s.container}>
      <label className = {s.lblSelect}>Order By</label>
      <select
        value = {filter.orderBy}
        onChange={handleChange}
        name = {'orderBy'}
        className = {s.select}
      >
        <option value={ORDER_BY_NAME.value}>{ORDER_BY_NAME.name}</option>
        <option value={ORDER_BY_PRICE.value}>{ORDER_BY_PRICE.name}</option>
      </select>
      <select
        value = {filter.order}
        onChange={handleChange}
        name = {'order'}
        className = {s.select}
      >
        <option value={ORDER_ASC.value}>{ORDER_ASC.name}</option>
        <option value={ORDER_DESC.value}>{ORDER_DESC.name}</option>
      </select>
    </div>
  )
}

const ORDER_BY_PRICE = {
  value: "price",
  name: 'Price'
}
const ORDER_BY_NAME = {
  value: "name",
  name: 'Name'
}

const ORDER_ASC = {
  value: "asc",
  name: 'Ascending'
}

const ORDER_DESC = {
  value: "desc",
  name: 'Descending'
}