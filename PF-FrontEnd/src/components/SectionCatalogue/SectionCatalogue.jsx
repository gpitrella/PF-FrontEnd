import React from 'react';
import { Link } from 'react-router-dom';
import ProductCards from '../ProductCards/ProductCards';
import Loading from '../SVG/Loading';

import s from './SectionCatalogue.module.css';

export default function SectionCatalogue({ sectionPath, sectionName, products, loading, error }) {
  return (
    <div className = {s.container}>
      <div className = {s.title}>
        <h2 className = {s.titleOfSection}>{sectionName}:</h2>
        <Link className={s.sectionLink} to = {sectionPath} >View More</Link>
      </div>
      {
        !loading && !error && 
        <ProductCards products = {products} section = {sectionName}/>
      }
      {
        loading && 
        <div className = {s.noProductsContainer}>
          <div className = {s.imageContainer}>
            <Loading />
          </div>
          <span className = {s.span}>Loading Products</span>
        </div>
      }
      <div className = {s.separator}></div>
    </div>
  );
}