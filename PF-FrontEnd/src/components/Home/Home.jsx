import React from 'react';
import Ads from '../Ads/Ads';
import Brands from '../Brands/Brands';
import Categories from '../Categories/Categories';
import ProductCards from '../ProductCards/ProductCards';
import { Link } from 'react-router-dom';
import style from './Home.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { 
          showLoadingSectionOne,
          showLoadingSectionTwo,
          showLoadingSectionThree,
          getProductsToSectionOne,
          getProductsToSectionTwo,
          getProductsToSectionThree
        } from '../../redux/actions';
import Loading from '../SVG/Loading';

export default function Home () {

  const dispatch = useDispatch();
  const { section } = useSelector(state => state.homepage);

  React.useEffect(() => {
    dispatch(showLoadingSectionOne());
    dispatch(showLoadingSectionTwo());
    dispatch(showLoadingSectionThree());
    dispatch(getProductsToSectionOne('page=1&discount=1&size=10&order=random'));
    dispatch(getProductsToSectionTwo('page=1&category=NOTEBOOKS&size=10&order=random'));
    dispatch(getProductsToSectionThree('page=1&category=KEYBOARDSs&size=10&order=random'));
  }, []);

  return (
    <div>
      <div className={style.ads}>
        <Ads/>
      </div>
      <div className={style.catalogue}>
        <h2>SECTION 1</h2>
        <Link className={style.sectionLink} to="/store/discount/show" >View More</Link>
        {
          section && !section.showLoadingOne && !section.errorOne && 
          <ProductCards products = {section.one.content} section = {1}/>
        }
        {
          section && section.showLoadingOne && 
          <div className = {style.noProductsContainer}>
            <div className = {style.imageContainer}>
              <Loading />
            </div>
            <span className = {style.span}>Loading Products</span>
          </div>
        }
        <h2>SECTION 2</h2>
        <Link className={style.sectionLink} to="/store/category/Notebooks" >View More</Link>
        {
          section && !section.showLoadingTwo && !section.errorTwo &&
          <ProductCards products = {section.two.content} section = {2}/>
        }
        {
          section && section.showLoadingTwo && 
          <div className = {style.noProductsContainer}>
            <div className = {style.imageContainer}>
              <Loading />
            </div>
            <span className = {style.span}>Loading Products</span>
          </div>
        }
        <h2>SECTION 3</h2>
        <Link className={style.sectionLink} to="/store/category/Keyboards" >View More</Link>
        {
          section && !section.showLoadingThree && !section.errorThree &&
          <ProductCards products = {section.three.content} section = {3}/>
        }
        {
          section && section.showLoadingThree && 
          <div className = {style.noProductsContainer}>
            <div className = {style.imageContainer}>
              <Loading />
            </div>
            <span className = {style.span}>Loading Products</span>
          </div>
        }
      </div>
      <Categories />
      <div className={style.brandsTitle}>
        <h3>BRANDS</h3>
      </div>
      <Brands />
    </div>
  )
};