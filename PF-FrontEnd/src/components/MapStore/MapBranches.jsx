import * as React from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getBranches } from '../../redux/actions';

import s from './Map.module.css'

import pin from "./techmarket-marker.png"
import Tooltip from '@material-ui/core/Tooltip'

export default  function MapBranches() {

  const { branches } = useSelector((state) => state.general)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getBranches())
  },[])

  return(
    <div className={`${s.map__container}`}>
      <Map
        initialViewState={{
          latitude:  -34.594237474220705,
          longitude: -58.43624939984514,
          zoom: 12
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={"pk.eyJ1IjoiY29zbTFjbyIsImEiOiJjbDVia3FpOWEwOGZ2M2xtY3ZxbWlsN2JxIn0.WzWDMgRUQLAWpuhe66RAdg"}
      >
        {branches?.map((branch) =>{
          return(
          <Marker
          longitude={branch.longitude}
          latitude={branch.latitude}
          >
            <Tooltip title={`${branch.name} ${branch.direction}`}>
              <img src={pin} className={`${s.map__img}`}/>
            </Tooltip>
          </Marker>
                );
        })}

        <NavigationControl/>

      </Map>
  </div>
  )
}
