import React from 'react';
import PropTypes from 'prop-types';
import muralShape from '../../helpers/props/muralShape';
import MuralCard from '../MuralCard/MuralCard';
import './MuralsList.scss';

class MuralsList extends React.Component {
  static propTypes = {
    murals: PropTypes.arrayOf(muralShape),
    initializeSingleCardView: PropTypes.func,
  }

  render() {
    const {
      murals,
      initializeSingleCardView,
    } = this.props;

    const muralsItemComponents = murals.map(mural => (
        <MuralCard
          mural={mural}
          murals={murals}
          key={mural.id}
          initializeSingleCardView={initializeSingleCardView}
        />
    ));
    return (
      <div className='MuralsList flex-wrap d-flex justify-content-center flex-row p-1'>
        {muralsItemComponents}
      </div>
    );
  }
}

export default MuralsList;
