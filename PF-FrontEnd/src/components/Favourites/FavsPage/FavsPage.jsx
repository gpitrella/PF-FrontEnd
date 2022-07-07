import React, { useState } from 'react';
import s from "./CategPage.module.css";
import Sidebar from "../../Dashboard/sidebar/Sidebar";
import BasicCard from '../../common/BasicCard/BasicCard';
import BasicSnackbar from '../../common/BasicSnackbar/BasicSnackbar';
import SalesTable from "../SalesTable/SalesTable";
import CommonButton from '../../common/CommonButton/CommonButton';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSalesOrders } from '../../../redux/actions';
import { useEffect } from 'react';

const SalesPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { allSalesOrders } = useSelector((state) => state.general);

  

  useEffect(()=>{
    dispatch(getSalesOrders());
  }, [dispatch]);
  
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
          content={<SalesTable onError={() => setOpen(true)}/>}
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

export default SalesPage;