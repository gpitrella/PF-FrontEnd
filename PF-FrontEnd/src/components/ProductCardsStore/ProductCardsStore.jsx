import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

import s from './ProductCardsStore.module.css';

export default function ProductCardsStore({ products }){
  return (
    <div className = {s.container}>
    {
      products && products.length > 0 && products.map((product, index) => 

        <ProductCard 
          id = {1}
          name = {`example ${index}`}
          category = {'Prebuild Computer'}
          price = {50000}
          discount = {50}
          description = {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mattis.'}
          rating = {9.5}
          key = {`product-${index}`}
       />

      )
    }
    </div>
  );
}