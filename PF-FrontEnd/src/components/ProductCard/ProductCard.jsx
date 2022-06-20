import React from 'react';

import s from './ProductCard.module.css';
import exampleImage from './example.jpg';
import exampleBrand from './exampleBrand.png';

export default function ProductCard(props) {
  return (
    <div className = {`globalVariables lightTheme ${s.container}`}>

      <div className = {s.containerImage}>
        <img src = {exampleImage} alt = 'example' className = {s.img}/>
      </div>

      <div className = {s.containerDetails}>

        <div className = {s.containerTitle}>

          <div className = {s.containerBrand}>

          </div>

          <span className = {s.title}></span>
          <span className = {s.price}></span>

        </div>

        <div className = {s.containerDescription}>

          <span className = {s.description}></span>

          <div className = {s.rating}>

          </div>

        </div>

        <div className = {s.containerOptions}>

          <div className = {s.containerButtons}>
            <button className = {s.btn}></button>
            <button className = {s.btn}></button>
          </div>

          <div className = {s.containerSVG}>
          </div>

        </div>

      </div>

    </div>
  );
}