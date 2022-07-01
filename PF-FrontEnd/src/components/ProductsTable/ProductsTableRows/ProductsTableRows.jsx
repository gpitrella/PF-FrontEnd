import React from 'react';
import ProductsTableRow from '../ProductsTableRow/ProductsTableRow';

import s from './ProductsTableRows.module.css';

export default function ProductsTableRows({ products }) {

  if (products.length < 10) {
    products = products.concat((Array(10 - products.length).fill({ isDummy: true })));
  }

  return (
    <>
      {
        products && products.length > 0 && products.map((product, index) =>

          <ProductsTableRow product = {product} key = {`product-rows-${index}`}/>

        )
      }
    </>
  );
}