import React from 'react';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {

  componentDidMount(){
    if(this.props.auth.loggedIn){
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="span12">
        <h1>Welcome to Kaizen</h1>
      </div>
    );
  }
}

export default withRouter(Home);