import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showModalAddImage, closeModalAddImage, uploadImage } from '../../redux/actions';
import GeneralModal from '../GeneralModal/GeneralModal';
import ImageLoader from '../ImageLoader/ImageLoader';
import { validateImageToUpload } from '../../util';

import s from './ModalAddImage.module.css';

export default function ModalAddImage({ image, handleImage }) {

  const dispatch = useDispatch();

  const [ uploading, setUploading ] = React.useState(false);
  const [ validation , setValidation ] = React.useState('');
  const [ preview, setPreview ] = React.useState(null);
  const [ file, setFile ] = React.useState({
    fileName: '',
    data: null,
  });

  React.useEffect(() => {

    if (!file.data) {
      setPreview(null);
      return;
    }

    const objUrl = URL.createObjectURL(file.data);
    setPreview(objUrl);

    return () => URL.revokeObjectURL(objUrl);
  }, [file]);

  let handleOnChange = function(e) {
    let [ fileToUpload ] = e.target.files;
    let resultValidation = validateImageToUpload(fileToUpload);
    if (resultValidation.valid) setFile({ fileName: fileToUpload.name, data: fileToUpload });
    else e.target.value = null;
    setValidation(resultValidation.msg);
  }

  const handleClickInput = event => {
    const { target = {} } = event || {};
    target.value = "";
  };


  let handleConfirm = function() {
    setUploading(true);
  }

  let handleCancel = function() {
    dispatch(closeModalAddImage());
  }

  let content = (
    <div className = {s.uploadZone}>
      <div className = {`${s.containerImage} center`}>
      {
        preview && 
        <ImageLoader image = {preview} alt = {file.fileName} />
      }
      {
        !preview && <span className = {s.spanResultValidation} >-NO IMAGE-</span>
      }
      </div> 
      <input type = "file" name = 'file' className = {s.inputFile} onChange = {handleOnChange} onClick = {handleClickInput}/>
      <span className = {`${s.spanResultValidation} ${validation === '' ? s.valid : ''}`}>
        {validation !== '' ? validation : file.fileName}
      </span>
    </div>
  );

  return (
    <GeneralModal
      confirm = {true}
      handleConfirm = {handleConfirm}
      cancel = {true}
      handleCancel = {handleCancel}
      title = {'Import Image'}
      content = {content}
      disableAll = {uploading}
    />
  );
}