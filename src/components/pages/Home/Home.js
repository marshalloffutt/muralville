import React from 'react';

import muralRequests from '../../../helpers/data/muralRequests';

import Header from '../../Header/Header';
import MuralsList from '../../MuralsList/MuralsList';
import MuralsMap from '../../MuralsMap/MuralsMap';
import MuralView from '../../MuralView/MuralView';

import './Home.scss';

class Home extends React.Component {
  state = {
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
  }

  getAndDisplayMurals = () => {
    muralRequests.getMurals()
      .then((murals) => {
        this.setState({ murals });
      })
      .catch(err => console.error('error with murals GET', err));
  }

  initializeSingleCardView = (muralId, selectedMural) => {
    const selected = muralId;
    this.setState({
      selected,
      selectedX: selectedMural.x,
      selectedY: selectedMural.y,
    });
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

  flyToLocation = (x, y) => {
    this.state.map.flyTo([y, x], 16);
    // console.log(this.map);
  }

  setMap = (map) => {
    this.setState({ map });
    // console.log(map);
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
