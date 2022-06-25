import React, { useState, useEffect, createRef } from 'react';
import Input from '@mui/material/Input';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createCategory } from '../../redux/actions';
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import style from './CreateCategory.module.css'; 


export default function CreateActivity(){
    const dispatch = useDispatch();
    const history = useHistory();
    const { products } = useSelector((state) => state.storepage);

    function validate(data){
        var errors = {};
        if(!(/^[a-zA-Z]+$/.test(data.name)) || data.name.length < 3) errors.name = "Enter a name with more than 3 characters."
        else if((/^[a-zA-Z]+$/.test(data.name)) && data.name.length >= 3) errors.name = '';
        if(!data.image || typeof data.image !== "string") errors.image = "Add a proper icon for the category."
        if(data.season) errors.image = ""
        if(!data.products) errors.products = "Select at least one product."
        if(data.products) errors.products = ""
        return errors;
    };
    
    useEffect(() => {
    }, [])

    const [formError, setFormError] = useState({});
    const [buttonError, setButtonError] = useState(Object.keys(formError).length<1 ? false : true);
    const [category, setCategory] = useState({
        name: "",
        image: null,
        products: []
    });

    function handleChange(e){
        setCategory({
            ...category,
            [e.target.name]:e.target.value,
        });
        setFormError(validate({
            ...category,
            [e.target.name]: e.target.value
        }))
    };

    function handleProducts(e){
        setCategory({
            ...category,
            products: category.products.includes(e.target.value) ? [...category.products] : [...category.products, e.target.value]        
        })
        setFormError(validate({
            ...category,
            products: [category.products, e.target.value]
        }))        
    };

    function handleDelete(p){
        setCategory({
            ...category,
            products: category.products.filter( product => product !== p)
        })
    };  

    function handleSubmit(e){
        e.preventDefault();
        if(!category.name || !(/^[a-zA-Z]+$/.test(category.name)) || category.name.length<3) {
            setFormError(validate({
                ...category,
                [e.target.name]: e.target.value
            }));
        }else if(!category.image.length || typeof category.image !== "string"){
            setFormError(validate({
                ...category,
                [e.target.name]: e.target.value
            }))
        }else if(!category.products.length){
            e.preventDefault();
            setFormError(validate({
                ...category,
                [e.target.name]: e.target.value
            }))
        } else {
            e.preventDefault();
            dispatch(createCategory(category))
            setCategory({
                name: "",
                image: null,
                products: []
            });
            alert("Category successfully created");
        history.push('/');
        };
    };

    
    return (
        <>
            <Link to="/"><button className={style.butt} >Home</button></Link>
        <div className={style.categContainer}>
            <h1>New Category</h1>
            <form className={style.formContainer} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input key="name" onChange={(e) => handleChange(e)} type="text" value={category.name} name="name" placeholder="name" />
                    {formError.name && <span>{formError.name}</span>}
                </div>
                <div>
                    <label htmlFor="image">Icon: </label>
                    <input key="iconImg" onChange={(e) => handleChange(e)} type="file" value={category.image} name="icon" placeholder="icon" />
                    {formError.image && <span><strong>{formError.image}</strong></span>}
                </div>
                <div>
                    <label htmlFor="text">Products: </label>
                    <select onChange={(e) => handleProducts(e)} name="products">
                        {products.map((product, index) => {
                            return <option key={index} value={product.name}>{product.name}</option>
                        })}
                        {formError.products && <span>{formError.products}</span>}
                    </select>
                </div>
                <div>
                    <button className={style.subm} type="submit" disabled={buttonError}>SAVE CATEGORY</button>
                </div>
            </form>
            {category.products.map(p => {
                return <div className="divCount">
                    <p>{p}</p>
                    <button className={style.xButton} onClick={() => handleDelete(p)}><DeleteRounded /></button>
                    </div>
                }
            )}
        </div>
        </>
    )
}