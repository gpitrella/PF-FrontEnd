import React from 'react';
import ProductsTableCell from '../ProductsTableCell/ProductsTableCell';
import { rowData } from '../config';

import s from './ProductsTableRow.module.css';

export default function ProductsTableRow({ product }) {

  const [ viewMoreDetails, setViewMoreDetails ] = React.useState(false);

  let handleViewMore = function() {
    setViewMoreDetails(!viewMoreDetails);
  }

  return (
    <tr className = {s.row}>
      {
        rowData && rowData.map((param, index) =>

          <td
            key = {`row-${param.id}-${index}`}
          >
            <div className = {`${s.rowParam} ${ !viewMoreDetails ? s.rowAdjust : ''}`} key = {`div-row-${param.id}-${index}`}>
              <ProductsTableCell product = {product} param = {param} viewMore = {viewMoreDetails} handleViewMore = {handleViewMore}/>
            </div>

          </td>

        )
      }
    </tr>
  );
}