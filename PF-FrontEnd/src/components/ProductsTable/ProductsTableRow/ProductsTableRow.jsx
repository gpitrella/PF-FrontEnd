import React from 'react';
import { useDispatch } from 'react-redux';
import ProductsTableCell from '../ProductsTableCell/ProductsTableCell';
import ProductsTableEdit from '../ProductsTableEdit/ProductsTableEdit';
import { putProduct } from '../../../redux/actions';
import { rowData } from '../config';

import s from './ProductsTableRow.module.css';

export default function ProductsTableRow({ product }) {

  const dispatch = useDispatch();
  const [ viewMoreDetails, setViewMoreDetails ] = React.useState(false);
  const [ enableEdit, setEnableEdit ] = React.useState(false);
  const [ newProductDetails, setNewProductDetails ] = React.useState({});
  const [ invalid, setInvalid ] = React.useState({});

  React.useEffect(() => {
    return () => closeEdit();
  }, []);

  React.useEffect(() => {
    if (enableEdit && newProductDetails.id !== product.id) closeEdit();
  }, [product]);

  let closeEdit = function() {
    setNewProductDetails({});
    setEnableEdit(false);
    setInvalid({});
  }

  let resetEdit = function() {
    setNewProductDetails({
      ...product,
      brand: product.manufacturers[0].name,
      category: product.categories[0],
    });
    setInvalid({});
  }

  let handleEnableEdit = function(product) {
    setNewProductDetails({
      ...product,
      brand: product.manufacturers[0].name,
      category: product.categories[0],
    });
    setEnableEdit(true);
  }

  let handleViewMore = function() {
    setViewMoreDetails(!viewMoreDetails);
  }

  let handleChange = function(e) {
    let { value, name } = e.target;

    setNewProductDetails({
      ...newProductDetails,
      [name]: value
    });
  }

  let handleOptions = function(option) {
    switch (option) {
      case 'CANCEL':
        closeEdit();
        return;
      case 'RELOAD':
        resetEdit();
        return;
      default:
        dispatch(putProduct(product.id, {
          name: newProductDetails.name,
          price: Number(newProductDetails.price),
          discount: Number(newProductDetails.discount),
          stock: Number(newProductDetails.stock),
          description: newProductDetails.description,
          image: newProductDetails.image
        }));
        return;
    }
  }

  if (product.isDummy) return (
    <tr className = {s.row}>
      <td>
        <div className = {s.rowParam}></div>
      </td>
    </tr>
  );

  return (
    <tr className = {s.row}>
      {
        rowData && rowData.map((param, index) =>

          <td
            key = {`row-${param.id}-${index}`}
          >
          {
            (!enableEdit || !param.editable) &&
            <div className = {`${s.rowParam} ${ !viewMoreDetails ? s.rowAdjust : ''}`} key = {`div-row-${param.id}-${index}`}>
              <ProductsTableCell 
                product = {product}
                param = {param}
                viewMore = {viewMoreDetails}
                handleViewMore = {handleViewMore}
                handleEnableEdit = {handleEnableEdit}
              />
            </div>
          }
          {
            enableEdit && param.editable && 
            <div className = {`${s.rowParam} ${s.rowAdjust}`} key = {`div-row-edit-${param.id}-${index}`}>
              <ProductsTableEdit 
                newProductDetails = {newProductDetails}
                param = {param}
                handleChange = {handleChange}
                invalid = {invalid}
                handleInvalid = { (newInvalid) => { setInvalid({ ...newInvalid }) } }
                handleOptions = {handleOptions}
              />
            </div>
          }

          </td>

        )
      }
    </tr>
  );
}