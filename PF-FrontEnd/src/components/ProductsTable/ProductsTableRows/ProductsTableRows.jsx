import React from 'react';
import ProductsTableRow from '../ProductsTableRow/ProductsTableRow';

import s from './ProductsTableRows.module.css';

export default function ProductsTableRows({ products }) {
  return (
    <>
      {
        products && products.length > 0 && products.map((product, index) =>

            <ProductsTableRow product = {product} />

        )
      }
    </>
  );
}