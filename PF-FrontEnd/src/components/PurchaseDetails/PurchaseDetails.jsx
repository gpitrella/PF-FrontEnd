import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import User from '../SVG/User';
import Email from '../SVG/Email';
import Telephone from '../SVG/Telephone';
import Address from '../SVG/Address';
import Tag from '../SVG/Tag';
import Cancel from '../SVG/Cancel';
import Clock from '../SVG/Clock';
import Card from '../SVG/Card';
import Delivery from '../SVG/Delivery';
import Handshake from '../SVG/Handshake';
import Loading from '../SVG/Loading';
import ServerError from '../SVG/ServerError';
import MapStore from '../MapStore/MapStore';
import { getOnePurchaseDetails, resetOnePurchaseDetails } from '../../redux/actions';

import { PRODUCTS } from './products';

import s from './PurchaseDetails.module.css';

export default function PurchaseDetails() {

  const dispatch = useDispatch();
  const { details, loading, error } = useSelector(state => state.purchases.onePurchase);
  const { id } = useParams();

  let dateOfCreation = new Date(details.createdAt);
  let dateOfModification = new Date(details.updatedAt);

  React.useEffect(() => {
    dispatch(getOnePurchaseDetails(id));
    return () => resetOnePurchaseDetails();
  }, []);

  if (loading) return (
    <div className = {s.containerLoading}>
      <div className = {s.imageContainerLoading}>
        <div className = {s.loadingContainer}>
          <Loading />
        </div>
      </div>
      <span className = {s.spanLoading}>Loading Purchase Details</span>
    </div>
  );

  if (error) return (
    <div className = {s.containerLoading}>
      <div className = {s.imageContainerLoading}>
        <div className = {s.errorContainer}>
          <ServerError />
        </div>
      </div>
      <span className = {s.errorMsg}>Invalid Purchase ID...</span>
    </div>
  );

  return (
    <div className = {s.container}>
      <div className = {s.banner}>
        <span className = {s.bannerTitle}>Purchase Order</span>
        <span className = {s.bannerTitle}>ID: {details.id}</span>
      </div>
      <div className = {s.mainZone}>

        <div className = {s.title}>A- User Info</div>
        <div className = {s.userInfo}>
          <div className = {s.group}>
            <div className = {s.containerIco}>
              <User />
            </div>
            <span className = {s.subtitle}>Name</span>
            <span className = {s.info}>{details.users[0].name}</span>
          </div>

          <div className = {s.group}>
            <div className = {s.containerIco}>
              <Email />
            </div>
            <span className = {s.subtitle}>Email</span>
            <span className = {s.info}>{details.users[0].email}</span>
          </div>

          <div className = {s.group}>
            <div className = {s.containerIco}>
              <Telephone />
            </div>
            <span className = {s.subtitle}>Telephone</span>
            <span className = {s.info}>{details.users[0].phone_number ? details.users[0].phone_number : 'NO-DATA'}</span>
          </div>

          <div className = {s.group}>
            <div className = {s.containerIco}>
              <Address />
            </div>
            <span className = {s.subtitle}>Address</span>
            <span className = {s.info}>{details.useraddresses[0].direction}</span>
          </div>
        </div>

        <div className = {s.title}>B- Sucursal Info</div>
        <div className = {s.sucursalInfo}>
          <div className = {s.group}>
            <div className = {s.containerIco}>
              <Tag />
            </div>
            <span className = {s.subtitle}>Name</span>
            <span className = {s.info}>{details.branch_office.name}</span>
          </div>

          <div className = {s.group}>
            <div className = {s.containerIco}>
              <Telephone />
            </div>
            <span className = {s.subtitle}>Business Hours</span>
            <span className = {s.info}>9hs to 17hs</span>
          </div>

          <div className = {s.group}>
            <div className = {s.containerIco}>
              <Address />
            </div>
            <span className = {s.subtitle}>Address</span>
            <span className = {s.info}>{details.branch_office.direction}</span>
          </div>

          <div className = {s.map}>
            <MapStore
              lat = {details.branch_office.latitude}
              long = {details.branch_office.longitude}
              adress = {details.branch_office.direction}
              name = {details.branch_office.name}
              style = {s.mapStyle}
              zoom = {10}
              userDirection = {details.useraddresses[0]}
            />
          </div>
        </div>

        <div className = {s.title}>C- Items Info</div>
        <div className = {s.itemsInfo}>
        {
          details.items && details.items.length > 0 && details.items.map((product, id) => 

            <div className = {s.groupItem} key = {`item-${product.id}-${id}`}>
              <div className = {s.imageContainer}>
                <img src = {product.picture_url} alt = {product.id} className = {s.imgItem}/>
              </div>
              <div className = {s.infoItem}>
                <span className = {s.subtitleItem}>{product.title}</span>
                <div className = {s.categoryInfo}>
                  <span className = {s.subtitleItemCat}>{product.category_id}</span>
                </div>
                <div className = {s.priceInfo}>
                  <span className = {s.subtitlePrice}>${product.unit_price}</span>
                  <span className = {s.subtitleCount}>x {product.quantity}</span>
                </div>
              </div>
            </div>
          )
        }
        </div>

        <div className = {s.title}>D- Total</div>
        <div className = {s.titlePrice}>${details.totalpurchase}</div>

        <div className = {s.title}>E- STATUS</div>
        <div className = {s.statusInfo}>
          <div className = {details.status === 'cancelled' ? s.selected : ''}>
            <div className = {s.itemContainerProgress}>
              <div className = {s.line}>
              </div>
              <div className = {s.item}>
                <Cancel />
              </div>
              <span className = {s.spanStatus}>CANCELLED</span>
            </div>
          </div>

          <div className = {details.status === 'pending' ? s.selected : ''}>
            <div className = {s.itemContainerProgress}>
              <div className = {s.line}>
              </div>
              <div className = {s.item}>
                <Clock />
              </div>
              <span className = {s.spanStatus}>PENDING</span>
            </div>
          </div>

          <div className = {details.status === 'processing' ? s.selected : ''}>
            <div className = {s.itemContainerProgress}>
              <div className = {s.line}>
              </div>
              <div className = {s.item}>
                <Card />
              </div>
              <span className = {s.spanStatus}>PROCESSING</span>
            </div>
          </div>

          <div className = {details.status === 'sending' ? s.selected : ''}>
            <div className = {s.itemContainerProgress}>
              <div className = {s.line}>
              </div>
              <div className = {s.item}>
                <Delivery />
              </div>
              <span className = {s.spanStatus}>SENDING</span>
            </div>
          </div>

          <div className = {details.status === 'filled' ? s.selected : ''}>
            <div className = {s.itemContainerProgress}>
              <div className = {s.line}>
              </div>
              <div className = {s.item}>
                <Handshake />
              </div>
              <span className = {s.spanStatus}>FILLED</span>
            </div>
          </div>

        </div>

        <div className = {s.containerDates}>
          <div className = {s.groupDate}>
            <span className = {s.subtitleDateName}>Creation Date:</span>
            <span className = {s.subtitleDateInfo}>
              {`${dateOfCreation.getHours()}:${dateOfCreation.getMinutes() < 10 ? '0' : ''}${dateOfCreation.getMinutes()} ${dateOfCreation.toDateString()}`}
            </span>
          </div>
          <div className = {s.groupDate}>
            <span className = {s.subtitleDateName}>Last Modification:</span>
            <span className = {s.subtitleDateInfo}>
              {`${dateOfModification.getHours()}:${dateOfModification.getMinutes() < 10 ? '0' : ''}${dateOfModification.getMinutes()} ${dateOfModification.toDateString()}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}