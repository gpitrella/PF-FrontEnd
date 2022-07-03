import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { postProduct } from '../../redux/actions/storepageActions'
import { getCategories, getBrands } from '../../redux/actions/homepageActions'
import './CreateProduct.css'
import validate from './validate'

import s from './CreateProduct.module.css';

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
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))

    if(!input.name || !input.price || !input.image || !input.stock || !input.discount || !input.category || !input.manufacturer || !input.description){
        document.getElementById('form__msn').classList.add('form__msn-activo')
      } else if (errors.name || errors.price || errors.image || errors.stock || errors.discount || errors.category || errors.manufacturer || errors.description)
      {
        document.getElementById('form__msn').classList.add('form__msn-activo')
      }else if (!errors.name || !errors.price || !errors.image || !errors.stock || !errors.discount || !errors.category || !errors.manufacturer || !errors.description){
        document.getElementById('form__msn-exito').classList.add('form__msn-exito-activo')
        setTimeout(()=>{
          document.getElementById('form__msn-exito').classList.remove('form__msn-exito-activo')
        }, 4000)
        document.querySelectorAll('.form__group-correcto').forEach((icon)=>{
          icon.classList.remove('form__group-correcto')
        })
        document.getElementById('form__msn').classList.remove('form__msn-activo')
    
    dispatch(postProduct(input));
    console.log(input)
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
    history.push('/createproduct')
  }
  }

  return (
    <div className={`main ${s.container}`}>
        <Link to = {'/admin/products/list'}>
          <button className = {s.goBack}>{'< Go Back'}</button>
        </Link>
        <h1 className={`form__title ${s.title}`}>Create product</h1>
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

        <div className='form__group' id='category'>
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

        <div className='form__group' id='manufacturer'>
        <label htmlFor="manufacturer" className='form__label'>Manufacturer:</label>
        <div className='form__group-input'>
        <select
        className='form__input'
        id='manufacturer'
        name = {'manufacturer'}
        onChange={(e) => handleChange(e)}
        >
            <option value={''} key={'Brand'} >Brand</option>
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

        <div className='form__msn' id='form__msn'>
            <p>
            <b>Error:</b> please check the boxes with errors.
            </p> 
        </div>
        <div className="form__group form__group-btn-create">
            <button type='submit' className='form__btn' >CREATE</button>
            <p className='form__msn-exito' id='form__msn-exito'
            >Product created!!
            </p>
        </div>
        </form>
        </div>
  )
}
