import React from 'react';
import { Link } from 'react-router-dom'; 
import ImageLoader from '../../ImageLoader/ImageLoader';

import s from './ProductsTableCell.module.css';

export default function ProductsTableCell({ product, param, viewMore, handleViewMore, handleEnableEdit, handleDelete }) {

  if (param.isImage) return (
    <div className = {s.image}>
      <ImageLoader image = {product[param.name]} alt = {product.name} />
    </div>
  );

  if (param.isSwitch) return (
    <span className = {`${s.activeSwitch} ${param.getValue(product) === 'active' ? s.active : s.inactive }`}>{param.getValue(product)}</span>
  )

  if (param.isOption) return (
    <div className = {s.options}>
      <Link to = {`productdetails/${product.id}`}>
        <button className = {`${s.btn} ${s.blue}`}>View</button>
      </Link>
      <button className = {`${s.btn} ${s.orange}`} onClick = { () => handleEnableEdit(product) }>Edit</button>
      <button className = {`${s.btn} ${s.red}`} onClick = { () => handleDelete(product) }>Delete</button>
    </div>
  )

  return (
    <>
    { param.isComplex ? 
      ( param.addViewMore && viewMore ? product[param.name] : param.getValue(product)) 
      : product[param.name] }
    {
      param.addViewMore && product[param.name].length > param.limit && !viewMore && 
      <span className = {s.viewMore} onClick = {handleViewMore}>View more</span>
    }
    {
      param.addViewMore && viewMore && <span className = {s.viewMore} onClick = {handleViewMore}>View Less</span>
    }
    </>
  );
}