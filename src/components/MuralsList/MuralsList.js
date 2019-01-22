import React from 'react';
import PropTypes from 'prop-types';
import muralShape from '../../helpers/props/muralShape';
import MuralCard from '../MuralCard/MuralCard';
import './MuralsList.scss';

class MuralsList extends React.Component {
  static propTypes = {
    murals: PropTypes.arrayOf(muralShape),
  }

  render() {
    const { murals } = this.props;
    const muralsItemComponents = murals.map(mural => (
        <MuralCard
          mural={mural}
          key={mural.id}
        />
    ));
    return (
      <div className='MuralsList flex-wrap d-flex flex-row'>
        {muralsItemComponents}
      </div>
    );
  }
}

export default MuralsList;
