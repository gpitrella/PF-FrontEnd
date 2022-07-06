export const headerData = [
  {
    name: 'id',
    className: 'widthSmall'
  },
  {
    name: 'user',
    className: 'widthLarge'
  },
  {
    name: 'total',
    className: 'widthMedium'
  },
  {
    name: 'user direction',
    className: 'widthLarge',
  },
  {
    name: 'sucursal',
    className: 'widthMedium',
  },
  {
    name: 'date',
    className: 'widthLarge',
  },
  {
    name: 'status',
    className: 'widthMedium'
  },
  {
    name: 'action',
    className: 'widthExtraLarge'
  }
];

const MAX_LENGTH = 35;

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
    addViewMore: true
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
      return purchase.branchOffice.name
    },
  },
  {
    name: 'date',
    isComplex: true,
    getValue: (purchase) => {

      let dateOfPurchase = new Date(purchase.creationDate);
      let dateOfFullfilled = purchase.updatedAt ? new Date(purchase.updatedAt) : null;

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
    editable: false,
    editWith: 'SELECT',
    selectSource: 'purchaseStatusEnum'
  },
  {
    name: 'action',
    isOption: true,
    editable: true,
    showOptions: true
  }
];