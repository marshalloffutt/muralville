import React from 'react';
import {
  Card, CardImg, CardBody,
} from 'reactstrap';
import muralShape from '../../helpers/props/muralShape';
import './MuralCard.scss';
import tempMural from '../../images/temp_mural.png';

class MuralCard extends React.Component {
  static propTypes = {
    mural: muralShape,
  }

  render() {
    const { mural } = this.props;
    return (
      <div className="col-5 m-2">
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
