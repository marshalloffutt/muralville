import React from 'react';

// import authRequests from '../../../helpers/data/authRequests';
import muralRequests from '../../../helpers/data/muralRequests';

import Header from '../../Header/Header';
import MuralsList from '../../MuralsList/MuralsList';
import MuralsMap from '../../MuralsMap/MuralsMap';
import MuralView from '../../MuralView/MuralView';

import './Home.scss';

class Home extends React.Component {
  state = {
    murals: [],
    selected: '',
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

  initializeSingleCardView = (muralId) => {
    const selected = muralId;
    this.setState({ selected });
  }

  deleteMural = (muralId) => {
    muralRequests.deleteMuralAxios(muralId)
      .then(() => {
        this.getAndDisplayMurals();
        this.setState({ selected: '' });
      })
      .catch(err => console.error('error in deleting mural', err));
  }

  goToHome = () => {
    this.setState({ selected: '' });
  }

  formSubmitEvent = (newMural) => {
    muralRequests.addMuralAxios(newMural)
      .then(() => {
        muralRequests.getMurals()
          .then((murals) => {
            this.setState({ murals });
          });
      })
      .catch(err => console.error('error with murals post', err));
  }

  render() {
    const viewCheck = () => {
      if (this.state.selected !== '') {
        return <MuralView
                  selected={this.state.selected}
                  murals={this.state.murals}
                  goToHome={this.goToHome}
                  deleteMural={this.deleteMural}
                />;
      } return <MuralsList
          murals={this.state.murals}
          initializeSingleCardView={this.initializeSingleCardView}
        />;
    };

    return (
      <div className='Home'>
        <div className='header-wrapper'>
          <Header
            onSubmit={this.formSubmitEvent}
          />
        </div>
        <div className='content-wrapper'>
          {viewCheck()}
          <MuralsMap />
        </div>
      </div>
    );
  }
}

export default Home;
