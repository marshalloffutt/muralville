import React from 'react';
import { Button } from 'reactstrap';
import './MuralView.scss';

class MuralView extends React.Component {
  render() {
    const selectedMural = this.props.selected;
    const mural = this.props.murals
      .find((thing) => {
        if (thing.id === selectedMural) {
          return thing;
        } return '';
      });
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
                    <Button
                      tag="a"
                      color="success"
                      size="large"
                      href="http://reactstrap.github.io"
                      target="_blank"
                    >
                      Back to list
                    </Button>
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
