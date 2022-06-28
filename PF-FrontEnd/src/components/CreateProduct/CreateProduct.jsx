import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import {faCircleXmark, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'
import { postProduct } from '../../redux/actions/storepageActions'
import { getCategories, getBrands } from '../../redux/actions/homepageActions'
import './CreateProduct.css'

import {validateName} from './validate'

import validate from './validate'

export default function CreateProduct() {

  const [input, setInput] = useState({
    name: '',
    price: '',
    image: '',
    discount: '',
    stock: '',
    description:'',
    category: '',
    manufacturer:''
  })
  const [errors, setErrors] = useState({})
  const {allCategories, brandsList} = useSelector((state) => state.homepage)


  const dispatch = useDispatch()
  const history = useHistory()

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
    dispatch(postProduct())
    dispatch(getCategories())
    dispatch(getBrands())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert('alertaaa!!!!!')
    // if(!input.name) alert('Fill this box with a product name')
    // else if(!input.price) alert('Add a product price.')
    // else if(!input.image) alert('Add an image to your product.')
    // else if(!input.discount) alert('Set a product discount.')
    // else if(!input.stock) alert('Add the product stock.')
    // else if(!input.category) alert('Add the product stock.')
    // else if(!input.manufacturer) alert('Add the product stock.')
    // else if(!input.description) alert('Add a prodcut description.')
    // else {
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))

    
    
    dispatch(postProduct(input));
    console.log(input)
    // alert('Product loaded!')
    setInput({
      name: '',
      price: '',
      image: '',
      discount: '',
      stock: '',
      description:'',
      category: '',
      manufacturer:''
    })
    // history.push('/')
  // }
  }



  return (
    <div className='main'>
        {/* <Link to={'/'}><button>BACK HOME</button></Link> */}
    <form className='form' id='form' onSubmit={(e) => handleSubmit(e)}>
        
        <div className='form__group' id='name'>
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
        
        <div className='form__group' id='image'>
          <label htmlFor="image" className='form__label'>Image</label>
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

        <div>
        <label htmlFor="category" className='form__label'>Category:</label>
        <div className='form__group-input'>
            <select
            className='form__input'
            id='category'
            name = {'category'}
            onChange={(e) => handleChange(e)}
            >
                <option value={''} >Category</option>
                {allCategories?.map((category) => (
                <option value={category.name} key={category.name}>{category.name}</option>
            ))}
            </select>
        </div> 
        <p className='form__input-error'>{errors.category}</p>
        </div>

        <div>
        <label htmlFor="manufacturer" className='form__label'>Manufacturer:</label>
        <div className='form__group-input'>
        <select
        className='form__input'
        id='manufacturer'
        name = {'manufacturer'}
        onChange={(e) => handleChange(e)}
        >
            <option value={''} key={'Manufacturer'}>Manufacturer</option>
            {brandsList?.map((brand) => (
            <option value={brand.name} key={brand.name}>{brand.name}</option>
          ))}
        </select>
        </div>
        <p className='form__input-error'>{errors.manufacturer}</p>
        </div>

        <div className='form__group' id='description'>
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

        {/* <div className='form__msn' id='form__msn'>
            <p>
            <b>Error:</b> please check the boxes with errors.
            </p> 
        </div> */}
        <div className="form__group form__group-btn-create">
            <button type='submit' className='form__btn'>CREATE</button>
            <p className='form__msn-exito' id='form__msn-exito'
            >Product created!!
            </p>
        </div>
        {/* {errors.name || errors.price || errors.stock || errors.discount || errors.manufacturer || errors.description || errors.image
      ? <button type="submit"  disabled={true}>LOAD</button>
      : <button type="submit" >LOAD</button>} */}
        
        {/* <button type="submit">ADD</button> */}
        </form>
        </div>
  )
}
