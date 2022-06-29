import React from "react";
import { useSelector } from "react-redux";
import s from './ProductsTableEdit.module.css';

export default function ProductsTableEdit({ param, newProductDetails, handleChange }) {

  const store = useSelector(state => state.storepage);

  if (param.editWith === 'TEXTAREA') return (
    <textarea className = {s.textarea} value = {newProductDetails.name} onInput = {handleChange} name = {param.name}></textarea>
  )

  if (param.editWith === 'SELECT') return (
    <select className = {s.select} value = {newProductDetails[param.name]} onChange = {handleChange} name = {param.name}>
      {
        store && store[param.selectSource].map((pick, index) =>  {
          if (pick === 'None') return <></>;
          return (
            <option 
              value = {pick}
              key = {`option-${pick}-${index}`}
            >
              {pick}
            </option>
          ) 
        })
      }
    </select>
  )

  if (param.editWith === 'TOGGLE') return (
    <span 
      className = {`${s.activeSwitch} ${param.getValue(newProductDetails) === 'active' ? s.active : s.inactive }`}
      onClick = {() => handleChange({ 
          target: { 
            value: param.getValue(newProductDetails) === 'active' ? true : false,
            name: 'inactive'
          }
        })}
    >
      {param.getValue(newProductDetails)}
    </span>
  )

  return (
    <>
      <input type = 'number' className = {s.input} value = {newProductDetails[param.name]} onInput = {handleChange} name = {param.name}/>
    </>
  );
}