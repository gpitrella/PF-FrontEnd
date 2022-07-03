import React from 'react';
import { Link } from 'react-router-dom'; 
import ImageLoader from '../../ImageLoader/ImageLoader';
import View from '../../SVG/View';
import Edit from '../../SVG/Edit';
import EditMore from '../../SVG/EditMore';
import Trash from '../../SVG/Trash';

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
      <Link to = {`/productdetails/${product.id}`}>
        <button className = {`${s.svgButton} ${s.blue}`}>
          <div className = {`${s.tag} ${s.blue}`}>View More</div>
          <View />
        </button>
      </Link>
      <button className = {`${s.svgButton} ${s.orange}`} onClick = { () => handleEnableEdit(product) } >
        <div className = {`${s.tag} ${s.orange}`}>Edit Here</div>
        <Edit />
      </button>
      <Link to = {`/admin/products/edit/${product.id}`}>
        <button className = {`${s.svgButton} ${s.orange}`}>
          <div className = {`${s.tag} ${s.orange}`}>Edit More</div>
          <EditMore />
        </button>
      </Link>
      <button className = {`${s.svgButton} ${s.red}`} onClick = { () => handleDelete(product) } >
        <div className = {`${s.tag} ${s.red}`}>Delete</div>
        <Trash />
      </button>
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