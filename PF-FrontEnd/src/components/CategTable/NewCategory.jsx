import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createCategory } from '../../redux/actions';
import styles from './FormsCategory.module.css';


export default function CreateCategory(){
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
    const [category, setCategory] = useState({
        name: "",
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
        history.push('/categories');
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

// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useHistory } from 'react-router-dom';
// import { useData } from './DataContext';
// import { createCategory, getProductsToForms } from '../../redux/actions';
// import style from './CreateCategory.module.css'; 
// import Typography from '@material-ui/core/Typography';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { PrimaryButton } from './formComponents/PrimaryButton';
// import { MainContainer } from './formComponents/MainContainer';
// import { Form } from './formComponents/Form';
// import { Input } from './formComponents/Input';
// import { FileInput } from './formComponents/FileInput';
// import * as yup from 'yup';


// const schema = yup.object().shape({
//     name: yup
//     .string()
//     .matches(/^([^0-9]*)$/, "Category name should not contain numbers.")
//     .required("Category name is a required field."),
//     icon: yup
//     .string()
//     .matches()
//     .required("Icon is a required field."),
//     product: yup
//     .array()
//     .required("You must select at least one product.")
// });

// export default function CreateCategory(){
//     const dispatch = useDispatch();
//     const [ setValues, data ] = useData();
//     const history = useHistory();
//     const { allProducts } = useSelector((state) => state.homepage);
//     const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
//         defaultValues: {name: data.name, icon: data.icon, products: data.products},
//         mode: "onBlur",
//         resolver: yupResolver(schema),
//     });

//     const onSubmit = (data) => {
//         history.push("./");
//         setValues(data);
//     };

//     useEffect(()=>{
//         dispatch(getProductsToForms())
//     }, [dispatch])
//     // function validate(data){
//     //     var errors = {};
//     //     if(!(/^[a-zA-Z]+$/.test(data.name)) || data.name.length < 3) errors.name = "Enter a name with more than 3 characters."
//     //     else if((/^[a-zA-Z]+$/.test(data.name)) && data.name.length >= 3) errors.name = '';
//     //     if(!data.image || typeof data.image !== "string") errors.image = "Add a proper icon for the category."
//     //     if(data.season) errors.image = ""
//     //     if(!data.products) errors.products = "Select at least one product."
//     //     if(data.products) errors.products = ""
//     //     return errors;
//     // };
    
//     // useEffect(() => {
//     // }, [])

//     // const [formError, setFormError] = useState({});
//     // const [buttonError, setButtonError] = useState(Object.keys(formError).length<1 ? false : true);
//     // const [category, setCategory] = useState({
//     //     name: "",
//     //     image: null,
//     //     products: []
//     // });

//     // function handleChange(e){
//     //     setCategory({
//     //         ...category,
//     //         [e.target.name]:e.target.value,
//     //     });
//     //     setFormError(validate({
//     //         ...category,
//     //         [e.target.name]: e.target.value
//     //     }))
//     // };

//     // function handleProducts(e){
//     //     setCategory({
//     //         ...category,
//     //         products: category.products.includes(e.target.value) ? [...category.products] : [...category.products, e.target.value]        
//     //     })
//     //     setFormError(validate({
//     //         ...category,
//     //         products: [category.products, e.target.value]
//     //     }))        
//     // };

//     // function handleDelete(p){
//     //     setCategory({
//     //         ...category,
//     //         products: category.products.filter( product => product !== p)
//     //     })
//     // };  

//     // function handleSubmit(e){
//     //     e.preventDefault();
//     //     if(!category.name || !(/^[a-zA-Z]+$/.test(category.name)) || category.name.length<3) {
//     //         setFormError(validate({
//     //             ...category,
//     //             [e.target.name]: e.target.value
//     //         }));
//     //     }else if(!category.image.length || typeof category.image !== "string"){
//     //         setFormError(validate({
//     //             ...category,
//     //             [e.target.name]: e.target.value
//     //         }))
//     //     }else if(!category.products.length){
//     //         e.preventDefault();
//     //         setFormError(validate({
//     //             ...category,
//     //             [e.target.name]: e.target.value
//     //         }))
//     //     } else {
//     //         e.preventDefault();
//     //         dispatch(createCategory(category))
//     //         setCategory({
//     //             name: "",
//     //             image: null,
//     //             products: []
//     //         });
//     //         alert("Category successfully created");
//     //     history.push('/');
//     //     };
//     // };
// console.log(allProducts)
    
//     return (
//         <MainContainer>
//             <Typography component="h2" variant="h5">
//                 New
//             </Typography>
//             <Form onSubmit={handleSubmit(onSubmit)}>
//                 <Input
//                 {...register('parentName')}
//                 id="name"
//                 type="text"
//                 label="Category Name"
//                 name="categoryname"
//                 error={!!errors.name}
//                 helperText={errors?.name?.message}
//                 />
//                 <FileInput name="files" control={control} />
            

//                 <PrimaryButton>Submit</PrimaryButton>
//             </Form>
//         </MainContainer>
//     );
// };