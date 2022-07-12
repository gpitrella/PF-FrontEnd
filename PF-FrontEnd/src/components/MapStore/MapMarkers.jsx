import * as React from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import pin from "./techmarket-marker.png"
import Tooltip from '@material-ui/core/Tooltip'
import './Map.css'

export default  function MapMarkers(locals) {
  return(
    <div className='map__container'>
      <Map
        initialViewState={{
          longitude: long,
          latitude: lat,
          zoom: 15
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={"pk.eyJ1IjoiY29zbTFjbyIsImEiOiJjbDVia3FpOWEwOGZ2M2xtY3ZxbWlsN2JxIn0.WzWDMgRUQLAWpuhe66RAdg"}
      >
        {locals?.map((local) =>{
          return(
          <Marker
          longitude={local.long}
          latitude={local.lat}
          >
            <Tooltip title={`${local.name} ${local.adress}`}>
              <img src={pin} className='map__img'/>
            </Tooltip>
          </Marker>
                );
        })}

        <NavigationControl/>

      </Map>
  </div>
  )
}
