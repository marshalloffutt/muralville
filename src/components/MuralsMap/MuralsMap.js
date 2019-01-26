import React from 'react';
import {
  Map as LeafletMap, TileLayer, Marker, Popup,
} from 'react-leaflet';
import './MuralsMap.scss';

class MuralsMap extends React.Component {
  render() {
    return (
      <LeafletMap
        center={[36.1627, -86.7816]}
        zoom={13}
        maxZoom={30}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={[36.1627, -86.7816]}>
          <Popup>
            HI
          </Popup>
        </Marker>
      </LeafletMap>
    );
  }
}

export default MuralsMap;
