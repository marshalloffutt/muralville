import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardImg, CardBody,
} from 'reactstrap';
import muralShape from '../../helpers/props/muralShape';
import './MuralCard.scss';
import tempMural from '../../images/temp_mural.png';

class MuralCard extends React.Component {
  static propTypes = {
    mural: muralShape,
    initializeSingleCardView: PropTypes.func,
  }

  clickedCard = (e) => {
    e.preventDefault();
    const muralId = e.target.closest('.mural').id;
    const { initializeSingleCardView } = this.props;
    // console.log(muralId);
    initializeSingleCardView(muralId);
  }

  render() {
    const { mural } = this.props;
    return (
      <div id={mural.id} className="col-5 m-2 mural" onClick={this.clickedCard}>
        <Card className="mural-item">
          <CardImg top width="100%" height="50%" src={tempMural} alt={mural.title} />
          <CardBody>
            <h3>{mural.title}</h3>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default MuralCard;
