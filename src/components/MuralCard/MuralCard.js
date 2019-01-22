import React from 'react';
import {
  Card, CardImg, CardBody, CardTitle,
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
      <div className="col-6">
        <Card>
          <CardImg top width="100%" src={tempMural} alt={mural.title} />
          <CardBody>
            <CardTitle>{mural.title}</CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default MuralCard;
