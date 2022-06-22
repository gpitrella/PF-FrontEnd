import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Carousel from 'react-multi-carousel';
import s from './ProductCards.module.css';
import 'react-multi-carousel/lib/styles.css';

export default function ProductCards() {

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

  let data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className = {s.container}>
      <div className = {s.containerCarrousel}>
        <Carousel responsive = {responsive} infinite = {true} itemClass = {s.carouselItem}>
          {
            data && data.map((product, index) => 

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
        </Carousel>
      </div>
    </div>
  );
}