import React from 'react'
import BasicModal from '../../common/BasicModal/BasicModal'


const DeleteBrandModal = ({ id, open, onClose, confirmDeletedBrand }) => {
    const deleteBrand = () => {
        confirmDeletedBrand(id);

    };


return (
    <BasicModal
        open={open}
        onClose={onClose}
        title="Delete brand"
        subTitle="Are you sure you want to delete this brand?"
        onSubmit={deleteBrand}
    />
        
)
}

export default DeleteBrandModal;