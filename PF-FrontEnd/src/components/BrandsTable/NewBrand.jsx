import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createBrand, getBrands } from '../../redux/actions';
import styles from './CreateBrands.module.css';


export default function NewBrand(){
    const dispatch = useDispatch();
    const history = useHistory();

    function validate(data){
        var errors = {};
        if(!(/^[a-zA-Z]+$/.test(data.name)) || data.name.length < 3) errors.name = "Enter a name with more than 3 characters."
        else if((/^[a-zA-Z]+$/.test(data.name)) && data.name.length >= 3) errors.name = '';
        if(typeof data.image !== 'string' || data.image.length < 20) errors.image = "Enter a proper image."
        else if(typeof data.image === 'string' && data.image.length >= 20) errors.image = '';
        return errors;
    };
    
    const [formError, setFormError] = useState({});
    const [buttonError, setButtonError] = useState(Object.keys(formError).length<1 ? false : true);
    console.log(buttonError)
    console.log(formError)
    const [brand, setBrand] = useState({
        name: "",
        image: ""
    });

    function handleChange(e){
        setBrand({
            ...brand,
            [e.target.name]:e.target.value,
        });
        setFormError(validate({
            ...brand,
            [e.target.name]: e.target.value
        }));        
    };

    function handleSubmit(e){
        e.preventDefault();
        if(!brand.name || !(/^[a-zA-Z]+$/.test(brand.name)) || brand.name.length<3) {
            setFormError(validate({
                ...brand,
                [e.target.name]: e.target.value
            }));
        if(!brand.image || typeof brand.image !== 'string' || brand.image.length<20) {
            setFormError(validate({
                ...brand,
                [e.target.name]: e.target.value
                }));
        } else {
            e.preventDefault();
            dispatch(createBrand(brand))
            setBrand({
                name: "",
                image: ""
            });
            alert("Brand successfully created");
            dispatch(getBrands());
            history("/admin/dashboard/brands");
        };
    };
}

    
    return (
        <>
        <div className={styles.container}>
            <h1>New Brand</h1>
            <form className={styles.formContainer} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input key="name" onChange={(e) => handleChange(e)} type="text" value={brand.name} name="name" placeholder="name" />
                    {formError.name && <span>{formError.name}</span>}
                </div>
                <div>
                    <label htmlFor="image">Image: </label>
                    <input key="image" onChange={(e) => handleChange(e)} type="text" value={brand.image} name="image" placeholder="image" />
                    {formError.image && <span>{formError.image}</span>}
                </div>

                <div>
                    <button className={styles.subm} type="submit" disabled={buttonError}>SAVE BRAND</button>
                </div>
            </form>
        </div>
        </>
    )
}