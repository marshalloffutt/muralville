import React from 'react';
import authRequests from '../../helpers/data/authRequests';
import './MuralView.scss';

class MuralView extends React.Component {
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
            <button className="btn btn-warning m-2">Edit</button>
            <button className="btn btn-danger m-2">Delete</button>
            <button className="btn btn-primary m-2">Back to List</button>
          </div>
        );
      } return <button className="btn btn-primary m-2">Back to List</button>;
    };

    return (
      <div className='MuralView container'>
        <div className="container py-3">
          <div className="card">
            <div className="row ">
              <div className="col-md-4">
                  <img
                    src={mural.image}
                    className="w-100"
                    alt="mural"
                  />
              </div>
              <div className="col-md-8 px-3">
                  <div className="card-block px-3">
                    <h2 className="card-title">{mural.title}</h2>
                    <h5 className="card-text">{mural.artist}</h5>
                    <h5 className="card-text">{mural.address}</h5>
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
