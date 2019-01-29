import React from 'react';
import './MuralMapCard.scss';

class MuralMapCard extends React.Component {
  render() {
    const { mural } = this.props;

    return (
      <div>
          <h5>{mural.title}</h5>
          <img className='map-card-img' src={mural.image} alt={mural.title}/>
          <p>Artist: {mural.artist}</p>
          <p>Address: {mural.address}</p>
      </div>
    );
  }
}

export default MuralMapCard;
