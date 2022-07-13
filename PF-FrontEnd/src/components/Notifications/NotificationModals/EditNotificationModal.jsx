import React, { useState, useEffect } from 'react'
import BasicModal from '../../common/BasicModal/BasicModal'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'

const defaultInputValues = {
    answer: '',
};

const EditNotificationModal = ({id, notification, open, onClose, savedEditedCategory }) => {

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
            .required('Category name is required')
            .min(3, 'Category name must be at least 3 characters'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const editCategory = () => {
        savedEditedCategory(values);
    };

    const handleChange = (value) => {
        setValues({
            ...values,
            answer: value.name
        })
    };

    useEffect(() => {
        if (open) setValues({ id: notification?.id, answer: notification.name });
    }, [open])

    const getContent = () => (
        <Box sx={modalStyles.inputFields}>
            <TextField
                placeholder="Write an Answer"
                name="notification name"
                label="Answer"
                required
                {...register('name')}
                error={errors.name ? true : false}
                helperText={errors.name?.message}
                value={values.name}
                onChange={(event) => handleChange({ ...values, name: event.target.value })}
            />
        </Box>
    );
    
    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title="Answer Question"
            subTitle="Write an answer and hit 'submit' button."
            content={getContent()}
            onSubmit={handleSubmit(editCategory)}
        />
            
    )
}

export default EditNotificationModal