import {
  RESET_PURCHASES,
  SET_ORIGINAL_PURCHASES,
  UPDATE_FILTER_PURCHASES,
  SET_SHOW_LOADING_PURCHASES,
  GET_PURCHASES_WITH_FILTER_AND_PAGINATE,
  WAITING_RESPONSE_PUT_PURCHASE,
  PUT_PURCHASE,
  ERROR_PUT_PURCHASE
} from "../actions/actiontype";

import { generatePurchasesWithFilter, formatPurchases } from '../../util';

// const purchase = {
//   id: 1,
//   user: {
//     id: 10,
//     email: "romerof14@gmail.com"
//   },
//   total: 10000,
//   userDirection: { 
//     name: "BOYACA 3419, Merlo, Buenos Aires",
//     lat: "-34.698054729991725",
//     lon: "-58.76923954578144"
//   },
//   sucursal: {
//     name: 'SUCURSAL MERLO',
//   },
//   creationDate: "2022-07-05T23:31:20.169Z",
//   updatedAt: "2022-07-05T23:31:20.169Z",
//   status: 'in process'
// };

// const DATES = [
//   {
//     creationDate: "2022-03-05T23:31:20.169Z",
//   },
//   {
//     creationDate: "2022-01-05T23:31:20.169Z",
//   },
//   {
//     creationDate: "2019-05-05T23:31:20.169Z",
//   },
//   {
//     creationDate: "2021-02-05T23:31:20.169Z",
//   },
//     {
//     creationDate: "2020-06-05T23:31:20.169Z",
//   },
// ]

const PURCHASES_STATUS_ENUM = [
  {
    value: 'pending',
    color: 'yellow'
  },
  {
    value: 'processing',
    color: 'orange'
  },
  {
    value: 'sending',
    color: 'blue'
  },
  {
    value: 'filled',
    color: 'green'
  },
  {
    value: 'cancelled',
    color: 'red'
  },
];

// const BRANCH_OFFICES = [
//   {
//     name: 'MERLO'
//   },
//   {
//     name: 'ADROGUE'
//   },
//   {
//     name: 'CABA'
//   }
// ];

// const USERS = [
  
//   {
//     id: 8,
//     email: "ahabitu@gmail.com",
//   },
//   {
//     id: 7,
//     email: "gabrielpitrella@gmail.com"
//   },
//   {
//     id: 10,
//     email: "romerof14@gmail.com"
//   },
//   {
//     id: 11,
//     email: "prueba@gmail.com"
//   }
// ]

// const PURCHASES = [ ...Array(30).keys() ].map( i => { 
//     return {
//       ...purchase,
//       id: i + 1,
//       total: i * 1000 + 500,
//       status: PURCHASES_STATUS_ENUM[i % 5].value,
//       sucursal: BRANCH_OFFICES[i % 3],
//       user: USERS[i % 4],
//       creationDate: DATES[i % 5].creationDate
//     }
//   });

const initialState = {
  showPurchases: false,
  originalPurchases: [],
  purchases: [],
  showLoading: false,
  purchaseStatusEnum: [ ...PURCHASES_STATUS_ENUM ],
  filter: {
    order: 'asc',
    orderBy: 'status',
    sucursal: 'none',
    status: 'none',
    page: 1,
    pages: 1,
    results: 10
  },
  resultPut: {
    waitingResponse: false,
    status: false,
    error: false,
    errorMsg: '',
  },
}

const purchaseReducer = function(state = initialState, { type, payload }) {
    switch(type) {

      case RESET_PURCHASES:
        return {
          ...initialState
        }
      case SET_ORIGINAL_PURCHASES:
        let serverPurchases = formatPurchases(payload);
        let [ ogPurchases, ogFilter ] = generatePurchasesWithFilter(serverPurchases, state.filter);
        return {
          ...state,
          originalPurchases: serverPurchases,
          purchases: [ ...ogPurchases ],
          filter: { ...ogFilter },
          showPurchases: true,
          showLoading: false
        }
      case UPDATE_FILTER_PURCHASES:
        return {
          ...state,
          filter: { ...payload }
        }      
      case SET_SHOW_LOADING_PURCHASES:
        return {
          ...state,
          showLoading: true,
          purchases: []
        }
      case GET_PURCHASES_WITH_FILTER_AND_PAGINATE:
        let [ updatedPurchases, updatedFilter ] = generatePurchasesWithFilter(state.originalPurchases, payload);
        return {
          ...state,
          purchases: [ ...updatedPurchases ],
          filter: { ...updatedFilter },
          showLoading: false
        }
      case WAITING_RESPONSE_PUT_PURCHASE:
        return {
          ...state,
          resultPut: {
            ...state.resultPut,
            waitingResponse: payload,
            status: false,
            error: false,
            errorMsg: '',
          }
        }
      case PUT_PURCHASE:
        return {
          ...state,
          resultPut: {
            ...state.resultPut,
            status: true
          }
        }
      case ERROR_PUT_PURCHASE:
        return {
          ...state,
          resultPut: {
            ...state.resultPut,
            watingResponse: false,
            error: true,
            errorMsg: payload.response && payload.response.data ? payload.response.data : 'Server Error. Try Again...'
          }
        }
      default:
        return state;
    }
  }
  
  export default purchaseReducer;