import React from 'react';

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
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    if(this.props.auth.loggedIn){
      this.props.history.push('/dashboard');
    }
  }

  handleSubmit(event){
    // handle it here
    event.preventDefault();
    this.props.requestRegisterUser(this.state.username, this.state.password, this.state.email);
  }

  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  render() {
    return (
      <div className="registerForm">
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Username</label><br/>
            <input type="text" name="username" onChange={this.handleChange}/><br/>
          <label>Email</label><br/>
            <input type="email" name="email" onChange={this.handleChange}/><br/>
          <label>Password</label><br/>
            <input type="password" name="password" onChange={this.handleChange}/><br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = { requestRegisterUser }

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(Register);