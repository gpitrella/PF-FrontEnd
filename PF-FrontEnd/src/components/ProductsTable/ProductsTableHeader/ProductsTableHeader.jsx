import React from "react";

import { headerData } from '../config';

import s from './ProductsTableHeader.module.css';

export default function ProductsTableHeader() {
  return (
    <>
      <tr className = {s.header}>
      {
        headerData && headerData.map((param, index) => (

          <th className = {`${s.headerParam} ${s[param.className]}`} key = {`header-${param.name}-${index}`}>
            {param.tableName ? param.tableName : param.name}
          </th>

        ))
      }
      </tr>
    </>
  );
}