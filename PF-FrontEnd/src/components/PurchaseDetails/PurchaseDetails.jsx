import React from 'react';
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

import { PRODUCTS } from './products';

import s from './PurchaseDetails.module.css';

export default function PurchaseDetails({ id = 1001 }) {

  const [ user, setUser ] = React.useState({
    name: 'Federico',
    email: 'romerof14@gmail.com',
    telephone: '01115xxxxxxxx',
    address: 'BOYACA 3419, Merlo, Buenos Aires'
  });

  const [ sucursal, setSucursal ] = React.useState({
    name: 'MERLO',
    telephone: '01115xxxxxxxx',
    address: 'BOYACA 3419, Merlo, Buenos Aires'
  });

  const [ order, setOrder ] = React.useState({
    total: 11,
    status: 'dispatched'
  })

  const [ products, setProducts ] = React.useState(JSON.parse(PRODUCTS)); 

  return (
    <div className = {s.container}>
      <div className = {s.banner}>
        <span className = {s.bannerTitle}>Purchase Order</span>
        <span className = {s.bannerTitle}>ID: {id}</span>
      </div>
      <div className = {s.mainZone}>

        <div className = {s.title}>A- User Info</div>
        <div className = {s.userInfo}>
          <div className = {s.group}>
            <div className = {s.containerIco}>
              <User />
            </div>
            <span className = {s.subtitle}>Name</span>
            <span className = {s.info}>{user.name}</span>
          </div>

          <div className = {s.group}>
            <div className = {s.containerIco}>
              <Email />
            </div>
            <span className = {s.subtitle}>Email</span>
            <span className = {s.info}>{user.email}</span>
          </div>

          <div className = {s.group}>
            <div className = {s.containerIco}>
              <Telephone />
            </div>
            <span className = {s.subtitle}>Telephone</span>
            <span className = {s.info}>{user.telephone}</span>
          </div>

          <div className = {s.group}>
            <div className = {s.containerIco}>
              <Address />
            </div>
            <span className = {s.subtitle}>Address</span>
            <span className = {s.info}>{user.address}</span>
          </div>
        </div>

        <div className = {s.title}>B- Sucursal Info</div>
        <div className = {s.sucursalInfo}>
          <div className = {s.group}>
            <div className = {s.containerIco}>
              <Tag />
            </div>
            <span className = {s.subtitle}>Name</span>
            <span className = {s.info}>{sucursal.name}</span>
          </div>

          <div className = {s.group}>
            <div className = {s.containerIco}>
              <Telephone />
            </div>
            <span className = {s.subtitle}>Telephone</span>
            <span className = {s.info}>{sucursal.telephone}</span>
          </div>

          <div className = {s.group}>
            <div className = {s.containerIco}>
              <Address />
            </div>
            <span className = {s.subtitle}>Address</span>
            <span className = {s.info}>{sucursal.address}</span>
          </div>
        </div>

        <div className = {s.title}>C- Items Info</div>
        <div className = {s.itemsInfo}>
        {
          products && products.length > 0 && products.map((product, id) => 

            <div className = {s.groupItem} key = {`item-${product.id}-${id}`}>
              <div className = {s.imageContainer}>
                <img src = {product.image} alt = {product.id} className = {s.imgItem}/>
              </div>
              <div className = {s.infoItem}>
                <span className = {s.subtitleItem}>{product.name}</span>
                <div className = {s.categoryInfo}>
                  <span className = {s.subtitleItemCat}>{product.manufacturers[0].name}</span>
                  <span className = {s.subtitleItemCat}>{product.categories[0]}</span>
                </div>
                <div className = {s.priceInfo}>
                  <span className = {s.subtitlePrice}>${product.price}</span>
                  <span className = {s.subtitleCount}>x 1</span>
                </div>
              </div>
            </div>
          )
        }
        </div>

        <div className = {s.title}>D- Total</div>
        <div className = {s.titlePrice}>${order.total}</div>

        <div className = {s.title}>E- STATUS</div>
        <div className = {s.statusInfo}>
          <div className = {order.status === 'cancelled' ? s.selected : ''}>
            <div className = {s.itemContainerProgress}>
              <div className = {s.line}>
              </div>
              <div className = {s.item}>
                <Cancel />
              </div>
              <span className = {s.spanStatus}>CANCELLED</span>
            </div>
          </div>

          <div className = {order.status === 'pending' ? s.selected : ''}>
            <div className = {s.itemContainerProgress}>
              <div className = {s.line}>
              </div>
              <div className = {s.item}>
                <Clock />
              </div>
              <span className = {s.spanStatus}>PENDING</span>
            </div>
          </div>

          <div className = {order.status === 'processing' ? s.selected : ''}>
            <div className = {s.itemContainerProgress}>
              <div className = {s.line}>
              </div>
              <div className = {s.item}>
                <Card />
              </div>
              <span className = {s.spanStatus}>PROCESSING</span>
            </div>
          </div>

          <div className = {order.status === 'dispatched' ? s.selected : ''}>
            <div className = {s.itemContainerProgress}>
              <div className = {s.line}>
              </div>
              <div className = {s.item}>
                <Delivery />
              </div>
              <span className = {s.spanStatus}>DISPATCHED</span>
            </div>
          </div>

          <div className = {order.status === 'filled' ? s.selected : ''}>
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
            <span className = {s.subtitleDateInfo}>20:31, Fri Jun 05 2020</span>
          </div>
          <div className = {s.groupDate}>
            <span className = {s.subtitleDateName}>Last Modification:</span>
            <span className = {s.subtitleDateInfo}>20:31, Fri Jun 05 2020</span>
          </div>
        </div>
      </div>
    </div>
  );
}