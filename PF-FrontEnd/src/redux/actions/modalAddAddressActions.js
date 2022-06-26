import {
  SHOW_LOADING_PARAM,
  GET_PROVINCIAS,
  GET_MUNICIPIOS,
  GET_LOCALIDADES,
  VALIDATING_ADDRESS,
  NORMALIZE_ADDRESS
} from './actiontype';

const PATH_GET_PROVINCES = 'https://apis.datos.gob.ar/georef/api/provincias?orden=nombre';
const PATH_GET_MUNICIPIOS = 'https://apis.datos.gob.ar/georef/api/departamentos?max=300&orden=nombre&provincia=';
const PATH_GET_LOCALIDADES = 'https://apis.datos.gob.ar/georef/api/localidades?max=300&orden=nombre&departamento=';
const PATH_NORMALIZE_ADDRESS = 
'https://apis.datos.gob.ar/georef/api/direcciones?direccion=&localidad=&departamento=&provincia=';

const buildPathNormalizeAddress = function (direccion, localidad, departamento, provincia) {
  return PATH_NORMALIZE_ADDRESS.replace('direccion=', `direccion=${direccion}`)
                               .replace('localidad=', `localidad=${localidad}`)
                               .replace('departamento=', `departamento=${departamento}`)
                               .replace('provincia=', `provincia=${provincia}`);
}

export const showLoadingParam = function(param) {
  return {
    type: SHOW_LOADING_PARAM,
    payload: `loading${param}`
  }
}

export const validatingAddress = function() {
  return {
    type: VALIDATING_ADDRESS
  }
}

export const getProvincias = function() {
  return function(dispatch) {
    return fetch(PATH_GET_PROVINCES)
           .then(result => result.json())
           .then(data => dispatch({ type: GET_PROVINCIAS, payload: data.provincias }))
           .catch(error => console.log(error));
  }
}

export const getMunicipios = function(idProvincia) {
  return function(dispatch) {
    return fetch(`${PATH_GET_MUNICIPIOS}${idProvincia}`)
           .then(result => result.json())
           .then(data => dispatch({ type: GET_MUNICIPIOS, payload: data.departamentos }))
           .catch(error => console.log(error));
  }
}

export const getLocalidades = function(idMunicipio) {
  return function(dispatch) {
    return fetch(`${PATH_GET_LOCALIDADES}${idMunicipio}`)
           .then(result => result.json())
           .then(data => dispatch({ type: GET_LOCALIDADES, payload: data.localidades }))
           .catch(error => console.log(error));
  }
}

export const normalizeAddress = function(direccion, localidad, departamento, provincia) {
  return function(dispatch) {
    return fetch(buildPathNormalizeAddress(direccion, localidad, departamento, provincia))
           .then(result => result.json())
           .then(data => dispatch({ type: NORMALIZE_ADDRESS, payload: data.direcciones }))
           .catch(error => console.log(error));
  }
}