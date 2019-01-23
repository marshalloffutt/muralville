import React from 'react';
import ModalExample from '../Modal/Modal';
import './Header.scss';

class Header extends React.Component {
  render() {
    return (
      <div className='Header container mt-4 mb-4'>
        <ModalExample
          buttonLabel = "Add Mural"
        />
      </div>
    );
  }
}

export default Header;
