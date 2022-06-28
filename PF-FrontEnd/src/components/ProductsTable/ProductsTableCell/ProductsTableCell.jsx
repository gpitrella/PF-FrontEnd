import React from 'react';
import ImageLoader from '../../ImageLoader/ImageLoader';

import s from './ProductsTableCell.module.css';

export default function ProductsTableCell({ product, param, viewMore, handleViewMore }) {

  if (param.isImage) return (
    <div className = {s.image}>
      <ImageLoader image = {product[param.name]} alt = {product.name} />
    </div>
  );

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