import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import PurchaseDetails from '../PurchaseDetails/PurchaseDetails';

import s from './UserPurchaseDetails.module.css';

export default function UserPurchaseDetails() {

  const { user } = useSelector(state => state.general);
  const { id } = useParams();
  const history = useHistory();

  let handleGoBack = function() {
    history.push('/myprofile/mypurchases/');
  }

  if (!user || !user.user || user.user.admin) history.replace('/');

  return (
    <div className = {s.container}>
      <button className = {s.goBack} onClick = {handleGoBack}>{'< Go Back'}</button>
      <PurchaseDetails />
    </div>
  );
}