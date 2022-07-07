import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SalesColumns } from '../SalesColumns/SalesColumns';
import { getSalesOrders } from '../../../redux/actions/generalActions';
import { editSalesOrder } from '../../../redux/actions';
import "./SalesTable.scss";
import DataTable from '../../common/DataTable/DataTable';
import EditOrderModal from '../EditModals';

const SalesTable = ({ onError }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { allSalesOrders } = useSelector((state) => state.general);
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([{
    id: 0,
    name: '',
    price: 0,
    image: '',
    userId: 0,
    userFullName: '', 
  }]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [orderEdited, setOrderEdited] = useState(false);

  useEffect(()=>{
    dispatch(getSalesOrders());
    setOrderEdited(false);
  }, [dispatch, orderEdited]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prevState => ([{
      ...prevState,
      name:value
    }]));
  };

  const editOrder = (e) =>{
    const newSelectedOrder = allSalesOrders.find((c) => c.id === e);
    setSelectedOrder(newSelectedOrder);
    setOpenModalEdit(true);
  }

  const savedEditedOrder = (values) => {
    setOpenModalEdit(false);
    dispatch(editSalesOrder(values));
    setOrderEdited(true);
    history.push("/admin/orders");
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton"
            onChange={()=>handleChange(params.row.id)}
            onClick={()=>editOrder(params.row.id)}
            >Edit</div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Sales Orders
      </div>
      <DataTable
        className="datagrid"
        rows={allSalesOrders}
        columns={SalesColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        loading={!allSalesOrders.length}
        getRowId={(row) => row.id}
      />
      <EditOrderModal order={selectedOrder} open={openModalEdit} onClose={() => setOpenModalEdit=false} savedEditedOrder={savedEditedOrder} />
    </div>
  );
};

export default SalesTable;