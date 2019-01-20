import React from 'react';

import Header from '../../Header/Header';
import MuralsList from '../../MuralsList/MuralsList';
import MuralsMap from '../../MuralsMap/MuralsMap';

import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className='Home'>
        <div className='header-wrapper'>
          <Header />
        </div>
        <div className='content-wrapper'>
          <MuralsList />
          <MuralsMap />
        </div>
      </div>
    );
  }
}

export default Home;
