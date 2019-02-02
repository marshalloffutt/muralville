import React from 'react';
import { Button } from 'reactstrap';
import authRequests from '../../../helpers/data/authRequests';
import userRequests from '../../../helpers/data/userRequests';
import './Auth.scss';
import fullBrand from '../../../images/full_brand.png';

class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate()
      .then((results) => {
        console.log(results); // look for results.user.uid
        userRequests.getUserByUid(results.user.uid)
          .then((userObject) => {
            // console.log the userobject
            if (!userObject) {
              const newUserObject = {
                userName: `${results.user.displayName}`,
                uid: `${results.user.uid}`,
              };
              console.log(newUserObject);
            }
          });
        this.props.history.push('/home');
      }).catch(err => console.error('error in authenticating', err));
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
