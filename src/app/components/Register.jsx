import React from 'react';
import DOMPurify from 'dompurify';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestRegisterUser } from '../state/actions/actions';

class Register extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      usernameError: '',
      emailError: '',
      passwordError: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
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
        usernameError: 'Please choose a username'
      });
    }

    if(!this.state.email){
      errors = true;
      this.setState({
        emailError: 'Please enter an email'
      });
    }

    if (this.state.email && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email) == false){
      errors = true;
      this.setState({
        emailError: 'Please enter a valid email'
      });
    }

    if(!this.state.password){
      errors = true;
      this.setState({
        passwordError: 'Please choose a password'
      });
    }

    if(errors) {
      return;
    }
    
    let input = {
      username: DOMPurify.sanitize(this.state.username),
      password: DOMPurify.sanitize(this.state.password),
      email: DOMPurify.sanitize(this.state.email)
    }

    this.props.requestRegisterUser(input.username, input.password, input.email);
  }

  handleChange(event){

    this.setState({
      [event.target.name] : event.target.value,
      [event.target.name + 'Error'] : ''
    });
  }

  errorHandler(){
    let error = null;
    if(this.props.registration.error){
      if(this.props.registration.error.hasOwnProperty("message")){
        error = <p className="errorLabel">{this.props.registration.error.message}</p>
      }
      if(this.props.registration.error.hasOwnProperty("error") && 
        this.props.registration.error.error.hasOwnProperty("message")){
        error = <p className="errorLabel">{this.props.registration.error.error.message}</p>
      }
    }
    return error;
  };

  render() {

    let registrationError = this.errorHandler();

    let usernameError = this.state.usernameError ? 
      <p className="errorLabel">{this.state.usernameError}</p> : null;

    let emailError = this.state.emailError ? 
      <p className="errorLabel">{this.state.emailError}</p> : null;

    let passwordError = this.state.passwordError ? 
      <p className="errorLabel">{this.state.passwordError}</p> : null;

    return (
      <div className="registerFormContainer">
        <h2>Register</h2>
        <form className="registerForm" onSubmit={this.handleSubmit}>
          { registrationError }
          <label>Username</label>
            { usernameError }
            <input type="text" name="username" onChange={this.handleChange}/><br/>
          <label>Email</label>
            { emailError }
            <input type="email" name="email" onChange={this.handleChange}/><br/>
          <label>Password</label>
            { passwordError }
            <input type="password" name="password" onChange={this.handleChange}/><br/><br/>
          <input className="confirmRegisterButton" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    registration: state.registration
  }
}

const mapDispatchToProps = { requestRegisterUser }

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Register);