import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
// import PropTypes from 'prop-types';
// import authRequests from '../../helpers/data/authRequests';

const defaultMural = {
  title: '',
  address: '',
  artist: '',
  image: '',
  uid: '',
};

class ModalExample extends React.Component {
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
    });
  }

  titleChange = e => this.formFieldStringState('title', e);

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
              <button className="btn btn-danger">Save Listing</button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Save Mural</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;
