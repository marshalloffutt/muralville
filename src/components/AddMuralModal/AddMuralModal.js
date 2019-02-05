import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import PropTypes from 'prop-types';
import authRequests from '../../helpers/data/authRequests';
import geoRequests from '../../helpers/data/geoRequests';
import bingRequests from '../../helpers/data/bingRequests';
import './AddMuralModal.scss';

const defaultMural = {
  title: '',
  address: '',
  artist: '',
  x: '',
  y: '',
  image: '',
  uid: '',
};

class AddMuralModal extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      newMural: defaultMural,
      isLoading: false,
      suggestResults: [],
    };

    this.toggle = this.toggle.bind(this);
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempMural = { ...this.state.newMural };
    tempMural[name] = e.target.value;
    this.setState({ newMural: tempMural });
  }

  addressFieldStringState = (name, selected) => {
    const address = selected[0];
    const tempMural = { ...this.state.newMural };
    tempMural[name] = address;
    this.setState({ newMural: tempMural });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      newMural: defaultMural,
    });
  }

  titleChange = e => this.formFieldStringState('title', e);

  addressChange = selected => this.addressFieldStringState('address', selected);

  artistChange = e => this.formFieldStringState('artist', e);

  imageChange = e => this.formFieldStringState('image', e);

  formSubmit = () => new Promise((resolve, reject) => {
    const { onSubmit } = this.props;
    const myMural = { ...this.state.newMural };
    geoRequests.getXandY(myMural.address)
      .then((stuff) => {
        const finalMural = { ...myMural };
        const { x, y } = stuff;
        finalMural.x = x;
        finalMural.y = y;
        finalMural.uid = authRequests.getCurrentUid();
        resolve(finalMural);
        onSubmit(finalMural);
      })
      .catch(err => reject(err));
    this.setState({ newMural: defaultMural });
  });

  typeAheadEvent = (e) => {
    this.setState({ isLoading: true });
    const query = e;
    bingRequests.getSuggestion(query)
      .then((results) => {
        this.setState({
          isLoading: false,
          suggestResults: results[0],
        });
      })
      .catch(error => console.error('Error in getting suggestions', error));
  }

  render() {
    const { newMural, isLoading, suggestResults } = this.state;
    return (
      <div>
        <Button color="danger" className="add-button" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>New Mural</ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  aria-describedby="titleHelp"
                  placeholder="Mural Title"
                  value={newMural.title}
                  onChange={this.titleChange}
                />
              </div>
              <div className="form-group">
                <label className="typeahead-label" htmlFor="address">Address:</label>
                <AsyncTypeahead
                  className="form-input"
                  ref={(typeahead) => {
                    this.typeahead = typeahead;
                  }}
                  id="address"
                  placeholder="500 Interstate Blvd, Nashville, TN"
                  options={suggestResults}
                  isLoading={isLoading}
                  onSearch={this.typeAheadEvent}
                  onChange={(selected) => {
                    this.addressChange(selected);
                  }}
                  value={newMural.address}
                />
              </div>
              <div className="form-group">
                <label htmlFor="artist">Artist:</label>
                <input
                  type="text"
                  className="form-control"
                  id="artist"
                  aria-describedby="artistHelp"
                  placeholder="Picasso"
                  value={newMural.artist}
                  onChange={this.artistChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image Url:</label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  aria-describedby="imageHelp"
                  placeholder="https://github.com/marshalloffutt/muralville/blob/master/src/images/temp_mural.png"
                  value={newMural.image}
                  onChange={this.imageChange}
                />
              </div>
              <Button color="primary" onClick={(e) => {
                this.toggle();
                this.formSubmit();
                e.preventDefault();
              }}>Save Mural</Button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AddMuralModal;
