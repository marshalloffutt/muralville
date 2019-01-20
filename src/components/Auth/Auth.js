import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import authRequests from '../../helpers/data/authRequests';
import './Auth.scss';

class Auth extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.func,
  }

  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      this.props.isAuthenticated();
    }).catch(err => console.error('there was an error'));
  }

  render() {
    return (
      <Button outline color="danger" className="loginBtn" onClick={this.authenticateUser}>
        <i className="fab fa-google-plus-square fa-2x btnIcon"></i>
        <span className="btnText"> Sign in with Google</span>
      </Button>
    );
  }
}

export default Auth;
