import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../redux/actions/homepageActions';
import CategCard from './CategCard';
import Carousel from 'react-grid-carousel';
import 'react-multi-carousel/lib/styles.css';
import style from"./Categories.module.css";


export default function Categories () {
    const dispatch = useDispatch();
    const { allCategories } = useSelector((state) => state.homepage);
    console.log(allCategories)

    useEffect(()=>{
        dispatch(getCategories());
    }, [dispatch])

    const responsive = [
        {
          breakpoint: 1200,
          cols: 8,
          rows: 2,
          loop: true
        },
        {
          breakpoint: 990,
          cols: 6,
          rows: 2,
          loop: true
        }
      ];

    return (
        <>
        <div className={style.catTitle}>            
            <h3>CATEGORIES</h3>
        </div>
        <div className={style.categoriesContainer}>
            <div className={style.containerCarousel}>
                {
                allCategories?.length > 0 ? (
                    <Carousel
                    cols={6}
                    rows={2}
                    infinite={true}
                    responsiveLayout={responsive}
                    mobileBreakpoint={670}
                    gap={1}
                    showDots={true}
                    dotColorActive={'#1976d2'}
                    dotColorInactive={'#dddddd'}
                    autoplay={1000}
                    >
                        {
                        allCategories?.map((category) =>
                            <Carousel.Item>
                                <CategCard key={category.id} name={category.name} image={category.image} />
                            </Carousel.Item>
                        )}
                    </Carousel>
                ) : (
                <div>
                    <p>No products in that category...</p>
                </div>
                )}
            </div>
        </div>
        </>
    )
};