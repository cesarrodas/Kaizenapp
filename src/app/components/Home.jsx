import React from 'react';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {

  constructor(){
    super();
    this.signUpRedirect = this.signUpRedirect.bind(this);
    this.loginRedirect = this.loginRedirect.bind(this);
  }

  componentDidMount(){
    if(this.props.auth.loggedIn){
      this.props.history.push('/dashboard');
    }
  }

  signUpRedirect(){
    this.props.history.push('/register');
  }

  loginRedirect(){
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="span12 home">
        <div className="home-content">
          <div className="header">Kaizen</div>
          <p className="info">Kaizen helps you pursue a better you. Create processes and refine them with small experiments.</p>
          <div className="actionContainer">
            <button className="frontLoginButton" onClick={this.loginRedirect}>Sign In</button>
            <button className="frontSignupButton" onClick={this.signUpRedirect}>Register</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);