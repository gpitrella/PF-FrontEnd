import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";



const Datatable = () => {
  const dispatch = useDispatch();

  const { allusers } = useSelector((state) => state.userReducer);
  
  let users = [];
  users = allusers;

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
