import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BrandsColumns } from '../BrandsColumns/BrandsColumns';
import { getBrands } from '../../../redux/actions';
import { deleteBrand, updateBrand } from '../../../redux/actions';
import "./BrandsTable.scss";
import DataTable from '../../common/DataTable/DataTable';
import EditBrandModal from '../BrandsModals/EditBrandModal';
import DeleteBrandModal from '../BrandsModals/DeleteBrandModal';

const useFakeMutation = () => {
  return React.useCallback(
    (brand) =>
    new Promise((resolve, reject) => 
    setTimeout(()=> {
      if (brand.name?.trim() === '') {
        reject(new Error("Error while saving brand: name can't be empty."));
      } else {
        resolve({ ...brand, name: brand.name?.toUpperCase() });
      } if(brand.image?.trim() === ''){
        reject (new Error("Error while saving brand: image can't be empty. "));
      }
    }, 200),
    ),
  [],
  );
};

export const BrandsTable = () => {
  const dispatch = useDispatch();
  const mutateRow = useFakeMutation();
  const history = useHistory();
  const { brandsList } = useSelector((state) => state.homepage);

  const [data, setData] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([{
    id: 0,
    name: '',
    image: ''
  }]);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  
  useEffect(()=>{
    dispatch(getBrands());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prevState => ([{
      ...prevState,
      [name]:value
    }]));
  };

  const editBrand = (e) =>{
    const newSelectedBrand = brandsList.find((b) => b.id === e);
    setSelectedBrand(newSelectedBrand);
    setOpenModalEdit(true);
  };

  const deleteThisBrand = (e) => {
    const newSelectedBrand = brandsList.find((b) => b.id === e);
    setSelectedBrand(newSelectedBrand);
    setOpenModalDelete(true);
  };

  const saveEditedBrand = (values) => {
    setOpenModalEdit(false);
    dispatch(updateBrand(values));
    dispatch(getBrands());
    history.push("/admin/brands")
  };

  const confirmDeletedBrand = (id) => {
    setOpenModalDelete(false);
    dispatch(deleteBrand(id));
    dispatch(getBrands());
    history.push("/admin/brands")
  }

  const processRowUpdate = React.useCallback(
    async (newRow) => {
      dispatch(updateBrand(newRow))
      const response = await mutateRow(newRow)
      return response
    }, [updateBrand, mutateRow]
  );

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton"
            onClick={()=>editBrand(params.row.id)}
            >Edit</div>
            <div
              className="deleteButton"
              onClick={()=>deleteThisBrand(params.row.id)}
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
        Brands
      </div>
      <DataTable
        className="datagrid"
        rows={brandsList}
        columns={BrandsColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[9]}
        loading={!brandsList.length}
        getRowId={(row) => row.id}
        processRowUpdate={processRowUpdate}
      />
      <EditBrandModal brand={selectedBrand} open={openModalEdit} onClose={() => setOpenModalEdit=false} saveEditedBrand={saveEditedBrand} />
      <DeleteBrandModal id={selectedBrand.id} open={openModalDelete} onClose={() => setOpenModalDelete=false} confirmDeletedBrand={confirmDeletedBrand} />
    </div>
  );
};