export const headerData = [
  {
    name: 'id',
    className: 'widthSmall',
    enableSort: false,
  },
  {
    name: 'user',
    className: 'widthLarge',
    enableSort: true,
  },
  {
    name: 'total',
    className: 'widthMedium',
    enableSort: true,
  },
  {
    name: 'user direction',
    className: 'widthLarge',
  },
  {
    name: 'sucursal',
    className: 'widthMedium',
    enableSort: true,
  },
  {
    name: 'date',
    className: 'widthLarge',
    enableSort: true,
  },
  {
    name: 'status',
    className: 'widthLarge',
    enableSort: true,
  },
  {
    name: 'action',
    className: 'widthExtraLarge'
  }
];

const MAX_LENGTH = 35;

const PURCHASES_COLORS = {
  pending: {
    color: 'color_orange'
  },
  processing: {
    color: 'color_violet'
  },
  sending: {
    color: 'color_blue'
  },
  filled: {
    color: 'color_green'
  },
  cancelled: {
    color: 'color_red'
  },
}

export const rowData = [
  {
    name: 'id',
  },
  {
    name: 'user',
    isComplex: true,
    limit: MAX_LENGTH,
    getValue: (purchase) => {
      return purchase.user.email.length > MAX_LENGTH ? purchase.user.email.slice(0, MAX_LENGTH) + '...' : purchase.user.email;
    },
    addViewMore: false
  },
  {
    name: 'total',
    isComplex: true,
    getValue: (purchase) => {
      return '$' + purchase.total;
    }
  },
  {
    name: 'userDirection',
    isComplex: true,
    limit: MAX_LENGTH,
    getValue: (purchase) => {
      return purchase.userDirection.name.length > MAX_LENGTH ? 
      purchase.userDirection.name.slice(0, MAX_LENGTH) + '...' : 
      purchase.userDirection.name;
    },
    addViewMore: true
  },
  {
    name: 'sucursal',
    isComplex: true,
    getValue: (purchase) => {
      return purchase.sucursal.name
    },
  },
  {
    name: 'date',
    isComplex: true,
    getValue: (purchase) => {

      let dateOfPurchase = new Date(purchase.creationDate);
      let dateOfFullfilled = purchase.status === 'filled' && purchase.updatedAt ? new Date(purchase.updatedAt) : null;

      let dateOfPurchaseWithFormat = `${dateOfPurchase.getHours()}:${dateOfPurchase.getMinutes()}, ${dateOfPurchase.toDateString()}`;
      let dateOfFullfilledWithFormat = !dateOfFullfilled ? '...' :
      `${dateOfFullfilled.getHours()}:${dateOfFullfilled.getMinutes()}, ${dateOfFullfilled.toDateString()}`;

      return [
        dateOfPurchaseWithFormat,
        dateOfFullfilledWithFormat
      ]
    },
    isArray: true,
  },
  {
    name: 'status',
    isComplex: true,
    getValue: (purchase) => {
      return purchase.status.toUpperCase();
    },
    editable: true,
    editWith: 'SELECT',
    selectSource: 'purchaseStatusEnum',
    hasColors: true,
    getColor: (purchase) => PURCHASES_COLORS[purchase.status].color,
  },
  {
    name: 'action',
    isOption: true,
    editable: true,
    showOptions: true
  }
];