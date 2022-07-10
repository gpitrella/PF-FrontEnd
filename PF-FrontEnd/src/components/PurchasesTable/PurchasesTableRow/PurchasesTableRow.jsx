import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PurchasesTableCell from '../PurchasesTableCell/PurchasesTableCell';
import PurchasesTableEdit from '../PurchasesTableEdit/PurchasesTableEdit';
import GeneralModal from '../../GeneralModal/GeneralModal';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton';
import ArrowDown from '../../SVG/ArrowDown';
import { rowData } from '../config';

import s from './PurchasesTableRow.module.css';

export default function PurchasesTableRow({ purchase }) {

  const dispatch = useDispatch();
  const [ viewMoreDetails, setViewMoreDetails ] = React.useState(false);
  const [ enableEdit, setEnableEdit ] = React.useState(false);
  const [ newPurchaseDetails, setNewPurchaseDetails ] = React.useState({});

  const { showLoading } = useSelector(state => state.storepage);

  const [ modal, setModal ] = React.useState({
    show: false
  })

  React.useEffect(() => {
    return () => closeEdit();
  }, []);

  React.useEffect(() => {
    if (enableEdit && newPurchaseDetails.id !== purchase.id) closeEdit();
  }, [purchase]);

  let closeEdit = function() {
    setNewPurchaseDetails({});
    setEnableEdit(false);
  }

  let resetEdit = function() {
    setNewPurchaseDetails({
      ...purchase
    });
  }

  let handleEnableEdit = function(product) {
    resetEdit();
    setEnableEdit(true);
  }

  let handleViewMore = function() {
    setViewMoreDetails(!viewMoreDetails);
  }

  let handleChange = function(e) {
    let { value, name } = e.target;

    setNewPurchaseDetails({
      ...newPurchaseDetails,
      [name]: value
    });
  }

  let handleOptions = function(option) {
    switch (option) {
      case 'CANCEL':
        closeEdit();
        return;
      case 'RELOAD':
        resetEdit();
        return;
      default:
        setModal({
          show: true,
          confirm: true,
          cancel: true,
          handleCancel: () => setModal({ ...modal, show: false }),
          handleConfirm: () => {
            console.log('Modifico la orden de compra.');
          },
          title: 'Confirm Change of Status',
          content: setModalViewEdit(purchase, newPurchaseDetails)
        })
        return;
    }
  }

  let setModalViewEdit = function(purchase, newPurchaseDetails) {
    return (
      <div className = {s.containerComparation}>

        <div className = {s.listContainer}>
          <ul className = {s.list}>
            <li className = {s.item}>
              <i className = {s.paramName}>id:</i> {purchase.id}
            </li>
            <li className = {s.item}>
              <i className = {s.paramName}>user:</i> {purchase.user.email}
            </li>
            <li className = {s.item}>
              <i className = {s.paramName}>total:</i> $ {purchase.total}
            </li>
            <li className = {s.item}>
              <i className = {s.paramName}>User Address:</i> {purchase.userDirection.name}
            </li>
            <li className = {s.item}>
              <i className = {s.paramName}>Sucursal:</i> {purchase.sucursal.name}
            </li>
            <li className = {s.item}>
              <i className = {s.paramName}>Creation:</i> {new Date(purchase.creationDate).toDateString()}
            </li>
          </ul>
        </div>

        <span className = {`${s.param} ${s.pastValue}`}>{purchase.status}</span>

        <div className = {s.arrowContainer}>
          <ArrowDown />
        </div>

        <span className = {`${s.param} ${s.newValue}`}>{newPurchaseDetails.status}</span>

      </div>
    )
  }

  if (purchase.isDummy) return (
    <tr className = {s.row}>
        {
          !showLoading && <td><div className = {s.rowParam}></div></td>
        }
        {
          showLoading && 
            <td colspan = '11'>
              <div className = {s.rowParam}>
                <LoadingSkeleton />
              </div>
            </td>
        }
    </tr>
  );

  return (
    <tr className = {s.row}>
      {
        rowData && rowData.map((param, index) =>

          <td
            key = {`row-${param.id}-${index}`}
          >
          {
            (!enableEdit || !param.editable) &&
            <div className = {`${s.rowParam} ${ !viewMoreDetails ? s.rowAdjust : ''}`} key = {`div-row-${param.id}-${index}`}>
              <PurchasesTableCell 
                purchase = {purchase}
                param = {param}
                viewMore = {viewMoreDetails}
                handleViewMore = {handleViewMore}
                handleEnableEdit = {handleEnableEdit}
              />
            </div>
          }
          {
            enableEdit && param.editable && 
            <div className = {`${s.rowParam} ${s.rowAdjust}`} key = {`div-row-edit-${param.id}-${index}`}>
              <PurchasesTableEdit 
                newPurchaseDetails = {newPurchaseDetails}
                param = {param}
                handleChange = {handleChange}
                handleOptions = {handleOptions}
              />
            </div>
          }
          {
            modal.show && 
            <GeneralModal 
              confirm = {modal.confirm}
              handleConfirm = {modal.handleConfirm}
              cancel = {modal.cancel}
              handleCancel = {modal.handleCancel}
              title = {modal.title}
              content = {modal.content}
            />
          }

          </td>

        )
      }
    </tr>
  );
}