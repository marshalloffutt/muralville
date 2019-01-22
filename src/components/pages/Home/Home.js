import React from 'react';

import muralRequests from '../../../helpers/data/muralRequests';

import Header from '../../Header/Header';
import MuralsList from '../../MuralsList/MuralsList';
import MuralsMap from '../../MuralsMap/MuralsMap';

import './Home.scss';

class Home extends React.Component {
  state = {
    murals: [],
  }

  componentDidMount() {
    muralRequests.getMurals()
      .then((murals) => {
        this.setState({ murals });
      })
      .catch(err => console.error('error with murals GET', err));
  }

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
