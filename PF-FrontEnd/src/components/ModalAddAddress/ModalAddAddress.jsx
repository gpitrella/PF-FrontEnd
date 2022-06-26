import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showLoadingParam, getProvincias, getMunicipios, getLocalidades } from '../../redux/actions';
import Loading from '../SVG/Loading';

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
    console.log('Disparo solicitud de provincias.');
  }, []);

  let handleChange = function(e) {
    let { name, value } = e.target;
    
    let newSelection = {
      ...selection,
      [name]: value
    }

    if (name === 'provincia' && selection.provincia !== value) {
      dispatch(showLoadingParam('municipios'));
      console.log('Disparo solicitud de municipios.');
      dispatch(getMunicipios(provincias[value].id));
      newSelection.municipio = '';
      newSelection.localidad = '';
    }
    if (name === 'municipio' && selection.municipio !== value) {
      dispatch(showLoadingParam('localidades'));
      console.log('Disparo solicitud de localidades');
      dispatch(getLocalidades(municipios[value].id));
      newSelection.localidad = '';
    }

    setSelection({ ...newSelection });
  }

  return (
    <div className = {s.globalContainer}>
      <div className = {s.container}>

        <div className = {s.banner}>
          <label className = {s.title}>Add Address</label>
          <label className = {s.btnClose}>X</label>
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
            <label className = {s.lbl}>Municipe</label>
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
        </div>
      </div>
    </div>
  );
}