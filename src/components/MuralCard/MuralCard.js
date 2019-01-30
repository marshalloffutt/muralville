import React from 'react';
import PropTypes from 'prop-types';
import muralShape from '../../helpers/props/muralShape';
import './MuralCard.scss';
// import tempMural from '../../images/temp_mural.png';

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
      <div class="m-4 mural-item" id={mural.id} onClick={this.clickedCard}>
        <div class="card mural-card">
          <div class="pt-3 pl-3 pr-3">
              <img class="card-img-top" src={mural.image} alt={mural.title}/>
              <h4 class="card-title mural-card-title mt-1">{mural.title}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default MuralCard;
