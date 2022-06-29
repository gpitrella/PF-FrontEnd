export const headerData = [
  {
    name: 'id',
    className: 'widthSmall'
  },
  {
    name: 'name',
    className: 'widthLarge',
    sort: true,
  },
  {
    name: 'description',
    className: 'widthLarge'
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
    name: 'options',
    className: 'widthLarge'
  }
];

export const rowData = [
  {
    name: 'id',
  },
  {
    name: 'name',
    isComplex: true,
    getValue: (product) => {
      return product.name.length > 50 ? product.name.slice(0, 50) + '...' : product.name;
    },
    addViewMore: true
  },
  {
    name: 'description',
    isComplex: true,
    getValue: (product) => {
      return product.description.length > 50 ? product.description.slice(0, 50) + '...' : product.description;
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
    name: 'options',
  }
];