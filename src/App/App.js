import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import connection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import './App.scss';

class App extends React.Component {
  componentDidMount() {
    connection();
  }

  render() {
    return (
      <div className="Auth">
        <Auth />
      </div>
    );
  }
}

export default App;
