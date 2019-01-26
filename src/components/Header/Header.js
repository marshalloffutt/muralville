import React from 'react';
import AddMuralModal from '../AddMuralModal/AddMuralModal';
import './Header.scss';

class Header extends React.Component {
  render() {
    return (
      <div className='Header container mt-4 mb-4'>
        <AddMuralModal
          buttonLabel = "Add Mural"
          onSubmit={this.props.onSubmit}
        />
      </div>
    );
  }
}

export default Header;
