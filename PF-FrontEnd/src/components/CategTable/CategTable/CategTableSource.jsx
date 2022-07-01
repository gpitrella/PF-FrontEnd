import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { categoryColumns } from '../CategoryColumns/CategoryColumns';
import { getCategories } from '../../../redux/actions/homepageActions';
import { deleteCategory, updateCategory } from '../../../redux/actions';
import "./CategTable.scss";
import { DataGrid, GridRowModel } from "@mui/x-data-grid";
import Modal from "../../Modals/Modal";
import { useModal } from "../../Modals/useModal";
import CreateCategory from "../NewCategory";
import EditCategory from "../EditCategory";
import DeleteModal from "../DeleteModal";
import { Button, TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';


export const CategoryTable = () => {
  const dispatch = useDispatch();
  const { allCategories } = useSelector((state) => state.homepage);

  useEffect(()=>{
    dispatch(getCategories());
  }, [dispatch]);

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleEdit = (id, data) => {
    dispatch(updateCategory(id, data))
    dispatch(getCategories());
  }


  const handleDelete = (id) => {
    dispatch(deleteCategory(id))
    dispatch(getCategories());
  }

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


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="editButton">Edit</div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Categories
        <button onClick={openModalNew}>New Category</button>
            <Modal isOpen={isOpenModalNew} closeModal={closeModalNew}>
                <CreateCategory />    
            </Modal >
      </div>
      <DataGrid
        className="datagrid"
        rows={allCategories}
        columns={categoryColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row.id}
        processRowUpdate={handleEdit}
        isCellEditable={(params) => params.row.name}
        experimentalFeatures={{ newEditingApi: true }}
      />
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
};