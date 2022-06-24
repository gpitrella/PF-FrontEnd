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
          category = {product.categories[0]}
          price = {product.price}
          discount = {product.discount}
          rating = {9.5}
          image = {product.image}
          brand = {product.manufacturers[0]}
          key = {`product-${product.id}-${index}`}
       />

      )
    }
    </div>
  );
}