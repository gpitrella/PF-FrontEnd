import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateCategory } from '../../redux/actions';
import styles from './FormsCategory.module.css';


export default function EditCategory(categ){
    const dispatch = useDispatch();
    const history = useHistory();

    function validate(data){
        var errors = {};
        if(!(/^[a-zA-Z]+$/.test(data.name)) || data.name.length < 3) errors.name = "Enter a name with more than 3 characters."
        else if((/^[a-zA-Z]+$/.test(data.name)) && data.name.length >= 3) errors.name = '';
        return errors;
    };
    
    const [formError, setFormError] = useState({});
    const [buttonError, setButtonError] = useState(Object.keys(formError).length<1 ? false : true);
    const [data, setData] = useState({
        name: "",
    });

    function handleChange(e){
        setData({
            ...data,
            [e.target.name]:e.target.value,
        });
        setFormError(validate({
            ...data,
            [e.target.name]: e.target.value
        }));        
    };

    function handleSubmit(e){
        e.preventDefault();
        if(!data.name || !(/^[a-zA-Z]+$/.test(data.name)) || data.name.length<3) {
            setFormError(validate({
                ...data,
                [e.target.name]: e.target.value
            }));
        } else {
            e.preventDefault();
            dispatch(updateCategory(data))
            setData({
                name: "",
            });
            alert("Category successfully updated");
        history.push('/categories');
        };
    };

    
    return (
        <>
        <div className={styles.container}>
            <h1>Edit</h1>
            <form className={styles.formContainer} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input key="name" onChange={(e) => handleChange(e)} type="text" value={data.name} name="name" placeholder="name" />
                    {formError.name && <span>{formError.name}</span>}
                </div>
                <div>
                    <button className={styles.subm} type="submit" disabled={buttonError}>SAVE CHANGES</button>
                </div>
            </form>
        </div>
        </>
    )
}
