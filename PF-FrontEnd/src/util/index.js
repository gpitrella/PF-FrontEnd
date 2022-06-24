export let buildFilter = function({ page, size, discount, name, category, brand, minPrice, maxPrice, orderBy, order }) {
  let query = `page=${page}`;
  if (size) query += `&size=${size}`;
  if (discount) query += '&discount=1';
  if (name !== '') query += `&name=${name}`;
  if (category !== 'None') query += `&category=${category}`;
  if (brand.length > 0) query += `&manufacturer=${brand.join(',')}`;
  if (minPrice !== '') query += `&min=${minPrice}`;
  if (maxPrice !== '') query += `&max=${maxPrice}`;
  query += `&order=${orderBy},${order}`;
  console.log(query);
  return query;
} 