import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteCategory } from '../../redux/actions';
import styles from './FormsCategory.module.css';


export default function DeleteCategory(){
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteCategory(e.target.value));
        history("./categories");            
    };
        
    return (
        <div className={styles.container}>
            <h1>Delete</h1>
            <p>Are you sure you want to delete this category?</p>
            <div>
                <button className={styles.subm} type="button" onClick={(e) => handleDelete(e.target.value)}>Delete</button>
            </div>
        </div>
    )
}
