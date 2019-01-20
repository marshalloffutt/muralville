import React from 'react';
import firebase from 'firebase/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import connection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import './App.scss';

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  isAuthenticated = () => {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    if (!authed) {
      return (
        <div className="App">
          <Auth />
        </div>
      );
    }
    return (
      <div className="App">
        <h1>You're in!!!</h1>
      </div>
    );
  }
}

export default App;
