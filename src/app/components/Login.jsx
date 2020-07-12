import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <h2>Log In</h2>
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

export default Login;