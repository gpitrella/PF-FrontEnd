import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import NoResults from '../SVG/NoResults';
import Carousel from 'react-multi-carousel';
import s from './ProductCards.module.css';
import 'react-multi-carousel/lib/styles.css';

export default function ProductCards({ products, section }) {

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1680 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1680, min: 1260 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1260, min: 840 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 840, min: 0 },
      items: 1
    }
  };

  return (
    <div className = {s.container}>
      <div className = {s.containerCarrousel}>
        {
          products && products.length !== 0 &&

          <Carousel responsive = {responsive} infinite = {true} itemClass = {s.carouselItem}>
            {
              products && products.map((product, index) => 

                <ProductCard 
                  id = {product.id}
                  name = {product.name}
                  category = {product.categories[0]}
                  price = {product.price}
                  discount = {product.discount}
                  rating = {9.5}
                  image = {product.image}
                  brand = {product.manufacturers[0]}
                  key = {`product-${section}-${product.id}-${index}`}
               />

              )
            }
          </Carousel>
        }
        {
          products && products.length === 0 &&
          <div className = {s.noProductsContainer}>
            <div className = {s.imageContainer}>
              <NoResults />
            </div>
            <span className = {s.span}>No products to show</span>
          </div>
        }
      </div>
    </div>
  );
}