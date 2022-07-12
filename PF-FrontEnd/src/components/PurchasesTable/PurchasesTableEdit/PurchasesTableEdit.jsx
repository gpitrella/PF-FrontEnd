import React from "react";
import { useSelector } from "react-redux";
import Accept from '../../SVG/Accept';
import Reload from '../../SVG/Reload';
import Cancel from '../../SVG/Cancel';
import s from './PurchasesTableEdit.module.css';

export default function PurchasesTableEdit({ param, newPurchaseDetails, handleChange, handleOptions }) {

  const purchasesState = useSelector(state => state.purchases);

  if (param.editWith === 'SELECT') return (
    <select className = {s.select} value = {newPurchaseDetails[param.name]} onChange = {handleChange} name = {param.name}>
      {
        purchasesState && purchasesState[param.selectSource].map((pick, index) =>  {
          return (
            <option 
              value = {pick.value}
              key = {`option-${pick.value}-${index}`}
            >
              {pick.value.toUpperCase()}
            </option>
          ) 
        })
      }
    </select>
  )

  return (
    <div className = {s.options}>
      <button className = {`${s.svgButton} ${s.red}`} onClick = {() => handleOptions('CANCEL')}>
        <div className = {`${s.tag} ${s.red}`}>Cancel</div>
        <Cancel />
      </button>
      <button className = {`${s.svgButton} ${s.orange}`} onClick = {() => handleOptions('RELOAD')}>
        <div className = {`${s.tag} ${s.orange}`}>Reset</div>
        <Reload />
      </button>
      <button 
        className = {`${s.svgButton} ${s.green}`}
        onClick = {() => handleOptions('ACCEPT')}>
        <div className = {`${s.tag} ${s.green}`}>Accept</div>
        <Accept />
      </button>
    </div>
  );
}