import React from 'react';
import ImageLoader from '../ImageLoader/ImageLoader';

import { Link } from 'react-router-dom';

import Heart from '../SVG/Heart';
import Cart from '../SVG/Cart';

import s from './ProductCard.module.css';
import exampleBrand from './exampleBrand.png';
import star from './star.svg';
import { useSelector } from 'react-redux';

export default function ProductCard({ id, name, image, category, price, discount, stock, rating, brand }) {
  let discountPrice = Math.round(price - price * (discount / 100));

  const cart = useSelector(state => state.general.productsCart);
  const isAlreadyOnCart = cart.some(product => product.id === id);

  const { favouritesProducts } = useSelector((state) => state.general);
  const alreadyFavourite = favouritesProducts?.find(product => product.id === id);


  return (
    <div className = {s.container}>

      <div className = {s.containerImage}>
        <Link to={`/productdetails/${id}`}>
          <ImageLoader image = {image} alt = {name} />
        </Link>
      </div>

      <div className = {s.containerDetails}>

        <div className = {s.containerTitle}>

          <div className = {s.containerBrand}>
            <img src = {brand?.image} alt = {brand?.name} className = {s.img} />
          </div>

          <div className = {s.containerTitleAndCategory}>
            <span className = {s.name}>{name}</span>
            <span className = {s.category}>{category}</span>
          </div>
        </div>

        <div className = {s.containerOptions}>

          <div className = {s.containerPrice}>
            <span className = {s.price}><i className = {s.priceSymbol}>$</i>{ discount !== 0 ? discountPrice : price }</span>
            {
              discount !== 0 &&
              <span className = {s.discountPrice}>${price}</span>
            }
          </div>

          {
            stock > 0 && <span className={`${s.spanStock} ${s.green}`}>In Stock</span>
          }

          {
            stock === 0 && <span className={`${s.spanStock} ${s.red}`}>Sold Out</span>
          }

          <div className = {s.containerButtonsSVG}>
            <div className = {`${s.containerSVG} ${alreadyFavourite ? s.alreadyFavourite : ''}`}>
              <Heart id={id}/>
            </div>

            <div className = {`${s.containerSVG} ${isAlreadyOnCart ? s.alreadyOnCart : ''}`}>
              <Cart id={id}/>
            </div>
          </div>

        </div>

         <div className = {s.rating}>

            <div className = {s.containerStar}>
              <img src = {star} className = {s.img} alt = 'star' />
            </div>
            <span className = {s.spanRating}>{rating}</span>
          </div>

      </div>

      {
        discount !== 0 &&
        <div className = {s.containerDiscount}>
          {discount}% OFF
        </div>
      }

    </div>
  );
}