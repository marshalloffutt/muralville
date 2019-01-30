import React from 'react';
import PropTypes from 'prop-types';
import EditMuralModal from '../EditMuralModal/EditMuralModal';
import authRequests from '../../helpers/data/authRequests';
import './MuralView.scss';
import muralShape from '../../helpers/props/muralShape';

class MuralView extends React.Component {
  static propTypes = {
    mural: muralShape,
    goToHome: PropTypes.func,
    deleteMural: PropTypes.func,
    passMuralToEdit: PropTypes.func,
    flyToLocation: PropTypes.func,
  };

  deleteEvent = (e) => {
    e.preventDefault();
    const muralId = this.props.selected;
    const { deleteMural } = this.props;
    deleteMural(muralId);
  }

  goBack = (e) => {
    e.preventDefault();
    const { goToHome } = this.props;
    goToHome();
  };

  zoomInEvent = (e) => {
    const { flyToLocation, selectedX, selectedY } = this.props;
    flyToLocation(selectedX, selectedY);
  }

  render() {
    const uid = authRequests.getCurrentUid();

    const mural = this.props.murals
      .find((match) => {
        if (match.id === this.props.selected) {
          return match;
        } return '';
      });

    const makeButtons = () => {
      if (mural.uid === uid) {
        return (
          <div className="container p-3">
            <EditMuralModal
              buttonLabel = "Edit"
              onSubmit={this.props.onSubmit}
              mural={mural}
              editEvent={this.props.editEvent}
              passMuralToEdit={this.props.passMuralToEdit}
            />
            <button className="btn btn-danger m-2 delete-button" onClick={this.deleteEvent}>Delete</button>
            <button className="btn btn-primary m-2 go-back-button" onClick={this.goBack}>Back to List</button>
          </div>
        );
      } return <button className="btn btn-primary m-2" onClick={this.goBack}>Back to List</button>;
    };

    return (
      <div className='MuralView container'>
        <div className="container py-3">
          <div className="card">
            <div className="row ">
              <div className="col-md-4">
                  <img
                    src={mural.image}
                    className="w-100 h-100 big-mural"
                    alt="mural"
                    onClick={this.zoomInEvent}
                  />
              </div>
              <div className="col-md-8 px-3">
                  <div className="card-block px-3">
                    <h2 className="card-title">{mural.title}</h2>
                    <h5 className="card-text">{mural.address}</h5>
                    <h5 className="card-text">Artist: {mural.artist}</h5>
                    {makeButtons()}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MuralView;
