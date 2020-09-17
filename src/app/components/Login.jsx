import React from 'react';

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

  componentDidUpdate(prevProps){
    if(prevProps.auth.loggedIn === false && this.props.auth.loggedIn === true){
      this.props.history.push('/dashboard');
    }
  }
  
  handleSubmit(event){
    console.log("A user login was submitted: ", this.state);
    //alert('A user login was submitted: ' + this.state);
    event.preventDefault();
    this.props.requestAuthenticateUser(this.state.username, this.state.password);
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
          <label>Username:</label><br/>
          <input type="text" name="username" onChange={ this.handleChange } /><br/>
          <label>Password:</label><br/>
          <input type="password" name="password" onChange={ this.handleChange }/><br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = { requestAuthenticateUser }

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Login);