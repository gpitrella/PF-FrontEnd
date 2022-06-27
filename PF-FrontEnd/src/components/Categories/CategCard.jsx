import React from 'react';
import { Link } from 'react-router-dom';
import style from './CategCard.module.css';

export default function CategCard (category) {
    return (
        <div className={style.catContainer}>
            <div className = {style.catLink}>
                <Link to = {`store/category/${category.name}`}>
                    {
                    category.image ? ( 
                    <img className={style.catImage} src={category.image} alt={category.name} /> 
                    ) : (
                    <img className={style.catImage} src={"https://img.icons8.com/dotty/80/22C3E6/workstation.png"} alt={category.name} /> 
                    )}
                    <div key={category.id} className={style.catName}>
                        <h4>{category.name}</h4>
                    </div>
                </Link>
            </div>
        </div>
    )
};