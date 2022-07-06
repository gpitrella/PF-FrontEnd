import {
  EXAMPLE_ACTION
} from "../actions/actiontype";

const purchase = {
  id: 1,
  user: {
    id: 10,
    email: "romerof14@gmail.com"
  },
  total: 10000,
  userDirection: { 
    name: "BOYACA 3419, Merlo, Buenos Aires",
    lat: "-34.698054729991725",
    lon: "-58.76923954578144"
  },
  branchOffice: {
    name: 'SUCURSAL MERLO',
  },
  creationDate: "2022-07-05T23:31:20.169Z",
  updatedAt: "2022-07-05T23:31:20.169Z",
  status: 'IN PROCESSS'
}

const initialState = {
  purchases: [ ...Array(10).keys() ].map(i=> { return {...purchase, id: i, updatedAt: i % 2 === 0 ? purchase.updatedAt : null } }),
  showLoading: false
}

const purchaseReducer = function(state = initialState, { type, payload }) {
    switch(type) {
      
      case EXAMPLE_ACTION:
        return {
          ...state
        }
  
      default:
        return state;
    }
  }
  
  export default purchaseReducer;