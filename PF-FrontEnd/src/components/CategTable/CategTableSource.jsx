import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, getProductsToForms } from '../../redux/actions';
import { deleteCategory } from '../../redux/actions';
import "./CategTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "../Modals/Modal";
import { useModal } from "../Modals/useModal";
import CreateCategory from "./NewCategory";
import EditCategory from "./EditCategory";
import DeleteModal from "./DeleteModal";
import { Button, TextField } from '@mui/material';


export const CategSource = () => {
  const dispatch = useDispatch();
  const { allCategories } = useSelector((state) => state.homepage);
  const { allProducts } = useSelector((state) => state.dashboard);

  useEffect(()=>{
    dispatch(getCategories());
    // dispatch(getProductsToForms());
  }, [dispatch]);

  // const handleEdit = (e) => {
  //   e.preventDefault();
  //   dispatch(updateCategory(row.params.id, e.target.value))
  //   dispatch(getCategories());
  // }


  // const handleDelete = (e) => {
  //   e.preventDefault();
  //   dispatch(deleteCategory(e.target.value))
  //   dispatch(getCategories());
  // }

  const [isOpenModalNew, openModalNew, closeModalNew] = useModal(false);
  const [isOpenModalEdit, openModalEdit, closeModalEdit] = useModal(false)
  const [isOpenModalDelete, openModalDelete, closeModalDelete] = useModal(false);


  // const bodyDelete=(
  //   <div className="modal">
  //     <p>Are you sure you want to delete this category?</p>
  //     <div align="right">
  //       <Button color="secondary" onClick={()=>handleDelete()}>Yes</Button>
  //       <Button onClick={closeModalDelete}>No</Button>
  //     </div>
  //   </div>
  // )


  const categColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
    field: "name",
    headerName: "Category",
    width: 500,
    renderCell: (params) => {
      return (
        <div className="categoryName">
          {params.row.name}
          <button
            className="editButton"
            key={params.row.id}
            value={params.row.id}
            onClick={openModalEdit}
          >
            Edit
          </button>
          <Modal isOpen={isOpenModalEdit} closeModal={closeModalEdit} >
            <EditCategory value={params.row.id}/>
          </Modal>

          <button
            className="deleteButton"
            key={params.row.id}
            value={params.row.id}
            onClick={openModalDelete}
          >
            Delete
          </button>
          <Modal isOpen={isOpenModalDelete} closeModal={closeModalDelete} >
            <DeleteModal />
          </Modal>
        </div>
      );
    },
  }];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Categories
        <button onClick={openModalNew}>New Category</button>
            <Modal isOpen={isOpenModalNew} closeModal={closeModalNew}>
                <CreateCategory />    
            </Modal>
      </div>
      <DataGrid
        className="datagrid"
        rows={allCategories}
        columns={categColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row.name}
      />
    </div>
  );
};