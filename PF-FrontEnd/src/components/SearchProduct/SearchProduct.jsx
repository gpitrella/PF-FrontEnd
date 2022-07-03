import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsWithFiltersAndPaginate, updateFilter } from '../../redux/actions';
import { buildFilter } from '../../util';
import s from './SearchProduct.module.css';

export default function SearchProduct() {

  const dispatch = useDispatch();
  const { filter, showStore } = useSelector(state => state.storepage);
  const [ inputName, setInputName ] = React.useState('');

  let handleInput = function(e) {
    let { value } = e.target;

    setInputName(value);
  }

  let handleSearch = function() {
    dispatch(updateFilter({ ...filter, name: inputName }));
    dispatch(getProductsWithFiltersAndPaginate(buildFilter({
      ...filter,
      name: inputName,
      page: 1,
    })));
  }

  let handleReset = function() {
    setInputName('');
    dispatch(updateFilter({ ...filter, name: '' }));
    dispatch(getProductsWithFiltersAndPaginate(buildFilter({
      ...filter,
      name: '',
      page: 1,
    })));
  }

  if (!showStore) return <></>;

  return (
    <div className = {s.container}>
      <label className = {s.lbl}>{'Search Product by Name'}</label>
      <input className = {s.input} value = {inputName} onInput = {handleInput} />
      <button className = {s.btn} onClick = {handleSearch} disabled = {inputName === ''}>Search</button>
      <button className = {`${s.btn} ${s.red}`} onClick = {handleReset} disabled = {filter.name === ''}>Reset</button>
      <Link to = {'/admin/products/create'} className = {s.btnCreateContainer}>
        <button className = {`${s.btn} ${s.create}`}>Create</button>
      </Link>
    </div>
  );
}