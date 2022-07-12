import React from 'react';
import PurchasesTableRow from '../PurchasesTableRow/PurchasesTableRow';

import s from './PurchasesTableRows.module.css';

export default function PurchasesTableRows({ purchases }) {

  if (purchases.length < 10) {
    purchases = purchases.concat((Array(10 - purchases.length).fill({ isDummy: true })));
  }

  return (
    <>
      {
        purchases && purchases.length > 0 && purchases.map((purchase, index) =>

          <PurchasesTableRow purchase = {purchase} key = {`purchase-rows-${index}`}/>

        )
      }
    </>
  );
}