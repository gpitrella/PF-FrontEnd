import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  showLoadingParam, getProvincias, getMunicipios, getLocalidades,
  validatingAddress, normalizeAddress, closeModalAddAddress, 
  resetModalAddAddress, userAddAddress
} from '../../redux/actions';
import Loading from '../SVG/Loading';
import Help from '../SVG/Help';

import s from './ModalAddAddress.module.css';

export default function ModalAddAddress() {

  const dispatch = useDispatch();
  const { 
    provincias, municipios, localidades, loadingprovincias, loadingmunicipios, loadinglocalidades, validating, address 
  } = useSelector(state => state.modalAddAddress);

  const { oneuser } = useSelector(state => state.userReducer);

  React.useEffect(() => {
    if (!validating && address.length !== 0) { 
      setInputAddress({
        ...inputAddress,
        valid: true
      });
      setResultValidation('La dirreccion ingresada es valida.');
    }
    else if (!validating && address.length === 0 && inputAddress.name !== '') {
      setInputAddress({
        ...inputAddress,
        valid: false
      });
      setResultValidation('La dirreccion ingresada NO es valida.');
    }
  }, [validating, address]);

  const [ selection, setSelection ] = React.useState({
    provincia: '',
    municipio: '',
    localidad: '',
  });

  const [ inputAddress, setInputAddress ] = React.useState({
    name: '',
    valid: false
  });

  const [ resultValidation, setResultValidation ] = React.useState('');

  React.useEffect(() => {
    dispatch(showLoadingParam('provincias'));
    dispatch(getProvincias());

    return () => dispatch(resetModalAddAddress());
  }, []);

  let handleChange = function(e) {
    let { name, value } = e.target;
    
    let newSelection = {
      ...selection,
      [name]: value
    }

    setInputAddress({
      name: '',
      valid: false
    });

    if (name === 'provincia' && selection.provincia !== value) {
      dispatch(showLoadingParam('municipios'));
      dispatch(getMunicipios(provincias[value].id));
      newSelection.municipio = '';
      newSelection.localidad = '';
    }
    if (name === 'municipio' && selection.municipio !== value) {
      dispatch(showLoadingParam('localidades'));
      dispatch(getLocalidades(municipios[value].id));
      newSelection.localidad = '';
    }

    setSelection({ ...newSelection });

    if (resultValidation !== '') setResultValidation('');
  }

  let handleInput = function(e) {
    let { value } = e.target;

    setInputAddress({
      valid: false,
      name: value
    });

    if (resultValidation !== '') setResultValidation('');
  }

  let handleValidateAddress = function() {
    dispatch(validatingAddress());
    dispatch(normalizeAddress(
      inputAddress.name,
      localidades[selection.localidad].id,
      municipios[selection.municipio].id,
      provincias[selection.provincia].id
    ));
  }

  let handleCancel = function() {
    dispatch(closeModalAddAddress());
  }

  let handleAddAddres = function() {
    let newAddress = {
      direction: address[0].nomenclatura,
      latitude: address[0].ubicacion.lat,
      longitude: address[0].ubicacion.lon,
    }

    dispatch(userAddAddress(oneuser.id, newAddress));
    dispatch(closeModalAddAddress());
  }

  return (
    <div className = {s.globalContainer}>
      <div className = {s.container}>

        <div className = {s.banner}>
          <label className = {s.title}>Add Address</label>
          <label className = {s.btnClose} onClick = {handleCancel}>X</label>
        </div>

        <div className = {s.mainZone}>

          <div className = {s.select}>
            <label className = {s.lbl}>Province</label>
            <div className = {`${s.imageContainer} ${!loadingprovincias ? s.disabled : ''}`}>
              <div className = {s.loadingContainer}>
                <Loading />
              </div>
            </div>
            <select 
              className = {s.selectParam}
              value = {selection.provincia}
              onChange = {handleChange}
              name = {'provincia'}
              disabled = {provincias.length === 0}
            >
              <option value={''} hidden defaultValue>
                Choose an Option
              </option>
              {
                provincias && provincias.map((provincia, index) => 
                  <option 
                    value = {index}
                    key = {`select-provincia-${provincia.id}-${index}`}
                  >
                    {provincia.name}
                  </option>
                )
              }
            </select>
          </div>

          <div className = {s.select}>
            <label className = {s.lbl}>Municipe/Department</label>
            <div className = {`${s.imageContainer} ${!loadingmunicipios ? s.disabled : ''}`}>
              <div className = {s.loadingContainer}>
                <Loading />
              </div>
            </div>
            <select 
              className = {s.selectParam}
              value = {selection.municipio}
              onChange = {handleChange}
              name = {'municipio'}
              disabled = {municipios.length === 0 || selection.provincia === ''}
            >
              <option value={''} hidden defaultValue>
                Choose an Option
              </option>
              {
                municipios && municipios.map((municipio, index) => 
                  <option 
                    value = {index}
                    key = {`select-municipio-${municipio.id}-${index}`}
                  >
                    {municipio.name}
                  </option>
                )
              }
            </select>
          </div>

          <div className = {s.select}>
            <label className = {s.lbl}>Locality</label>
            <div className = {`${s.imageContainer} ${!loadinglocalidades ? s.disabled : ''}`}>
              <div className = {s.loadingContainer}>
                <Loading />
              </div>
            </div>
            <select
              className = {s.selectParam}
              value = {selection.localidad}
              onChange = {handleChange}
              name = {'localidad'}
              disabled = {localidades.length === 0 || selection.municipio === ''}
            >
              <option value={''} hidden defaultValue>
                Choose an Option
              </option>
              {
                localidades && localidades.map((localidad, index) => 
                  <option 
                    value = {index}
                    key = {`select-localidad-${localidad.id}-${index}`}
                  >
                    {localidad.name}
                  </option>
                )
              }
            </select>
          </div>

          <div className = {s.select}>
            <label className = {s.lbl}>Address</label>
            <div className = {s.imageContainer}>
              <div className = {s.helpContainer}>
                <div className = {s.tag}>
                  <ul>
                    <li>calle [altura]</li>
                    <li>calle 1 [altura] esquina/y calle 2</li>
                    <li>calle 1 esquina/y calle 2 [altura]</li>
                    <li>calle 1 [altura] entre calle 2 y calle 3</li>
                    <li>calle 1 entre calle 2 y calle 3 [altura]</li>
                  </ul>
                </div>
                <Help />
              </div>
            </div>
            <input 
              type = 'text'
              className = {s.inputAddress}
              placeholder = {'Insert an Address to Validate...'}
              disabled = {selection.localidad.length === 0}
              onInput = {handleInput}
              value = {inputAddress.name}
            />
          </div>

          <div className = {s.options}>
            <label className = {s.lblResult}>{resultValidation}</label>
            <button className = {s.btnOption} onClick = {handleCancel}>Cancel</button>
            <button
              className = {s.btnOption}
              disabled = {inputAddress.name.length === 0 || validating}
              onClick = {handleValidateAddress}
            >
              Validate
            </button>
            <button className = {s.btnOption} disabled = {!inputAddress.valid} onClick = {handleAddAddres}>Add</button>
          </div>

        </div>
      </div>
    </div>
  );
}