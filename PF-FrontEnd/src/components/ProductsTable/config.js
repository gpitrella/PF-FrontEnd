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
    sort: true,
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
    sort: true,
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
    name: 'hidden',
    className: 'widthSmall'
  },
  {
    name: 'action',
    className: 'widthLarge'
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
    addViewMore: true
  },
  {
    name: 'category',
    isComplex: true,
    getValue: (product) => {
      return product.categories[0];
    }
  },
  {
    name: 'brand',
    isComplex: true,
    getValue: (product) => {
      return product.manufacturers[0].name;
    }
  },
  {
    name: 'price',
    isComplex: true,
    getValue: (product) => {
      return '$' + product.price;
    }
  },
  {
    name: 'discount',
    isComplex: true,
    getValue: (product) => {
      return product.discount + '%';
    }
  },
  {
    name: 'stock',
  },
  {
    name: 'rating',
  },
  {
    name: 'hidden',
  },
  {
    name: 'action',
  }
];