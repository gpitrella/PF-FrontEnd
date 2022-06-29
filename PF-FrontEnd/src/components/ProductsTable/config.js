export const headerData = [
  {
    name: 'id',
    className: 'widthSmall'
  },
  {
    name: 'image',
    className: 'widthMedium'
  },
  {
    name: 'name',
    className: 'widthLarge',
    enableSort: true,
  },
  {
    name: 'category',
    className: 'widthMedium'
  },
  {
    name: 'brand',
    className: 'widthMedium'
  },
  {
    name: 'price',
    className: 'widthMedium',
    enableSort: true,
  },
  {
    name: 'discount',
    className: 'widthMedium'
  },
  {
    name: 'stock',
    className: 'widthMedium'
  },
  {
    name: 'rating',
    className: 'widthSmall'
  },
  {
    name: 'status',
    className: 'widthSmall'
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
    name: 'image',
    isImage: true
  },
  {
    name: 'name',
    isComplex: true,
    limit: MAX_LENGTH,
    getValue: (product) => {
      return product.name.length > MAX_LENGTH ? product.name.slice(0, MAX_LENGTH) + '...' : product.name;
    },
    addViewMore: true,
    editable: true,
    editWith: 'TEXTAREA'
  },
  {
    name: 'category',
    isComplex: true,
    getValue: (product) => {
      return product.categories[0];
    },
    editable: true,
    editWith: 'SELECT',
    selectSource: 'categories' 
  },
  {
    name: 'brand',
    isComplex: true,
    getValue: (product) => {
      return product.manufacturers[0].name;
    },
    editable: true,
    editWith: 'SELECT',
    selectSource: 'brands' 
  },
  {
    name: 'price',
    isComplex: true,
    getValue: (product) => {
      return '$' + product.price;
    },
    editable: true,
    editWith :'NUMERIC-INPUT',
    validWithCurrency: true,
    limits: true,
    min: 1,
    max: Infinity,
  },
  {
    name: 'discount',
    isComplex: true,
    getValue: (product) => {
      return product.discount + '%';
    },
    editable: true,
    editWith: 'NUMERIC-INPUT',
    validWithInt: true,
    limits: true,
    min: 0,
    max: 99,
  },
  {
    name: 'stock',
    editable: true,
    editWith: 'NUMERIC-INPUT',
    validWithInt: true
  },
  {
    name: 'rating',
  },
  {
    name: 'status',
    isComplex: true,
    getValue: (product) => {
      return product.inactive ? 'inactive' : 'active';
    },
    isSwitch: true,
    editable: true,
    editWith: 'TOGGLE'
  },
  {
    name: 'action',
    isOption: true
  }
];