import React from 'react';

import s from './ProductCard.module.css';
import exampleImage from './example.jpg';
import exampleBrand from './exampleBrand.png';
import star from './star.svg';

export default function ProductCard({ id, name, category, price, discount, description, rating }) {

  let discountPrice = Math.round(price - price * (discount / 100));

  return (
    <div className = {`globalVariables lightTheme ${s.container}`}>

      <div className = {s.containerImage}>
        <img src = {exampleImage} alt = 'example' className = {s.img}/>
      </div>

      <div className = {s.containerDetails}>

        <div className = {s.containerTitle}>

          <div className = {s.containerBrand}>
            <img src = {exampleBrand} alt = 'exampleBrand' className = {s.img} />
          </div>

          <div className = {s.containerTitleAndCategory}>
            <span className = {s.name}>{name}</span>
            <span className = {s.category}>{category}</span>
          </div>

          <div className = {s.containerPrice}>
            <span className = {s.price}>${price}</span>
            {
              discount !== 0 &&
              <span className = {s.discountPrice}>${discountPrice}</span>
            }
          </div>

        </div>

        <div className = {s.containerDescription}>

          <span className = {s.description}>{description}</span>

          <div className = {s.rating}>

            <span className = {s.spanRating}>{rating}</span>
            <div className = {s.containerStar}>
              <img src = {star} className = {s.img} alt = 'star' />
            </div>

          </div>

        </div>

        <div className = {s.containerOptions}>

          <div className = {s.containerButtons}>
            <button className = {s.btn}>Buy</button>
            <button className = {s.btn}>View More</button>
          </div>

          <div className = {s.containerSVG}>
          </div>

        </div>

      </div>

    </div>
  );
}