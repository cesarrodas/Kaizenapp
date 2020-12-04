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
      password : '',
      error: '',
      usernameError: '',
      passwordError: ''
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

    let errors = false;

    if(!this.state.username){
      errors = true;
      this.setState({
        usernameError: 'Please enter your username'
      });
    }

    if(!this.state.password){
      errors = true;
      this.setState({
        passwordError: 'Please enter your password'
      });
    }

    if(errors) {
      return;
    }

    let input = {
      username: DOMPurify.sanitize(this.state.username),
      password: DOMPurify.sanitize(this.state.password)
    };

    this.props.requestAuthenticateUser( input.username, input.password);
  }

  handleChange(event){

    this.setState({
      [event.target.name] : event.target.value,
      [event.target.name + 'Error'] : ''
    });

  }

  render() {

    let error = this.props.auth.error ? <p className="errorLabel">Incorrect Username/Password combination</p> : null;
    let usernameError = this.state.usernameError ? 
      <p className="errorLabel">{this.state.usernameError}</p> : null;
    let passwordError = this.state.passwordError ?
      <p className="errorLabel">{this.state.passwordError}</p> : null;

    return (
      <div className="loginForm" >
        <h2>Log In</h2>
        <form onSubmit={this.handleSubmit}>
          { error }
          <label>Username:</label>
          { usernameError }
          <input type="text" name="username" onChange={ this.handleChange } /><br/>
          <label>Password:</label>
          { passwordError }
          <input type="password" name="password" onChange={ this.handleChange }/><br/><br/>
          <div className="buttonConainer">
            <button className="confirmLoginButton" type="submit" value="Submit" >Log In</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = { requestAuthenticateUser }

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Login);