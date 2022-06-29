import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createCategory } from '../../redux/actions';
import styles from './CreateCategory.module.css';


export default function CreateBrand(){
    const dispatch = useDispatch();
    const history = useHistory();

    function validate(data){
        var errors = {};
        if(!(/^[a-zA-Z]+$/.test(data.name)) || data.name.length < 3) errors.name = "Enter a name with more than 3 characters."
        else if((/^[a-zA-Z]+$/.test(data.name)) && data.name.length >= 3) errors.name = '';
        if(!(/^[a-zA-Z]+$/.test(data.name)) || data.name.length < 10) errors.name = "Enter a name with more than 3 characters."
        else if((/^[a-zA-Z]+$/.test(data.name)) && data.name.length >= 3) errors.name = '';

        return errors;
    };
    
    const [formError, setFormError] = useState({});
    const [buttonError, setButtonError] = useState(Object.keys(formError).length<1 ? false : true);
    const [brand, setBrand] = useState({
        name: "",
        icon: ""
    });

    function handleChange(e){
        setCategory({
            ...category,
            [e.target.name]:e.target.value,
        });
        setFormError(validate({
            ...category,
            [e.target.name]: e.target.value
        }));
        setButtonError(validate({
            ...category,
            [e.target.name]: e.target.value
        }));
        
    };

    function handleSubmit(e){
        e.preventDefault();
        if(!category.name || !(/^[a-zA-Z]+$/.test(category.name)) || category.name.length<3) {
            setFormError(validate({
                ...category,
                [e.target.name]: e.target.value
            }));
        } else {
            e.preventDefault();
            dispatch(createCategory(category))
            setCategory({
                name: "",
            });
            alert("Category successfully created");
        history.push('/');
        };
    };

    
    return (
        <>
        <div className={styles.container}>
            <h1>New Category</h1>
            <form className={styles.formContainer} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input key="name" onChange={(e) => handleChange(e)} type="text" value={category.name} name="name" placeholder="name" />
                    {formError.name && <span>{formError.name}</span>}
                </div>
                <div>
                    <button className={styles.subm} type="submit" disabled={buttonError}>SAVE CATEGORY</button>
                </div>
            </form>
        </div>
        </>
    )
}
