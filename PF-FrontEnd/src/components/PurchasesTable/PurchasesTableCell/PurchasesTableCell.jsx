import React from 'react';
import { Link } from 'react-router-dom'; 
import View from '../../SVG/View';
import Edit from '../../SVG/Edit';

import s from './PurchasesTableCell.module.css';

export default function PurchasesTableCell({ purchase, param, viewMore, handleViewMore, handleEnableEdit }) {

  if (param.isOption) return (
    <div className = {s.options}>
      <Link to = {`/admin/purchases/details/${purchase.id}`}>
        <button className = {`${s.svgButton} ${s.blue}`}>
          <div className = {`${s.tag} ${s.blue}`}>View More</div>
          <View />
        </button>
      </Link>
      <button className = {`${s.svgButton} ${s.orange}`} onClick = { () => handleEnableEdit(purchase) } >
        <div className = {`${s.tag} ${s.orange}`}>Edit</div>
        <Edit />
      </button>
    </div>
  )

  if (param.isComplex && param.isArray) return (
    <div className = {s.containerDates}>
      <span className = {s.date}>{param.getValue(purchase)[0]}</span>
      <span className = {s.date}>{param.getValue(purchase)[1]}</span>
    </div>
  );

  if (param.isComplex && param.hasColors) return (
    <span className = {`${s.spanStatus} ${s[param.getColor(purchase)]}`}>{param.getValue(purchase)}</span>
  );

  return (
    <>
    { param.isComplex ? 
      ( param.addViewMore && viewMore ? purchase[param.name].name : param.getValue(purchase)) 
      : purchase[param.name] }
    {
      param.addViewMore && purchase[param.name].name.length > param.limit && !viewMore && 
      <span className = {s.viewMore} onClick = {handleViewMore}>View more</span>
    }
    {
      param.addViewMore && viewMore && <span className = {s.viewMore} onClick = {handleViewMore}>View Less</span>
    }
    </>
  );
}