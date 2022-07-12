export let buildFilter = function({ page, size, discount, name, category, brand, minPrice, maxPrice, orderBy, order, hidden }) {
  let query = `page=${page}`;
  if (size) query += `&size=${size}`;
  if (discount) query += '&discount=1';
  if (name !== '') query += `&name=${name}`;
  if (category !== 'None') query += `&category=${category}`;
  if (brand.length > 0) query += `&manufacturer=${brand.join(',')}`;
  if (minPrice !== '') query += `&min=${minPrice}`;
  if (maxPrice !== '') query += `&max=${maxPrice}`;
  if (hidden) query += '&isVisible=false';
  query += `&order=${orderBy},${order}`;
  console.log(query);
  return query;
}

export const buildPathWithFilter = function({ discount, name, category, brand, minPrice, maxPrice }) {
  let path = ['All'];
  if (discount) path.push('On Discount');
  if (name !== '') path.push(`'${name}'`);
  if (category !== 'None') path.push(category);
  if (brand.length > 0) path.push(brand.join(', '));
  if (minPrice !== '' && maxPrice !== '') path.push(`Price Between $${minPrice} and $${maxPrice}`);
  else if (minPrice !== '') path.push(`Price Higher than $${minPrice}`);
  else if (maxPrice !== '') path.push(`Price Lower than $${maxPrice}`);
  return path;
}

export const chooseRandom = function(content) {
  return content[Math.floor( Math.random() * content.length )].name;
}

export const generatePurchasesWithFilter = function(purchases, filter) {
  let newPurchases = [ ...purchases ];
  let newFilter = { ...filter };

  if (filter.sucursal !== 'none' || filter.status !== 'none' ) { 
    newPurchases = filterPurchases(newPurchases, filter);
  }
  newPurchases = orderPurchases(newPurchases, filter);
  return [
    newPurchases.slice( (filter.page - 1) * 10, filter.page * 10 ),
    { ...newFilter, results: newPurchases.length, pages: Math.ceil(newPurchases.length / 10),
      page: filter.page <= Math.ceil(newPurchases.length / 10) ? filter.page : 1
    }
  ]
}

const filterPurchases = function(purchases, filter) {
  return purchases.filter(purchase => {
      if (filter.sucursal !== 'none' && filter.status === 'none') return filter.sucursal === purchase.sucursal.name;
      if (filter.sucursal === 'none' && filter.status !== 'none') return filter.status === purchase.status;
      return filter.sucursal === purchase.sucursal.name && filter.status === purchase.status;
    });
}

const orderPurchases = function(purchases, filter) {
  return purchases.sort((prev, next) => {
    if (filter.orderBy === 'user') {
      if (prev['user'].email > next['user'].email) return filter.order === 'asc' ? 1 : -1;
      if (prev['user'].email < next['user'].email) return filter.order === 'asc' ? -1 : 1;
    }
    else if (filter.orderBy === 'sucursal') {
      if (prev['sucursal'].name > next['sucursal'].name) return filter.order === 'asc' ? 1 : -1;
      if (prev['sucursal'].name < next['sucursal'].name) return filter.order === 'asc' ? -1 : 1;
    }
    else if (filter.orderBy === 'date') 
      return (new Date(next['creationDate']) - new Date(prev['creationDate'])) * (filter.order === 'asc' ? -1 : 1);
    else {
      if (prev[filter.orderBy] > next[filter.orderBy]) return filter.order === 'asc' ? 1 : -1;
      if (prev[filter.orderBy] < next[filter.orderBy]) return filter.order === 'asc' ? -1 : 1;
    }
    return prev.id > next.id ? 1 : -1;
  });
}

export function validateImageToUpload(file) {
  let result = ''
  if (!UPLOAD_IMAGE_PARAMS.VALID_TYPES.includes(file.type)) result = UPLOAD_IMAGE_PARAMS.SHOW_ERROR.INVALID_TYPE;
  else if (UPLOAD_IMAGE_PARAMS.VALID_SIZE < file.size) result = UPLOAD_IMAGE_PARAMS.SHOW_ERROR.INVALID_SIZE;
  return {
    valid: result === '' ? true : false,
    msg: result
  }
}

// PARA EL CONTROL DE LA SUBIDA DE IMAGENES:

export const UPLOAD_IMAGE_PARAMS = {

  VALID_TYPES: [
    'image/png',
    'image/jpeg',
    'image/jpg'
  ],

  VALID_SIZE: 3 * 1024 * 1024,

  SHOW_ERROR: {
    INVALID_SIZE: 'El archivo ingresado es demasiado grande.',
    INVALID_TYPE: 'El tipo de archivo ingresado no es valido.'
  }
}

export let formatPurchases = function(purchases) {
  return purchases.map((purchase) => {
    return {
      id: purchase.id,
      user: {
        id: purchase.users[0].id,
        email: purchase.users[0].email
      },
      total: purchase.totalpurchase,
      userDirection: {
        name: purchase.useraddresses[0].direction,
        lat: purchase.useraddresses[0].latitude.toString(),
        lon: purchase.useraddresses[0].longitude.toString(),
      },
      sucursal: {
        name: purchase.branch_office.name
      },
      creationDate: purchase.createdAt,
      updatedAt: purchase.updatedAt,
      status: purchase.status
    }
  });
}

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