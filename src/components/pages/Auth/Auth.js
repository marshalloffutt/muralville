import React from 'react';
import { Button } from 'reactstrap';
import authRequests from '../../../helpers/data/authRequests';
import './Auth.scss';
import fullBrand from '../../../images/full_brand.png';

class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      this.props.history.push('/home');
    }).catch(err => console.error('there was an error in authenticating'));
  }

  render() {
    return (
      <div className="Auth">
          <img src={fullBrand} alt="text" className="logo"/>
          <Button outline color="danger" className="loginBtn" onClick={this.authenticateUser}>
            <i className="fab fa-google-plus-square fa-2x btnIcon"></i>
            <span className="btnText"> Sign in with Google</span>
          </Button>
        </div>
    );
  }
}

export default Auth;
