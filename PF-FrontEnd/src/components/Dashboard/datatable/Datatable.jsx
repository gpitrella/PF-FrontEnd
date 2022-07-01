import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from '../../../redux/actions/userActions';


const Datatable = () => {
  const dispatch = useDispatch();

  const { allusers } = useSelector((state) => state.userReducer);
  
  useEffect(() => {
    dispatch(getAllUsers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  let users = [];
  users = allusers;

// console.log(users[0].useraddress[0])

  const handleDelete = (id) => {
    users = users.filter((item) => item.id !== id);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/admin/user/edit/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link>

            <div className="deleteButton"
              onClick={() => handleDelete(params.row.id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      
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
