import React from 'react';

import muralRequests from '../../../helpers/data/muralRequests';
import userRequests from '../../../helpers/data/userRequests';

import Header from '../../Header/Header';
import MuralsList from '../../MuralsList/MuralsList';
import MuralsMap from '../../MuralsMap/MuralsMap';
import MuralView from '../../MuralView/MuralView';

import './Home.scss';
import authRequests from '../../../helpers/data/authRequests';
import smashRequests from '../../../helpers/data/smashRequests';
import favoriteRequests from '../../../helpers/data/favoriteRequests';

class Home extends React.Component {
  state = {
    user: {},
    murals: [],
    map: {},
    selected: '',
    selectedX: '',
    selectedY: '',
    isEditing: false,
    editId: '-1',
  }

  componentDidMount() {
    this.getAndDisplayMurals();
    this.getLoggedInUser();
  }

  getAndDisplayMurals = () => {
    const currentUid = authRequests.getCurrentUid();
    smashRequests.getFavoritedMurals(currentUid)
      .then((murals) => {
        this.setState({ murals });
      })
      .catch(err => console.error('error with murals GET', err));
  }

  getLoggedInUser = () => {
    const uid = authRequests.getCurrentUid();
    userRequests.getUserByUid(uid)
      .then((user) => {
        this.setState({ user });
      })
      .catch(err => console.error('error with user GET', err));
  }

  initializeSingleCardView = (muralId, selectedMural) => {
    const selected = muralId;
    this.setState({
      selected,
      selectedX: selectedMural.x,
      selectedY: selectedMural.y,
    });
  }

  addFavorite = (newFavorite) => {
    favoriteRequests.addFavoriteAxios(newFavorite)
      .then(() => {
        this.getAndDisplayMurals();
      })
      .catch(err => console.error('error in adding favorite', err));
  }

  unFavorite = (favoriteId) => {
    favoriteRequests.deleteFavoriteAxios(favoriteId)
      .then(() => {
        this.getAndDisplayMurals();
      })
      .catch(err => console.error('error in deleting favorite', err));
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

  flyToLocation = (x, y, zoom) => {
    this.state.map.flyTo([y, x], zoom);
  }

  setMap = (map) => {
    this.setState({ map });
  }

  formSubmitEvent = (newMural) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      muralRequests.editMuralAxios(editId, newMural)
        .then(() => {
          muralRequests.getMurals()
            .then((murals) => {
              this.setState({ murals, isEditing: false, editId: '-1' });
            });
        })
        .catch(err => console.error('error with listings post', err));
    } else {
      muralRequests.addMuralAxios(newMural)
        .then(() => {
          muralRequests.getMurals()
            .then((murals) => {
              this.setState({ murals });
            });
        })
        .catch(err => console.error('error with murals post', err));
    }
  }

  passMuralToEdit = muralId => this.setState({ isEditing: true, editId: muralId })

  render() {
    const {
      murals,
      selected,
      selectedX,
      selectedY,
      isEditing,
      editId,
    } = this.state;

    const viewCheck = () => {
      if (this.state.selected !== '') {
        return <MuralView
                  selected={selected}
                  selectedX={selectedX}
                  selectedY={selectedY}
                  murals={murals}
                  goToHome={this.goToHome}
                  deleteMural={this.deleteMural}
                  isEditing={isEditing}
                  editId={editId}
                  flyToLocation={this.flyToLocation}
                  passMuralToEdit={this.passMuralToEdit}
                  onSubmit={this.formSubmitEvent}
                />;
      } return <MuralsList
          murals={murals}
          addFavorite={this.addFavorite}
          unFavorite={this.unFavorite}
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
          <MuralsMap
            murals={murals}
            setMap={this.setMap}
          />
        </div>
      </div>
    );
  }
}

export default Home;
