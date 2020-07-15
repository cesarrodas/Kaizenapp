import React from 'react';

import { connect } from 'react-redux'
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
      <div>
        <h2>Log In</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" onChange={ this.handleChange } />
          </label>
          <label>
            Password:
            <input type="password" name="password" onChange={ this.handleChange }/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = { requestAuthenticateUser }

export default connect(
  null,
  mapDispatchToProps
)(Login)