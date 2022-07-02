import React from 'react'
import BasicModal from '../../common/BasicModal/BasicModal';


const DeleteCategoryModal = ({ id, open, onClose, confirmDeletedCategory }) => {
    
    const deleteThisCategory = () => {
        confirmDeletedCategory(id);
    };


return (
    <BasicModal
        open={open}
        onClose={onClose}
        title="Delete category"
        subTitle="Are you sure you want to delete this category?"
        onSubmit={deleteThisCategory}
    />
        
)
}

export default DeleteCategoryModal;