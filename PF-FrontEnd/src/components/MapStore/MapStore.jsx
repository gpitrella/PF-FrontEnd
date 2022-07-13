import * as React from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import pin from "./techmarket-marker.png"
import homePin from "./markerHome.png"
import Tooltip from '@material-ui/core/Tooltip'
import s from './Map.module.css'

export default  function MapStore({ lat,long,name,adress, style, zoom = 15, userDirection = null }) {
  return(
    <div className={`${s.map__container} ${style}`}>
      <Map
        initialViewState={{
          longitude: long,
          latitude: lat,
          zoom: zoom
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={"pk.eyJ1IjoiY29zbTFjbyIsImEiOiJjbDVia3FpOWEwOGZ2M2xtY3ZxbWlsN2JxIn0.WzWDMgRUQLAWpuhe66RAdg"}
      >
          <Marker
          longitude={long}
          latitude={lat}
          >
            <Tooltip title={`${name} ${adress}`}>
              <img src={pin} className = {s.map__img} />
            </Tooltip>
          </Marker>

          {
            userDirection &&
            <Marker
            longitude={userDirection.longitude}
            latitude={userDirection.latitude}
            >
              <Tooltip title={`${userDirection.direction}`}>
                <img src={homePin} className = {s.map__img} />
              </Tooltip>
            </Marker>
          }

        <NavigationControl/>

      </Map>
  </div>
  )
}
