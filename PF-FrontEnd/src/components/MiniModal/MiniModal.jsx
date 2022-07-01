import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { showMiniModal } from '../../redux/actions';

import s from './MiniModal.module.css';

export default function MiniModal() {

  const dispatch = useDispatch();
  const { msg, success, error } = useSelector(state => state.general.miniModal);
  const [ closeModal, setCloseModal ] = React.useState(false);

  React.useEffect(() => {

    let idTimeOut1 = setTimeout(() => setCloseModal(true), 2000);
    let idTimeOut2 = setTimeout(() => dispatch(showMiniModal(false)), 2500);

    return (() => {
      clearTimeout(idTimeOut1);
      clearTimeout(idTimeOut2);
    })
  }, [])

  return (
    <div className = {`${s.container} ${error ? s.error : ''} ${success ? s.success : ''} ${closeModal ? s.closeModal : ''}`}>
      <span className = {s.msg}>
        {msg}
      </span>
    </div>
  )
}