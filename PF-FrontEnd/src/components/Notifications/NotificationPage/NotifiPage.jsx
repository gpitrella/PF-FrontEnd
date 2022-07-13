import React, { useState } from 'react';
import s from "./NotifiPage.module.css";
import Sidebar from "../../Dashboard/sidebar/Sidebar";
import BasicCard from '../../common/BasicCard/BasicCard';
import BasicSnackbar from '../../common/BasicSnackbar/BasicSnackbar';
import NotificationTable from "../NotificationTable/NotifiTableSource";
import { useDispatch } from 'react-redux';
import { getCategories } from '../../../redux/actions';
import { useEffect } from 'react';

const CategPage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [categoryAdded, setCategoryAdded] = useState(false);

  useEffect(()=>{
    dispatch(getCategories());
    setCategoryAdded(false);
  }, [dispatch, categoryAdded]);
  
  const handleClose = (e, reason) => {
    if(reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  return (
    <div className={s.list}>
      <Sidebar/>
      <div className={s.listContainer}>
        <BasicCard 
          content={<NotificationTable onError={() => setOpen(true)} />}
        />
        <BasicSnackbar 
          open={open}
          severity="error"
          message="Data couldn't be fetched"
          onClose={handleClose}
        />
      </div>
    </div>
  )
}

export default CategPage;