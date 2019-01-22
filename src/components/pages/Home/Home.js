import React from 'react';

// import authRequests from '../../../helpers/data/authRequests';
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
    this.getAndDisplayMurals();
  }

  getAndDisplayMurals = () => {
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
          <MuralsList murals={this.state.murals}/>
          <MuralsMap />
        </div>
      </div>
    );
  }
}

export default Home;
