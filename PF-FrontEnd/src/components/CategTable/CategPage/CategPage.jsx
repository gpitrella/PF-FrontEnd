import React, { useState } from 'react';
import s from "./CategPage.module.css";
import Sidebar from "../../Dashboard/sidebar/Sidebar";
import BasicCard from '../../common/BasicCard/BasicCard';
import BasicSnackbar from '../../common/BasicSnackbar/BasicSnackbar';
import CategoryTable from "../CategTable/CategTableSource";
import NewCategoryModal from "../CategoryModals/NewCategoryModal";
import CommonButton from '../../common/CommonButton/CommonButton';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createCategory, getCategories } from '../../../redux/actions';
import { useEffect } from 'react';

const CategPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [categoryAdded, setCategoryAdded] = useState(false);

  const addCategory = () => {
    setOpenModal(true);
  }

  useEffect(()=>{
    dispatch(getCategories());
    setCategoryAdded(false);
  }, [dispatch, categoryAdded]);
  
  const addNewCategory = (data) => {
    dispatch(createCategory(data));
    setOpenModal(false);
    setCategoryAdded(true);
    history.push("/admin/categories");
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
          onClick={addCategory}
          size="large"
          sx={{
            zIndex: "tooltip",
            mt: 1,
            ml: 100,
            justifyContent: "end",
            position: "absolute",

          }}
        >
          New Category
        </CommonButton>
        <BasicCard
          content={<CategoryTable onError={() => setOpen(true)}/>}
        />
        <BasicSnackbar
          open={open}
          severity="error"
          message="Data couldn't be fetched"
          onClose={handleClose}
        />
        <NewCategoryModal open={openModal} onClose={() => setOpenModal(false)} addNewCategory={addNewCategory} />
      </div>
    </div>
  )
}

export default CategPage;