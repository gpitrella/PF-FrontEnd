import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { notificationColumns } from '../NotificationsColumns/NotificationsColumns';
import { getCategories } from '../../../redux/actions/homepageActions';
import { updateCategory, getAllComments, putCommentAnswer } from '../../../redux/actions';
import "./NotifiTable.scss";
import DataTable from '../../common/DataTable/DataTable';
import EditNotificationModal from '../NotificationModals/EditNotificationModal';

const useFakeMutation = () => {
  return React.useCallback(
    (category) =>
    new Promise((resolve, reject) => 
    setTimeout(()=> {
      if (category.name?.trim() === '') {
        reject(new Error("Error while saving user: name can't be empty."));
      } else {
        resolve({ ...category, name: category.name?.toUpperCase() });
      }
    }, 200),
    ),
  [],
  );
};

const CategoryTable = ({ onError }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const mutateRow = useFakeMutation();

  const { allComments } = useSelector((state) => state.dashboard);
  const { allCategories } = useSelector((state) => state.homepage);
  const [data, setData] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState([{
    id: 0,
    answer: ''  
  }]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [categoriesModified, setCategoriesModified] = useState(false);

  useEffect(()=>{
    dispatch(getAllComments());
    dispatch(getCategories());
    setCategoriesModified(false);
  }, [dispatch, categoriesModified]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prevState => ([{
      ...prevState,
      answer:value
    }]));
  };

  const answerNotification = (e) =>{
    const newSelectedCategory = allComments.find((c) => c.id === e);
    setSelectedNotification(newSelectedCategory);
    setOpenModalEdit(true);
  }

  const savedEditedCategory = (id) => {
    console.log(id)
    setOpenModalEdit(false);
    dispatch(putCommentAnswer(id))
    // dispatch(updateCategory(values));
    setCategoriesModified(true);
    history.push("/admin/notifications");
  }

  const processRowUpdate = React.useCallback(
    async (newRow) => {
      dispatch(updateCategory(newRow))
      const response = await mutateRow(newRow)
      return response
    }, [updateCategory, mutateRow]
  )

  const actionColumn = [
    {
      field: "to answer",
      headerName: "To Answer",
      width: 200,
      renderCell: (params) => {
        return (<div>
          {params.row.answer === null 
              ? <div className="cellAction">
                    <div className="viewButton" 
                        onChange={()=>handleChange(params.row.id)}
                        onClick={()=>answerNotification(params.row.id)}
                    >Answer</div>
                 </div>
              : <div><p>Answered</p></div>}
          </div>);
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Notifications
      </div>
      <DataTable
        className="datagrid"
        rows={allComments}
        columns={notificationColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        loading={!allComments.length}
        getRowId={(row) => row.id}
        processRowUpdate={processRowUpdate}      
      />
      <EditNotificationModal id={selectedNotification.id} notification={selectedNotification} open={openModalEdit} onClose={() => setOpenModalEdit(false)} savedEditedCategory={savedEditedCategory} />
    </div>
  );
};

export default CategoryTable;