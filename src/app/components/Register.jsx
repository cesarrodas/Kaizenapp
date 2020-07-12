import React from 'react';

class Register extends React.Component {
  render() {
    return (
      <div>
        <h2>Register</h2>
        <form>
          <label>
            Username:
            <input type="text" name="name" />
          </label>
          <label>
            Password:
            <input type="password" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Register;