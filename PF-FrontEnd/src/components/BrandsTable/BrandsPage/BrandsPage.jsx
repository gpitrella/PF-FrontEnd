import React, { useState } from 'react';
import s from "./BrandsPage.module.css";
import Sidebar from "../../Dashboard/sidebar/Sidebar";
import BasicCard from '../../common/BasicCard/BasicCard';
import BasicSnackbar from '../../common/BasicSnackbar/BasicSnackbar';
import { BrandsTable } from "../BrandsTable/BrandsTableSource";
import NewBrandModal from "../BrandsModals/NewBrandModal";
import CommonButton from '../../common/CommonButton/CommonButton';
import { useDispatch } from 'react-redux';
import { createBrand, getBrands } from '../../../redux/actions';
import { useEffect } from 'react';

const BrandsPage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [brandAdded, setBrandAdded] = useState(false);

  const addBrand = () => {
    setOpenModal(true);
  }

  useEffect(()=>{
    dispatch(getBrands());
    setBrandAdded(false);
  }, [dispatch, brandAdded]);

  const addNewBrand = (data) => {
    dispatch(createBrand(data));
    setOpenModal(false);
    setBrandAdded(true);
  }

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
        <CommonButton
          variant="contained"
          onClick={addBrand}
          size="large"
          sx={{
            zIndex: "tooltip",
            position: "absolute",
            mt: 2,
            ml: 120,
            justifyContent: "end",
          }}
        >
          New Brand
        </CommonButton>
        <BasicCard
          content={<BrandsTable onError={() => setOpen(true)}/>}
        />
        <BasicSnackbar
          open={open}
          severity="error"
          message="Data couldn't be fetched"
          onClose={handleClose}
        />
        <NewBrandModal open={openModal} onClose={() => setOpenModal(false)} addNewBrand={addNewBrand} />
      </div>
    </div>
  )
}

export default BrandsPage;