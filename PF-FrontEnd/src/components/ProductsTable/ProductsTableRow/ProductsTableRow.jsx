import React from 'react';
import ProductsTableCell from '../ProductsTableCell/ProductsTableCell';
import { rowData } from '../config';

import s from './ProductsTableRow.module.css';

export default function ProductsTableRow({ product }) {

  const [ viewMoreDetails, setViewMoreDetails ] = React.useState(false);
  const [ enableEdit, setEnableEdit ] = React.useState(false);
  const [ newProductDetails, setNewProductDetails ] = React.useState({});

  React.useEffect(() => {
    return () => {
      setViewMoreDetails(false);
      setNewProductDetails({});
      setEnableEdit(false);
    }
  }, []);

  React.useEffect(() => {
    if (enableEdit && newProductDetails.id !== product.id) {
      setNewProductDetails({});
      setEnableEdit(false);
    }
  }, [product]);

  let handleEnableEdit = function(product) {
    setNewProductDetails({
      ...product
    });
    setEnableEdit(true);
  }

  let handleViewMore = function() {
    setViewMoreDetails(!viewMoreDetails);
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
            <div className = {`${s.rowParam} ${ !viewMoreDetails ? s.rowAdjust : ''}`} key = {`div-row-${param.id}-${index}`}>
              <ProductsTableCell 
                product = {product}
                param = {param}
                viewMore = {viewMoreDetails}
                handleViewMore = {handleViewMore}
                handleEnableEdit = {handleEnableEdit}
                enableEdit = {enableEdit}
                newProductsDetails = {newProductDetails}
              />
            </div>

          </td>

        )
      }
    </tr>
  );
}