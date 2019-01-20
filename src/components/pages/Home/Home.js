import React from 'react';

import Header from '../../Header/Header';
import MuralsList from '../../MuralsList/MuralsList';
import MuralsMap from '../../MuralsMap/MuralsMap';

import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className='Home'>
        <div className='container'>
          <Header />
        </div>
        <div className='container'>
          <MuralsList />
          <MuralsMap />
        </div>
      </div>
    );
  }
}

export default Home;
