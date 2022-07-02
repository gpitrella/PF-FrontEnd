import React, { useState } from 'react';
import "./CategPage.scss";
import Sidebar from "../../Dashboard/sidebar/Sidebar";
import BasicCard from '../../common/BasicCard/BasicCard';
import BasicSnackbar from '../../common/BasicSnackbar/BasicSnackbar';
import CategoryTable from "../CategTable/CategTableSource";
import NewCategoryModal from "../CategoryModals/NewCategoryModal";
import CommonButton from '../../common/CommonButton/CommonButton';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createCategory, getCategories } from '../../../redux/actions';

const CategPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const addCategory = () => {
    setOpenModal(true);
  }

  const addNewCategory = (data) => {
    dispatch(createCategory(data));
    setOpenModal(false);
    dispatch(getCategories());
    history.push("/admin/categories");
  }

  const handleClose = (e, reason) => {
    if(reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <CommonButton
          variant="contained"
          onClick={addCategory}
          size="large"
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
        <NewCategoryModal open={openModal} onClose={() => setOpenModal=false} addNewCategory={addNewCategory} />
      </div>
    </div>
  )
}

export default CategPage;