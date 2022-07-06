import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PurchasesTableCell from '../PurchasesTableCell/PurchasesTableCell';
import PurchasesTableEdit from '../PurchasesTableEdit/PurchasesTableEdit';
import GeneralModal from '../../GeneralModal/GeneralModal';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton'; 
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
          title: 'Confirm Change',
          content: setModalViewEdit(purchase, newPurchaseDetails)
        })
        return;
    }
  }

  let setModalViewEdit = function(product, newProduct) {
    return (
      <div className = {s.containerComparation}>
{/*        <div className = {s.listContainer}>
          <ul className = {s.list}>
          {
            product && Object.keys(product).map((param, index) => 

              <li className={`${s.item} ${ product[param] !== newProduct[param] ? s.pastValue : ''}`}>
                <i className = {s.paramName}>{param}:</i> {product[param]}
              </li>

            )
          }
          </ul>
        </div>
        <div className = {s.arrowContainer}>
          <ArrowDown />
        </div>
        <div className = {s.listContainer}>
          <ul className = {s.list}>
          {
            newProduct && Object.keys(newProduct).map((param, index) => 

              <li className={`${s.item} ${ newProduct[param] !== product[param] ? s.newValue : ''}`}>
                <i className = {s.paramName}>{param}:</i> {newProduct[param]}
              </li>

            )
          }
          </ul>
        </div>*/}
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