import React from 'react';

import { connect } from 'react-redux';
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
      <div>
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" onChange={this.handleChange}/>
          </label>
          <label>
            Email:
            <input type="email" name="email" onChange={this.handleChange}/>
          </label>
          <label>
            Password:
            <input type="password" name="password" onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = { requestRegisterUser }

export default connect(null, mapDispatchToProps)(Register);