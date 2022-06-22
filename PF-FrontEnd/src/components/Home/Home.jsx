import React from 'react';
import Logo from '../../assets/logo_cyber_monday.png';
import Brands from '../Brands/Brands';
import Categories from '../Categories/Categories';
import ProductCards from '../ProductCards/ProductCards';
import style from './Home.module.css';

export default function Home () {
    return (
        <div>
            <div className={style.ads}>
                <img src={Logo} alt="cyber monday" />
            </div>
            <div className={style.catalogue}>
                <h2>SECTION 1</h2>
                <h2>View More</h2>
                <ProductCards />
                <h2>SECTION 2</h2>
                <h2>View More</h2>
                <ProductCards />
                <h2>SECTION 3</h2>
                <h2>View More</h2>
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