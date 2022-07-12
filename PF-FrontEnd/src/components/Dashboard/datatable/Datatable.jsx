import "./datatable.scss";
import React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from '../../../redux/actions';

import s from './Datatable.module.css';

const Datatable = () => {
  const dispatch = useDispatch();

  const { allusers } = useSelector((state) => state.userReducer);

  React.useEffect(() => {
    dispatch(getAllUsers())
  }, []);
  
  let users = [];
  users = allusers;

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className = {s.cellAction}>
          {
            !params.row.admin &&
            <Link to={`/admin/user/edit/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className = {s.viewButton}>Edit</div>
            </Link>
          }
          {
              params.row.admin &&
              <div className = {s.viewButtonRestringed}>-NO ACTION AVALAIBLE-</div>
          }

            {/* <div className="deleteButton"
              onClick={() => handleDelete(params.row.id)}>
              Delete
            </div> */}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <h1>Users List</h1>
      <DataGrid
        className="datagrid"
        rows={users}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
