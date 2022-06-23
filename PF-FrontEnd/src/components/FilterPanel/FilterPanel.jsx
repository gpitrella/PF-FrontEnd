import React from 'react';

import s from './FilterPanel.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilter, resetFilter, getProductsWithFiltersAndPaginate, setShowLoading } from '../../redux/actions';

import { buildFilter } from '../../util';

export default function FilterPanel() {

  const dispatch = useDispatch();
  const { filter, categories, brands } = useSelector(state => state.storepage);
  const [ priceRange, setPriceRange ] = React.useState({
    min: '',
    max: ''
  })

  let handleCheck = function(property) {
    handleUpdateFilter(property, !filter[property]);
  }

  let formatString= function(category) {
    return category.replace(/-/g, ' ');
  }

  let handleChange = function(e) {
    let { value, name } = e.target;
    handleUpdateFilter(name, value);
  }

  let handleChangeBrand = function(e) {
    let { value } = e.target;
    let newBrands = [ ...filter.brand ];
    let indexOfBrand = filter.brand.indexOf(value);

    if (indexOfBrand === -1) newBrands.push(value);
    else newBrands.splice(indexOfBrand, 1);

    handleUpdateFilter('brand', newBrands);
  }

  let handleRemoveFilterBrand = function(filterBrand) {
    let newBrands = [ ...filter.brand ];
    let indexOfBrand = filter.brand.indexOf(filterBrand);
    
    newBrands.splice(indexOfBrand, 1);

    handleUpdateFilter('brand', newBrands);
  }

  let handleInput = function(e) {
    let { value, name } = e.target;

    if (value === '' || /^[0-9]+$/.test(value)) setPriceRange({
      ...priceRange,
      [name]: value !== ''? Number(value) : ''
    });

    e.preventDefault();
  }

  let handleResetPriceRange = function(e) {
    let { name } = e.target;

    setPriceRange({
      ...priceRange,
      [name]: ''
    });
  }

  let handleUpdatePriceRange = function() {
    let newFilter = {
      ...filter,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      page: 1
    }

    dispatch(updateFilter(newFilter));
    dispatch(setShowLoading());
    dispatch(getProductsWithFiltersAndPaginate(buildFilter(newFilter)));
  }

  let handleResetFilterPriceRange = function() {
    let newFilter = {
      ...filter,
      minPrice: '',
      maxPrice: '',
      page: 1
    }

    dispatch(setShowLoading());
    dispatch(getProductsWithFiltersAndPaginate(buildFilter(newFilter)));
    dispatch(updateFilter(newFilter));
    setPriceRange({
      min: '',
      max: ''
    })
  }

  let handleUpdateFilter = function(property, value) {
    let newFilter = { 
      ...filter,
      [property]: value,
      page: 1
    }
    dispatch(updateFilter(newFilter));
    dispatch(setShowLoading());
    dispatch(getProductsWithFiltersAndPaginate(buildFilter(newFilter)));
  }

  let handleResetFilters = function() {
    let newFilter = {
      size: 10,
      favorites: false,
      discount: false,
      category: 'None',
      brand: [],
      minPrice: '',
      maxPrice: '',
      pages: 1,
      name: '',
      page: 1,
      order: filter.order,
      orderBy: filter.orderBy
    }
    dispatch(resetFilter());
    dispatch(setShowLoading());
    dispatch(getProductsWithFiltersAndPaginate(buildFilter(newFilter)));
  }

  return (
    <div className = {s.container}>

      <h1 className = {s.title}>Set Filters</h1>

      <div className = {s.check}>
        <input type = 'checkbox' checked = {filter.favorites} className = {s.largeCheck} onChange = {() => handleCheck('favorites')} />
        <label className = {s.lbl}>Show Only Favorites</label>
      </div>

      <div className = {s.check}>
        <input type = 'checkbox' checked = {filter.discount} className = {s.largeCheck} onChange = {() => handleCheck('discount')} />
        <label className = {s.lbl}>Show Only On Discount</label>
      </div>

      <div className = {s.separator}></div>

      <div className = {s.select}>
        <label className = {s.lbl}>Filter by Category</label>
        <select className = {s.selectFilter} value = {filter.category} onChange = {handleChange} name = {'category'}>
          {
            categories && categories.map((category, index) => 
              <option 
                value = {category}
                key = {`option-${category}-${index}`}
              >
                {formatString(category)}
              </option>
            )
          }
        </select>
      </div>

      <div className = {s.separator}></div>

      <div className = {s.select}>
        <label className = {s.lbl}>Filter by Brand</label>
        <select className = {s.selectFilter} value = {'Pick a Brand'} onChange = {handleChangeBrand} name = {'brand'}>
          <option hidden defaultValue>Pick a Brand</option>
          {
            brands && brands.map((brand, index) => 
              <option 
                value = {brand}
                key = {`option-${brand}-${index}`}
              >
                {formatString(brand)}
              </option>
            )
          }
        </select>
      </div>

      <div className = {s.containerFilterBrands}>
      {
        filter && filter.brand && filter.brand.length > 0 && filter.brand.map((filterBrand, index) => 

          <button 
            className = {s.filterBrand}
            onClick = {() => handleRemoveFilterBrand(filterBrand)}
            key = {`filter-brand-${filterBrand}-${index}`}
          >
            {formatString(filterBrand)}
          </button>
        )
      }
      </div>

      <div className = {s.separator}></div>

      <div className = {s.containerFilterByPrice}>
        <label className = {s.lbl}>Filter by Price Range:</label>
        <div className = {s.containerInput}>
          <label className = {s.lblSub}>Min $</label>
          <input type = 'text' className = {s.input} value = {priceRange.min} name = 'min' onInput = {handleInput}></input>
          <button className = {s.btnRemove} name = 'min' onClick = {handleResetPriceRange} disabled = {priceRange.min === ''}>X</button>
        </div>
        <div className = {s.containerInput}>
          <label className = {s.lblSub}>Max $</label>
          <input type = 'text' className = {s.input} value = {priceRange.max} name = 'max' onInput = {handleInput}></input>
          <button className = {s.btnRemove} name = 'max' onClick = {handleResetPriceRange} disabled = {priceRange.max === ''}>X</button>
        </div>
        <div className = {s.containerSearchRange}>
          {
            filter && filter.minPrice === '' && filter.maxPrice === '' &&
            <span className = {s.lblSub}>- No price range selected</span>
          }
          {
            filter && filter.minPrice !== '' && filter.maxPrice !== '' &&
            <span className = {s.lblSub}>- Price between ${filter.minPrice} and ${filter.maxPrice}</span>
          }
          {
            filter && filter.minPrice !== '' && filter.maxPrice === '' &&
            <span className = {s.lblSub}>- Price higher than ${filter.minPrice}</span>
          }
          {
            filter && filter.maxPrice !== '' && filter.minPrice === '' &&
            <span className = {s.lblSub}>- Price lower than ${filter.maxPrice}</span>
          }
          <div className = {s.optionsPriceRange}>
            <button 
              className = {s.btnPrice} 
              disabled = {!filter || (filter.minPrice === '' && filter.maxPrice === '')}
              onClick = {handleResetFilterPriceRange}
            >
              Reset   
            </button>
            <button 
              className = {s.btnPrice} 
              disabled = {(priceRange.min === '' && priceRange.max === '' ) || 
                           (priceRange.min !== '' && priceRange.max !== '' && priceRange.min >= priceRange.max)
                         }
              onClick = {handleUpdatePriceRange}
            >
              Update     
            </button>
          </div>
        </div>
      </div>

      <div className = {s.separator}></div>

      <button className = {s.btn} onClick = {handleResetFilters}>Reset Filters</button>

    </div>
  );
}