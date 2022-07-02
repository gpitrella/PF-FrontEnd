import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { categoryColumns } from '../CategoryColumns/CategoryColumns';
import { getCategories } from '../../../redux/actions/homepageActions';
import { deleteCategory, updateCategory } from '../../../redux/actions';
import "./CategTable.scss";
import DataTable from '../../common/DataTable/DataTable';
import EditCategoryModal from '../CategoryModals/EditCategoryModal';
import DeleteCategoryModal from '../CategoryModals/DeleteCategoryModal';

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

  const { allCategories } = useSelector((state) => state.homepage);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([{
    id: 0,
    name: ''  
  }]);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  useEffect(()=>{
    dispatch(getCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prevState => ([{
      ...prevState,
      name:value
    }]));
  };

  const editCategory = (e) =>{
    const newSelectedCategory = allCategories.find((c) => c.id === e);
    setSelectedCategory(newSelectedCategory);
    setOpenModalEdit(true);
  }

  const deleteThisCategory = (e) => {
    const newSelectedCategory = allCategories.find((c) => c.id === e);
    setSelectedCategory(newSelectedCategory)
    setOpenModalDelete(true);
  };

  const savedEditedCategory = (values) => {
    setOpenModalEdit(false);
    dispatch(updateCategory(values));
    dispatch(getCategories());
    history.push("/admin/categories");
  }

  const confirmDeletedCategory = (id) => {
    setOpenModalDelete(false);
    dispatch(deleteCategory(id));
    dispatch(getCategories());
    history.push("/admin/categories");
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
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton"
            onChange={()=>handleChange(params.row.id)}
            onClick={()=>editCategory(params.row.id)}
            >Edit</div>
            <div
              className="deleteButton"
              onClick={()=>deleteThisCategory(params.row.id)}
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
      </div>
      <DataTable
        className="datagrid"
        rows={allCategories}
        columns={categoryColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[9]}
        loading={!allCategories.length}
        getRowId={(row) => row.id}
        processRowUpdate={processRowUpdate}      
      />
      <EditCategoryModal category={selectedCategory} open={openModalEdit} onClose={() => setOpenModalEdit=false} savedEditedCategory={savedEditedCategory} />
      <DeleteCategoryModal id={selectedCategory.id} open={openModalDelete} onClose={() => setOpenModalDelete=false} confirmDeletedCategory={confirmDeletedCategory} />
    </div>
  );
};

export default CategoryTable;