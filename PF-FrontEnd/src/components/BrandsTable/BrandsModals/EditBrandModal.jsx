import React, { useState, useEffect } from 'react'
import BasicModal from '../../common/BasicModal/BasicModal'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'

const defaultInputValues = {
    name: '',
    image: '',
};

const EditBrandModal = ({ brand, open, onClose, saveEditedBrand }) => {
    
    const [values, setValues] = useState(defaultInputValues);

    const modalStyles = {
        inputFields: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
            marginBottom: '15px',
            '.MuiFormControl-root': {
                marginBottom: '20px',
            },
        },
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Brand name is required')
            .min(3, 'Brand name must be at least 3 characters'),
        image: Yup.string()
            .required('Brand icon is required')
            .min(20, "Enter the image's URL"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const editBrand = () => {
        saveEditedBrand(values);
    };

    const handleChange = (value) => {
        setValues({
            ...values,
            name: value.name,
            image: value.image
        })
    };

    useEffect(() => {
        if (open) setValues({ id: brand.id, name: brand.name, image: brand.image });
    }, [open])

    const getContent = () => (
        <Box sx={modalStyles.inputFields}>
            <TextField
                placeholder="Brand name"
                name="brandname"
                label="Name"
                required
                {...register('name')}
                error={errors.name ? true : false}
                helperText={errors.name?.message}
                value={values.name}
                onChange={(event) => handleChange({ ...values, name: event.target.value })}
            />
            <TextField
                placeholder="Brand icon"
                name="brandicon"
                label="Image"
                required
                {...register('image')}
                error={errors.image ? true : false}
                helperText={errors.image?.message}
                value={values.image}
                onChange={(event) => handleChange({ ...values, image: event.target.value })}
            />
        </Box>
    );
    
    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title="Edit brand"
            subTitle="Write new name and image and hit 'submit' button."
            content={getContent()}
            onSubmit={handleSubmit(editBrand)}
        />
            
    )
}

export default EditBrandModal;