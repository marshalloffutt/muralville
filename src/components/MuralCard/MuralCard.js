import React from 'react';
import PropTypes from 'prop-types';
import muralShape from '../../helpers/props/muralShape';
import './MuralCard.scss';

class MuralCard extends React.Component {
  static propTypes = {
    mural: muralShape,
    initializeSingleCardView: PropTypes.func,
  }

  clickedCard = (e) => {
    e.preventDefault();
    const muralId = e.target.closest('.mural-item').id;
    const selectedMural = this.props.murals.find(mural => mural.id === muralId);
    const { initializeSingleCardView } = this.props;
    initializeSingleCardView(muralId, selectedMural);
  }

  render() {
    const { mural } = this.props;
    return (
      <div className="m-4 mural-item" id={mural.id} onClick={this.clickedCard}>
        <div className="card mural-card">
          <div className="pt-3 pl-3 pr-3">
            <div className="container card-img-container">
              <img className="card-img-top" src={mural.image} alt={mural.title}/>
              <button className="btn card-img-button"><i class="fas fa-star fa-2x"></i></button>
            </div>
              <h3 className="card-title mural-card-title mt-1">{mural.title}</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default MuralCard;
