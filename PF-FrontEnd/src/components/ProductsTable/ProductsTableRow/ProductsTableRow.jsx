import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductsTableCell from '../ProductsTableCell/ProductsTableCell';
import ProductsTableEdit from '../ProductsTableEdit/ProductsTableEdit';
import GeneralModal from '../../GeneralModal/GeneralModal';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton'; 
import { deleteProduct, putProduct, waitingResponseDelete, waitingResponsePut } from '../../../redux/actions';
import ArrowDown from '../../SVG/ArrowDown';
import { rowData } from '../config';

import s from './ProductsTableRow.module.css';

export default function ProductsTableRow({ product }) {

  const dispatch = useDispatch();
  const [ viewMoreDetails, setViewMoreDetails ] = React.useState(false);
  const [ enableEdit, setEnableEdit ] = React.useState(false);
  const [ newProductDetails, setNewProductDetails ] = React.useState({});
  const [ invalid, setInvalid ] = React.useState({});

  const { showLoading } = useSelector(state => state.storepage);

  const [ modal, setModal ] = React.useState({
    show: false
  })

  React.useEffect(() => {
    return () => closeEdit();
  }, []);

  React.useEffect(() => {
    if (enableEdit && newProductDetails.id !== product.id) closeEdit();
  }, [product]);

  let closeEdit = function() {
    setNewProductDetails({});
    setEnableEdit(false);
    setInvalid({});
  }

  let resetEdit = function() {
    setNewProductDetails({
      ...product,
      brand: product.manufacturers[0].name,
      category: product.categories[0],
    });
    setInvalid({});
  }

  let handleEnableEdit = function(product) {
    setNewProductDetails({
      ...product,
      brand: product.manufacturers[0].name,
      category: product.categories[0],
    });
    setEnableEdit(true);
  }

  let handleViewMore = function() {
    setViewMoreDetails(!viewMoreDetails);
  }

  let handleChange = function(e) {
    let { value, name } = e.target;

    setNewProductDetails({
      ...newProductDetails,
      [name]: value
    });
  }

  let handleDelete = function(product) {
    setModal({
      show: true,
      confirm: true,
      cancel: true,
      handleCancel: () => setModal({ ...modal, show: false}),
      handleConfirm: () => {
        dispatch(deleteProduct(product.id));
        setModal({ ...modal, show: false });
        dispatch(waitingResponseDelete(true));
      },
      title: 'Confirm Delete',
      content: setModalViewDelete(normalizeProductDelete(product))
    })
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
            dispatch(putProduct(product.id, {
              name: newProductDetails.name,
              price: Number(newProductDetails.price),
              discount: Number(newProductDetails.discount),
              stock: Number(newProductDetails.stock),
              description: newProductDetails.description,
              image: newProductDetails.image,
              isVisible: newProductDetails.isVisible
            }));
            setModal({ ...modal, show: false });
            dispatch(waitingResponsePut(true));
          },
          title: 'Confirm Edit',
          content: setModalViewEdit(normalizeProduct(product), normalizeProduct(newProductDetails))
        })
        return;
    }
  }

  let normalizeProduct = function(product) {
    return {
      name: product.name,
      price: Number(product.price),
      discount: Number(product.discount),
      stock: Number(product.stock),
      status: product.isVisible ? 'active' : 'inactive'
    }
  }

  let normalizeProductDelete = function(product) {
    return {
      ...normalizeProduct(product),
      brand: product.manufacturers[0].name,
      category: product.categories[0]
    }
  }

  let setModalViewEdit = function(product, newProduct) {
    return (
      <div className = {s.containerComparation}>
        <div className = {s.listContainer}>
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
        </div>
      </div>
    )
  }

  let setModalViewDelete = function(product) {
    return (
      <div className = {s.containerView}>
        <div className = {s.listContainer}>
          <ul className = {s.list}>
          {
            product && Object.keys(product).map((param, index) => 

              <li className={`${s.item}`}>
                <i className = {s.paramName}>{param}:</i> {product[param]}
              </li>

            )
          }
          </ul>
        </div>
      </div>
    )
  }

  if (product.isDummy) return (
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
              <ProductsTableCell 
                product = {product}
                param = {param}
                viewMore = {viewMoreDetails}
                handleViewMore = {handleViewMore}
                handleEnableEdit = {handleEnableEdit}
                handleDelete = {handleDelete}
              />
            </div>
          }
          {
            enableEdit && param.editable && 
            <div className = {`${s.rowParam} ${s.rowAdjust}`} key = {`div-row-edit-${param.id}-${index}`}>
              <ProductsTableEdit 
                newProductDetails = {newProductDetails}
                param = {param}
                handleChange = {handleChange}
                invalid = {invalid}
                handleInvalid = { (newInvalid) => { setInvalid({ ...newInvalid }) } }
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