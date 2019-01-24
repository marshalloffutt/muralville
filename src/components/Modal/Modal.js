import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import authRequests from '../../helpers/data/authRequests';
import muralRequests from '../../helpers/data/muralRequests';

const defaultMural = {
  title: '',
  address: '',
  artist: '',
  image: '',
  uid: '',
};

class ModalExample extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isEditing: PropTypes.bool,
    editId: PropTypes.string,
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

  formSubmit = () => {
    const { onSubmit } = this.props;
    const myMural = { ...this.state.newMural };
    myMural.uid = authRequests.getCurrentUid();
    onSubmit(myMural);
    this.setState({ newMural: defaultMural });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      muralRequests.getSingleMural(editId)
        .then((mural) => {
          this.setState({ newMural: mural.data });
        })
        .catch(err => console.error('error with getting single mural', err));
    }
  }

  render() {
    const { newMural } = this.state;
    const { isEditing } = this.props;
    const title = () => {
      if (isEditing) {
        return <ModalHeader toggle={this.toggle}>Edit Mural</ModalHeader>;
      }
      return <ModalHeader toggle={this.toggle}>New Mural</ModalHeader>;
    };
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          {title()}
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

export default ModalExample;
