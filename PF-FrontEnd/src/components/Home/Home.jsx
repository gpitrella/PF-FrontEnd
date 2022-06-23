import React from 'react';
import Ads from '../Ads/Ads';
import Brands from '../Brands/Brands';
import Categories from '../Categories/Categories';
import ProductCards from '../ProductCards/ProductCards';
import { Link } from 'react-router-dom';
import style from './Home.module.css';

export default function Home () {

    return (
        <div>
            <div className={style.ads}>
                <Ads/>
            </div>
            <div className={style.catalogue}>
                <h2>SECTION 1</h2>
                <Link className={style.sectionLink} to="/store" >View More</Link>
                <ProductCards />
                <h2>SECTION 2</h2>
                <Link className={style.sectionLink} to="/store" >View More</Link>
                <ProductCards />
                <h2>SECTION 3</h2>
                <Link className={style.sectionLink} to="/store" >View More</Link>
                <ProductCards />
            </div>
            <Categories />
            <div className={style.brandsTitle}>
                <h3>BRANDS</h3>
            </div>
            <Brands />
        </div>
    )
};