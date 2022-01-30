import Image from 'next/image';
import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

const accessToken = 'pk.eyJ1IjoidGhldGh0ZXRhdW5nMTciLCJhIjoiY2t5bWo1YXMxM2dmbTJ2bjBnaGg1ZWlnbyJ9.WbUlTXokbW-jnYvON2t1RQ';

const Map = () => {
  const latitude = 21.9181677;
  const longitude = 96.110916;
  const [viewPort, setViewPort] = useState<any>({
    latitude: 21.9181677,
    longitude: 96.110916,
    zoom: 14,
    width: '100%',
    height: '400px'
  });

  return (
    <ReactMapGL 
      {...viewPort} 
      mapStyle={'mapbox://styles/thethtetaung17/ckymzybo42xbu14mpp1gj0wpy'}
      mapboxApiAccessToken={accessToken} onViewportChange={setViewPort}>
      {/* <Marker latitude={latitude} longitude={longitude}>
        <Room style={{fontSize: '50px', color: 'red'}}/>
      </Marker> */}
      <Popup latitude={latitude} longitude={longitude}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Image
            alt='logo'
            src={'/atglogo.png'}
            width={130}
            height={90}
          />
          <div style={{display: 'flex', flexDirection: 'column',alignItems: 'center', paddingRight:'10px'}}>
            <span style={{fontWeight:'bolder'}}>ATG Automobiles</span>
            <span style={{fontSize: '12px'}}>Car Sales and Services</span>
          </div>
        </div>
      </Popup>
    </ReactMapGL>
  );
};

export default Map;
