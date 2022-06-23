import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../redux/actions/homepageActions';
import { Link } from 'react-router-dom';
import style from"./Categories.module.css";

export const categories = [
    {id: 1,
    name: "prebuilt computers",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJWSd1lcJYfcGY3C6kQTKMJa9AmiHZMNP40dxGMdZZzRS-kwd7dAGtpfUcG7Ws85zSoHU&usqp=CAU"
    },
    {id: 2,
    name: "headphones",
    image: "https://i.pinimg.com/originals/6a/52/41/6a5241557e864a15994f03dc26662bfb.png"
    },
    {id: 3,
    name: "keyboards",
    image: "data:image/png;base64,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"
    },
    {id: 4,
    name: "mouses",
    image: "http://simpleicon.com/wp-content/uploads/mouse.png"
    },
    {id: 5,
    name: "notebooks", 
    image: "https://image.shutterstock.com/image-vector/notebook-computer-icon-logo-symbol-260nw-1517977766.jpg"
    },
    {id: 6,
    name: "monitors",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAAD6+vrc3NyGhoa0tLRLS0utra2Ojo7n5+dWVlZgYGDw8PBAQEAzMzOlpaUsLCwfHx8YGBhbW1vGxsY6OjptbW3V1dVycnIKCgpoaGhRUVGUlJTPz8+AgIB6enqenp6MGjGlAAACgklEQVR4nO3b607iUBhG4d2DQKHlWEHB0/1f5cDgjG6IOMn069d3u55/pkbelZC2pBICAAD/rlpMl1kaltNFddXXNt6zOta0UV898x5kYFZ/BBYr7zUmVsXfQO8pZt4T67X3EDPr8xt1473D0Ob3WdR7hanTGTW1y0SsOV7ovTcYq8LCe4KxRUjxWv/ZLNx7TzB2H9K9GJ6tQ/xznoI46aKw649kLijUR6E+CvVRqI9CfRTqo1Afhfoo1EehPgr1UaiPQn0U6qNQH4X6KNRHoT4K9VGoj0J9FOqjUB+F+ijUR6E+CvVRqI9CfRTqo1Afhfoo1EehPgr1UaiPQn0U6qNQH4X6KNRHoT4K9VGoj0J9FOqjUB+F+ijUR6E+CvX98MK7FNwsTBCF+ijUR6E+CvVRqI9CfReFZQpuFnp/tOsEhfoo1EehPgr1UaiPQn0U6qNQH4X6KNRHoT4K9VGo72ZhkYKLwnWWtnVovCcYa8LWe4KxbRh7TzA2DrX3BGN1CBvvDaY2x6vHznuEqd3pAvngvcLQw/keYO69w8z8/S6nfvReYuSx/nMjV4+8t5gY1R/3qnn5/e/LKfPofrzaew/q2L66+syRt+X+MOrQYRm95Dw6GJ/dlt2+8L5s86s+C09RxV10LP7ax1Mve7o3iSrG0bH4dnjitPB/UUjh8FFI4fBRSOHwUUjh8FFI4fBRSOFQ5F+5Kvx87LLw67/i7dn6Cev22Tfwxbjv5MUz8LWHwCx79QtsewnMstat8NBT4cErsOopMMuun0H0o/h+WkcKCo2k/y4N054Cp16Bvf2jys6t8OIJoRXXp4tvPQS+eQYezzaTlWneauJ2lgEA/CC/AGtZUk+JVC3vAAAAAElFTkSuQmCC"
    },
    {id: 7,
    name: "hard disk drives",
    image: "https://d1nhio0ox7pgb.cloudfront.net/_img/i_collection_png/512x512/plain/hard_drive.png"
    },
    {id: 8,
    name: "graphics cards", 
    image: "https://cdn-icons-png.flaticon.com/512/3716/3716996.png"
    },
    {id: 9,
    name: "cpu processors",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8AAAA/Pz/29vYhISGzs7O5ubnCwsIdHR1UVFQ5OTlJSUkuLi4rKysaGhplZWXu7u57e3vKysoVFRX39/fj4+NCQkJQUFCmpqZzc3PR0dF6enro6OhfX1+CgoIMDAyVlZWdnZ00NDSQkJDa2toIefuwAAAEy0lEQVR4nO2d23qqMBBGLVZRrNKqPWq1tr7/M+5aCQ4lGTCHCZv+68ovYpgFCEkgw2AAAAAAAAAA6CyzgpwWpsm5MFnqSqeVCqbFoiktXCa60lytzLMDz01BRgvHqrQS4KgoXFUqWBWlI1qYqgrGtDRTpZ4deNRKE1rIG04qFUzaGyYwDAIMCTAkwFASGBJgSIChJDAkwJAAQ0lgSIAhAYaSwJAAQwIMJYEhAYYEGEryRw3LACt3ZpT3olLBQuey1G4iQcPd87QbPL8GMny+6QpZc7BWTGOLlSTNwcIQhpGBIQwbDW9jIWV4e78exmA9vJMyXAdaQSPK8Mm6hhl79JeGQ49BX0W5D9k4uUeLYPgXDR+DW1EiGI6qXdjQyBueereSiuKG5wEKQUVpQzU+IafobphnCcMvw1FZpZhiafjEhJnlzRUZqBo+kq22bPqpJ9zbNDzGfRhq2KSGWLu0+B8qRbkHsKUNC8XnQKvTIG74oyj5CL284bei2H/wRATDgdRZ9EwMQ1m6YPiWvuwe7Nm9pG9MBNENtxs1FcaF/auxSxbZcL3zoHdmY9iGcQ23fHP4OuZH1tC+1ZaOGVLWcOvR74RWsdyHfKCMIb8bOMP1hP2pBfecIftL7hi2H4nK3ZV+r83aMMhY25u7UQ3NwRbR8N1dqE2g8QyHl4U+jvcuHA+XqrYdMiyfpNGfAq/ica/qeumQ4Yc5qOspN9cugKHt1WKjFtGd4q9lOFfrszTkrhbLlGFpNlTffHq576aOpE+zIR+o9ZrNhupZIj/d4ZmxNuGxNs03mdd9aDaUb3nD8DpgCEN7YAjDtsAQhvZ0x9BhrG3EMO6OYTLmAg0x1iZuyMYZYqytW4Yh+vgwhCEMYdjecLqamFl0yJAJc7LS3fFoR3cMMRJlCwxh2BYYwtAeGMKwLTCEoT3dMbRvl/a/b9H//iEMYQhDGIY37P99i/7fe+LpjiHG2myBIQzbAkMY2gNDGLYFhn/B0L7V5jrfQmwfWs+36H/vqf89YBiaDKVnBckb5sZvbFDx18+Y8Qy/1CLuEyxJeqZ6Tut4hodyEQ+G5bTwjwCGtleLY7nMu+txur7Me69f1zyMtdnmVLi71P+eu0AnhddPzO45FXgYwwO7Ue34qkcQb6xtsL41xWnNXjOnOGZuk9QUqDW6aeFRs7ccPAvWp6rHNrxcE73woI0gco6hkSlaC8ghSq8ZsfNEDTemgK/klZxkMppZM7bhYLAd57P5woX5LB/RRFinVtZFMb7hiaFTbpNfVZ87LaViNwx9otrJSrF3hln5zywU+2ZYvhzpm/N/073VdlUe4fDUMhW75xHuWtZ5pajee9XDvPq/Mob30PBH8fLmsj4aVjP399Kw8vaFfhpSYAjDJrpjGHwkKlD9zXyqfRiofmV4k8ViL2UYHRjCEIbxgSEMTeS384K7ef1TI3eGz61/dvnk41ZzA2pjVppP/Hu59W8eb/Fe7idV6tmBR3u49P/d6jCkwJAAwzDAkABDAgwlgSEBhgQYSgJDAgwJMJQEhgQYEmAoCQwJMCTAUBIYEv5zw8o0T95wValAvfy5hWH5pLBnB55ZQeVh1TQ5FyZLXWn1ftG0WLSyMZaJrjRXK/PsAAAAAAAAAPDIP2iInw6933iFAAAAAElFTkSuQmCC"
    },
    {id: 10,
    name: "modems/routers",
    image: "data:image/png;base64,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"
    },
];

export default function Categories () {
    const dispatch = useDispatch();
    const { allCategories } = useSelector((state) => state.homepage);
    useEffect(()=>{
        dispatch(getCategories());
    }, [dispatch])
    
    // function handleCategoryFilter(e){
    //     e.preventDefault();
    //     dispatch(filterCategory(e.target.value));
    //     setCurrentPage(1);
    // };
    function sendMessage(e){
        e.preventDefault();
        alert("Empty category");
    };

    return (
        <>
        <div className={style.catTitle}>            
            <h3>CATEGORIES</h3>
        </div>
        <div className={style.categoriesContainer}>
            {allCategories.length > 0 ? (
                allCategories.map((cat) => {
                    return (
                        <li className={style.categories} key={cat.id}>
                            <button className={style.catButton} onClick={(e) => sendMessage(e)} >
                                    <div className={style.catName}>
                                        <h4>{cat.name}</h4>
                                    </div>
                                    {cat.image ? ( 
                                    <img className={style.catImage} src={cat.image} alt={cat.name} /> 
                                    ) : (
                                        <img className={style.catImage} src={"http://simpleicon.com/wp-content/uploads/computer-2.png"} alt={cat.name} /> 
                                    )   
                                }
                            </button>
                        </li>
                    )})
            ) : (
                <div>
                    <p>No products in that category...</p>
                </div>
            )}
        </div>
        </>
    )
};