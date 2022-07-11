import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Loading from '../SVG/Loading';
import { putProduct, waitingResponsePut } from '../../redux/actions/storepageActions'
import { getCategories, getBrands, getProductDetails } from '../../redux/actions/homepageActions'
import './EditProduct.css'
import validate from '../CreateProduct/validate';

// Importar Imagen
import ModalAddImage from '../ModalAddImage/ModalAddImage';
import { showModalAddImage } from '../../redux/actions';

import s from './EditProduct.module.css';

export default function EditProduct() {

  const [ loading, setLoading ] = useState(true);
  const [ input, setInput] = useState({});
  const [ errors, setErrors ] = useState({})
  const { allCategories, brandsList, productDetails } = useSelector((state) => state.homepage);
  const { id } = useParams();

  // Importar imagen
  const { modalAddImage } = useSelector(state => state.general);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
    dispatch(getProductDetails(id));
  }, []);

  useEffect(() => {
    if (productDetails.hasOwnProperty('id') && productDetails.id === Number(id)) setInput({
      name: productDetails.name,
      price: productDetails.price.toString(),
      image: productDetails.image,
      discount: productDetails.discount.toString(),
      stock: productDetails.stock.toString(),
      description: productDetails.description,
      category: productDetails.categories[0],
      manufacturer: productDetails.manufacturers[0].name,
      isVisible: productDetails.isVisible === true ? 'true' : 'false'
    })
  }, [productDetails]);

  useEffect(() => {
    if (allCategories.length > 0 && brandsList.length > 0 && productDetails.hasOwnProperty('id') && productDetails.id === Number(id))
      setLoading(false);
  }, [allCategories, brandsList, productDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))

    if(!input.name || !input.price || !input.image || !input.stock || !input.discount || !input.category || !input.manufacturer || !input.description) {
      document.getElementById('form__msn').classList.add('form__msn-activo')
    } 
    else if (errors.name || errors.price || errors.image || errors.stock || errors.discount || errors.category || errors.manufacturer || errors.description) {
      document.getElementById('form__msn').classList.add('form__msn-activo')
    }
    else if (!errors.name || !errors.price || !errors.image || !errors.stock || !errors.discount || !errors.category || !errors.manufacturer || !errors.description) {
      document.getElementById('form__msn-exito').classList.add('form__msn-exito-activo')
      // setTimeout(()=>{
      //   document.getElementById('form__msn-exito').classList.remove('form__msn-exito-activo')
      // }, 4000)
      document.querySelectorAll('.form__group-correcto').forEach((icon)=>{
        icon.classList.remove('form__group-correcto')
      })
      document.getElementById('form__msn').classList.remove('form__msn-activo')
    
      dispatch(putProduct(productDetails.id ,{
        ...input,
        isVisible: input.isVisible === 'true' ? true : false
      }));
      //console.log(input)
      setInput({
        name: '',
        price: '',
        image: '',
        discount: '',
        stock: '',
        description:'',
        category: '',
        manufacturer:'',
        isVisible: ''
      })
      dispatch(waitingResponsePut(true));
      history.replace('/admin/products/list');
    }
  }

  const resetChanges = function() {
    setInput({
      name: productDetails.name,
      price: productDetails.price.toString(),
      image: productDetails.image,
      discount: productDetails.discount.toString(),
      stock: productDetails.stock.toString(),
      description: productDetails.description,
      category: productDetails.categories[0],
      manufacturer: productDetails.manufacturers[0].name,
      isVisible: productDetails.isVisible === true ? 'true' : 'false'
    });
    setErrors({});
  }

  // Importar Imagen
  let handleOpenModalAddImage = function(e) {
    e.preventDefault();
    dispatch(showModalAddImage());
  }

  let handleImage = function(newImage) {
    setInput({
      ...input,
      image: newImage
    });
    setErrors(validate({
      ...input,
      image: newImage
    }));
  }

  if (loading) return (
    <div className = {s.containerLoading}>
      <div className = {s.imageContainer}>
        <div className = {s.loadingContainer}>
          <Loading />
        </div>
      </div>
      <span className = {s.spanLoading}>Loading Product Details</span>
    </div>
  );

  return (
    <div className={`main ${s.container}`}>
        <div className = {s.header}>
          <Link to = {'/admin/products/list'}>
            <button className = {s.goBack}>{'< Go Back'}</button>
          </Link>
          <button className = {s.reset} onClick = {resetChanges}>{'Reset Changes'}</button>
        </div>
        <h1 className={`form__title ${s.title}`}>Edit product</h1>
    <form className='form' id='form' onSubmit={(e) => handleSubmit(e)}>
        <div className={`form__group ${s.formGroudName}`} id='name'>
          <label htmlFor="name" className='form__label'>Name</label>
          <div className='form__group-input'>
                <input
                type={'text'}
                className='form__input'
                id='name'
                name = {'name'}
                placeholder='Product name'
                value = {input.name}
                onChange={(e) => handleChange(e)}
                />
          </div> 
          <p className='form__input-error'>{errors.name}</p>
        </div>

        <div className={`form__group ${s.formGroudName}`} id='description'>
          <label htmlFor="description" className='form__label'>Description</label>
          <div className='form__group-input'>
                <textarea
                type={'text'}
                className='form__input'
                id='description'
                name = {'description'}
                placeholder='Product description'
                value = {input.description}
                onChange={(e) => handleChange(e)}
                />
          </div> 
          <p className='form__input-error'>{errors.description}</p>
        </div>
        
        <div className='form__group' id='price'>
          <label htmlFor="price" className='form__label'>Price</label>
          <div className='form__group-input'>
                <input
                type={'number'}
                className='form__input'
                id='price'
                name = {'price'}
                placeholder='Product price'
                value = {input.price}
                onChange={(e) => handleChange(e)}
                />
          </div> 
          <p className='form__input-error'>{errors.price}</p>
        </div>

        <div className='form__group' id='discount'>
          <label htmlFor="discount" className='form__label'>Discount</label>
          <div className='form__group-input'>
                <input
                type={'number'}
                className='form__input'
                id='discount'
                name = {'discount'}
                placeholder='Product discount'
                value = {input.discount}
                onChange={(e) => handleChange(e)}
                />
          </div> 
          <p className='form__input-error'>{errors.discount}</p>
        </div>

        <div className='form__group' id='category'>
        <label htmlFor="category" className='form__label'>Category:</label>
        <div className='form__group-input'>
            <select
            className='form__input'
            id='category'
            name = {'category'}
            onChange={(e) => handleChange(e)}
            value = {input.category}
            >
                <option value={''} >Category</option>
                {allCategories?.map((category) => (
                <option value={category.name} key={category.name}>{category.name}</option>
            ))}
            </select>
        </div> 
        <p className='form__input-error'>{errors.category}</p>
        </div>

        <div className='form__group' id='manufacturer'>
        <label htmlFor="manufacturer" className='form__label'>Manufacturer:</label>
        <div className='form__group-input'>
        <select
        className='form__input'
        id='manufacturer'
        name = {'manufacturer'}
        onChange={(e) => handleChange(e)}
        value = {input.manufacturer}
        >
            <option value={''} key={'Brand'} >Brand</option>
            {brandsList?.map((brand) => (
            <option value={brand.name} key={brand.name}>{brand.name}</option>
          ))}
        </select>
        </div>
        <p className='form__input-error'>{errors.manufacturer}</p>
        </div>

        <div className='form__group' id='stock'>
          <label htmlFor="stock" className='form__label'>Stock</label>
          <div className='form__group-input'>
                <input
                type={'number'}
                className='form__input'
                id='stock'
                name = {'stock'}
                placeholder='Product stock'
                value = {input.stock}
                onChange={(e) => handleChange(e)}
                />
          </div> 
          <p className='form__input-error'>{errors.stock}</p>
        </div>

        <div className='form__group' id='image'>
          <div className = {s.doubleLabel}>
            <label htmlFor="image" className='form__label'>Image</label>
            <button className = {s.importImage} onClick = {handleOpenModalAddImage}>Import</button>
          </div>
          <div className='form__group-input'>
                <input
                type={'text'}
                className='form__input'
                id='image'
                name = {'image'}
                placeholder='Product image'
                value = {input.image}
                onChange={(e) => handleChange(e)}
                />
          </div> 
          <p className='form__input-error'>{errors.image}</p>
        </div>

        <div className = {`form__group ${s.inputStatus}`} id='description'>
          <label htmlFor="description" className='form__label'>Status</label>
          <div className='form__group-input'>
            <select
              className='form__input'
              id='isVisible'
              name = {'isVisible'}
              onChange={(e) => handleChange(e)}
              value = {input.isVisible}
            >
              <option value={'false'}>INACTIVE</option>
              <option value={'true'}>ACTIVE</option>
            </select>
          </div> 
          <p className='form__input-error'>{errors.description}</p>
        </div>

        <div className='form__msn' id='form__msn'>
            <p>
            <b>Error:</b> please check the boxes with errors.
            </p> 
        </div>
        <div className="form__group form__group-btn-create">
            <button type='submit' className='form__btn' >EDIT</button>
            <p className='form__msn-exito' id='form__msn-exito'
            >Product Edited!!
            </p>
        </div>
        </form>
        {
          modalAddImage && modalAddImage.show && <ModalAddImage handleImage = {handleImage}/>
        }
        </div>
  )
}
