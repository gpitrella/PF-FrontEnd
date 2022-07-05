import React from "react";
import validator from 'validator';
import { useSelector } from "react-redux";
import Accept from '../../SVG/Accept';
import Reload from '../../SVG/Reload';
import Cancel from '../../SVG/Cancel';
import s from './ProductsTableEdit.module.css';

export default function ProductsTableEdit({ param, newProductDetails, handleChange, invalid, handleInvalid, handleOptions }) {

  const store = useSelector(state => state.storepage);

  let handleValidation = function(e) {
    let { name, value } = e.target;

    handleChange(e);

    if (typeof(value) !== 'string') return;

    let newInvalid = { ...invalid, [name]: false };

    if (validator.isEmpty(value)) newInvalid = { ...newInvalid, [name]: true };
    else if (param.validWithCurrency && !validator.isCurrency(value, {allow_negatives: false})) newInvalid = { ...newInvalid, [name]: true };
    else if (param.validWithInt && !validator.isInt(value)) newInvalid = { ...newInvalid, [name]: true };
    else if (param.validWithInt && Number(value) < 0 ) newInvalid = { ...newInvalid, [name]: true };
    else if (param.limits && Number(value) > param.max) 
      newInvalid = { ...newInvalid, [name]: true };

    handleInvalid(newInvalid);
  }

  if (param.editWith === 'TEXTAREA') return (
    <textarea 
      className = {`${s.textarea} ${ invalid[param.name] ? s.invalid : s.valid}`}
      value = {newProductDetails.name}
      onInput = {handleValidation}
      name = {param.name}
    ></textarea>
  )

  if (param.editWith === 'SELECT') return (
    <select className = {s.select} value = {newProductDetails[param.name]} onChange = {handleValidation} name = {param.name}>
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
      onClick = {() => handleValidation({ 
          target: { 
            value: param.getValue(newProductDetails) === 'active' ? false : true,
            name: 'isVisible'
          }
        })}
    >
      {param.getValue(newProductDetails)}
    </span>
  )

  if (param.editWith === 'NUMERIC-INPUT') return (
    <input
      type = 'number'
      className = {`${s.input} ${ invalid[param.name] ? s.invalid : s.valid}`}
      value = {newProductDetails[param.name]}
      onInput = {handleValidation}
      name = {param.name}
    />
  );

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
        disabled = { Object.keys(invalid).some(param => invalid[param]) }
        onClick = {() => handleOptions('ACCEPT')}>
        <div className = {`${s.tag} ${s.green}`}>Accept</div>
        <Accept />
      </button>
    </div>
  );
}