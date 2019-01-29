import React from 'react';
import {
  Map as LeafletMap, TileLayer, Marker, Popup,
} from 'react-leaflet';
import PropTypes from 'prop-types';
import MuralMapCard from '../MuralMapCard/MuralMapCard';
import muralShape from '../../helpers/props/muralShape';
import './MuralsMap.scss';

class MuralsMap extends React.Component {
  static propTypes = {
    murals: PropTypes.arrayOf(muralShape),
  }

  componentDidMount() {
    this.map = this.mapInstance.leafletElement;
    this.props.setMap(this.map);
  }

  render() {
    const {
      murals,
    } = this.props;

    const pins = murals.map(mural => (
      <Marker
        mural={mural}
        key={mural.id}
        position={[mural.y, mural.x]}
      >
      <Popup>
        <MuralMapCard mural={mural} />
      </Popup>
      </Marker>
    ));

    return (
      <LeafletMap
        ref={(e) => { this.mapInstance = e; }}
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
        {pins}
      </LeafletMap>
    );
  }
}

export default MuralsMap;
