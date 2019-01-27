import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import authRequests from '../../helpers/data/authRequests';
import geoRequests from '../../helpers/data/geoRequests';

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
    };

    this.toggle = this.toggle.bind(this);
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempMural = { ...this.state.newMural };
    tempMural[name] = e.target.value;
    this.setState({ newMural: tempMural });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      newMural: defaultMural,
    });
  }

  titleChange = e => this.formFieldStringState('title', e);

  addressChange = e => this.formFieldStringState('address', e);

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

  render() {
    const { newMural } = this.state;
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
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
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  aria-describedby="addressHelp"
                  placeholder="500 Interstate Blvd, Nashville, TN"
                  value={newMural.address}
                  onChange={this.addressChange}
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
