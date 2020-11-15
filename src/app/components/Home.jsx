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
      <div className="span12 home">
        {/* <picture className="bgImage">
          <img className="bgImage" srcSet="../dist/assets/bg.jpg" />
        </picture> */}
        <div className="home-content">
          <h1>Welcome to Kaizen</h1>
          <p>Kaizen helps you pursue a better you. Create processes and refine them with small experiments.</p>
          <button>Sign Up</button><button>Sign In</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);