import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBrands } from '../../redux/actions';
import { deleteBrand } from '../../redux/actions';
import "./BrandsTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

export const BrandsSource = () => {
  const dispatch = useDispatch();
  const { brandsList } = useSelector((state) => state.homepage);

  useEffect(()=>{
    dispatch(getBrands());
  }, [dispatch]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteBrand(e.target.value))
    alert(`Brand ${e.target.value} deleted`);
  }

  const brandColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Brand",
      width: 500,
      renderCell: (params) => {
        return (
          <div className="brandName">
            {params.row.name}
            <button className="editButton"
            key={params.row.id}
            value={params.row.id}
            // onClick={(e) => handleEdit(e)}
            >
              Edit
            </button>
            <button className="deleteButton"
              key={params.row.id}
              value={params.row.id}
              onClick={(e) => handleDelete(e)}
            >
              Delete
            </button>
        </div>
      );
    },
  }];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Brands
        <Link to="/brands/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={brandsList}
        columns={brandColumns}
        pageSize={10}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row.id}
      />
    </div>
  );
};