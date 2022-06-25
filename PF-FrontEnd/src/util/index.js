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