import {
  SHOW_LOADING_PARAM,
  GET_PROVINCIAS,
  GET_MUNICIPIOS,
  GET_LOCALIDADES
} from '../actions/actiontype';

const initialState = {
  provincias: [],
  municipios: [],
  localidades: [],
  loadingprovincias: false,
  loadingmunicipios: false,
  loadinglocalidades: false,
};

const generalReducer = function(state = initialState, { type, payload }) {
  switch(type) {
    case SHOW_LOADING_PARAM:
      return {
        ...state,
        [payload]: true,
      }
    case GET_PROVINCIAS:
      return {
        ...state,
        provincias: payload.map(provincia => { return { id: provincia.id, name: provincia.nombre } }),
        loadingprovincias: false
      }
    case GET_MUNICIPIOS:
      return {
        ...state,
        municipios: payload.map(municipio => { return { id: municipio.id, name: municipio.nombre } }),
        loadingmunicipios: false
      }
    case GET_LOCALIDADES:
      return {
        ...state,
        localidades: payload.map(localidad => { return { id: localidad.id, name: localidad.nombre } }),
        loadinglocalidades: false
      }
    default:
      return state;
  }
}

export default generalReducer;