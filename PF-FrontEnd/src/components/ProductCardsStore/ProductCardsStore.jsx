import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

import s from './ProductCardsStore.module.css';

export default function ProductCardsStore({ products }){
  return (
    <div className = {s.container}>
    {
      products && products.length > 0 && products.map((product, index) => 

        <ProductCard 
          id = {product.id}
          name = {product.name}
          category = {'example'}
          price = {product.price}
          discount = {product.discount}
          description = {product.description}
          rating = {9.5}
          image = {product.image}
          key = {`product-${product.id}-${index}`}
       />

      )
    }
    </div>
  );
}