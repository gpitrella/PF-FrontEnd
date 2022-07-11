import React, { useState, useEffect } from 'react'
import BasicModal from '../../common/BasicModal/BasicModal'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'

// Importar imagen
import s from './styles.module.css';
import { CLOUDINARY } from '../../../redux/actions/actiontype';

const defaultInputValues = {
    name: '',
    image: '',
};

const EditBrandModal = ({ brand, open, onClose, saveEditedBrand }) => {
    
    const [values, setValues] = useState(defaultInputValues);

    // Importar imagen
    const [ image, setImage ] = useState('');
    const [ uploadedImage, setUploadedImage ] = useState('');
    const [ uploadingImage, setUploadingImage ] = useState(false);

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
        if (open) { 
            setValues({ id: brand.id, name: brand.name, image: brand.image });
            setImage('');
            setUploadingImage(false);
            setUploadedImage('');
        }
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
            <div className = {s.containerUpload}>
              <input type = 'file' name = 'file' onChange = { e => setImage(e.target.files) } className = {s.btnSelectImage} />
              <button onClick = {uploadImage} disabled = {image === ''} className = {s.btnUploadImage}>Upload Image</button>
              {
                uploadingImage && <label className = {s.lbl}>Uploading Image...</label>
              }
              {
                uploadedImage !== '' && <img src = {uploadedImage} alt = '' className = {s.imageUploaded}/>
              }
            </div>
        </Box>
    );

    // Importar Imagen
    let uploadImage = function() {
      setUploadingImage(true);
      let files = image;
      let formData = new FormData();
      formData.append('file', files[0]);
      formData.append('upload_preset', 'tech_market_henry');

      fetch(CLOUDINARY, { method: 'POST', body: formData })
      .then(response => response.json())
      .then(data => {
        setImage('');
        setUploadingImage(false);
        setUploadedImage(data.secure_url);
        setValues({
          ...values,
          image: data.secure_url
        })
      })
      .catch(error => console.log(error));
    }
    
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