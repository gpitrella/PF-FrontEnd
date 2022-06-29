import React from 'react';
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
              { param.isComplex ? 
                ( param.addViewMore && viewMoreDetails ? product[param.name] : param.getValue(product)) 
                : product[param.name] }
              {
                param.addViewMore && !viewMoreDetails && <span className = {s.viewMore} onClick = {handleViewMore}>View more</span>
              }
              {
                param.addViewMore && viewMoreDetails && <span className = {s.viewMore} onClick = {handleViewMore}>View Less</span>
              }
            </div>

          </td>

        )
      }
    </tr>
  );
}