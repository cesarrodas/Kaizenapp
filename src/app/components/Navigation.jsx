import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
  render() {

    if(this.props.auth.loggedIn){
      return (
        <nav className="navigation">
          <a className="title" href="#" alt="kaizen logo">Kaizen</a>
          <ul>
            <li><a onClick={this.props.logout}>Logout</a></li>
          </ul>
        </nav>
      )
    } else {
      return (
        <nav className="navigation">
          <a className="title" href="#" alt="kaizen logo">Kaizen</a>
          <ul>
            <li><Link to="/login">Sign in</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
      );
    }
  }
}

export default Navigation;

