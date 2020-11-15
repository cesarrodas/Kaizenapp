import React from 'react';

import DOMPurify from 'dompurify';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { requestAuthenticateUser } from '../state/actions/actions';

class Login extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      username : '',
      password : ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount(){
    if(this.props.auth.loggedIn){
      this.props.history.push('/dashboard');
    }
  }
  
  handleSubmit(event){
    event.preventDefault();

    let input = {
      username: DOMPurify.sanitize(this.state.username),
      password: DOMPurify.sanitize(this.state.password)
    };

    this.props.requestAuthenticateUser( input.username, input.password);
  }

  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  render() {
    return (
      <div className="loginForm" >
        <h2>Log In</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Username:</label>
          <input type="text" name="username" onChange={ this.handleChange } /><br/>
          <label>Password:</label>
          <input type="password" name="password" onChange={ this.handleChange }/><br/>
          <div className="buttonConainer">
            <button className="confirmLoginButton" type="submit" value="Submit" >Log In</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = { requestAuthenticateUser }

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(Login);