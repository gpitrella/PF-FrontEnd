import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showLoadingParam, getProvincias, getMunicipios, getLocalidades } from '../../redux/actions';

import s from './ModalAddAddress.module.css';

export default function ModalAddAddress() {

  const dispatch = useDispatch();
  const { 
    provincias, municipios, localidades, loadingprovincias, loadingmunicipios, loadinglocalidades 
  } = useSelector(state => state.modalAddAddress);
  const [ selection, setSelection ] = React.useState({
    provincia: '',
    municipio: '',
    localidad: '',
  })

  React.useEffect(() => {
    dispatch(showLoadingParam('provincias'));
    dispatch(getProvincias());
  }, []);

  let handleChange = function(e) {
    let { name, value } = e.target;
    
    setSelection({
      [name]: value
    });

    if (name === 'provincia' && selection.provincia !== value) {
      dispatch(showLoadingParam('municipios'));
      dispatch(getMunicipios(provincias[value].id));
    }
    if (name === 'municipio' && selection.municipio !== value) {
      dispatch(showLoadingParam('localidades'));
      dispatch(getLocalidades(municipios[value].id));
    }
  }

  return (
    <div className = {s.container}>
      {
        !loadingprovincias && provincias && provincias.length > 0 && selection &&
        <div className = {s.select}>
          <label className = {s.lbl}>Choose a Province</label>
          <select className = {s.selectFilter} value = {selection.provincia} onChange = {handleChange} name = {'provincia'}>
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
      }
      {
        !loadingmunicipios && municipios && municipios.length > 0 && selection &&
        <div className = {s.select}>
          <label className = {s.lbl}>Choose a Municipe</label>
          <select className = {s.selectFilter} value = {selection.municipio} onChange = {handleChange} name = {'municipio'}>
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
      }
      {
        !loadinglocalidades && localidades && localidades.length > 0 && selection &&
        <div className = {s.select}>
          <label className = {s.lbl}>Choose a Locality</label>
          <select className = {s.selectFilter} value = {selection.localidad} onChange = {handleChange} name = {'localidad'}>
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
      }
    </div>
  );
}