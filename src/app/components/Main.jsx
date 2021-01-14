import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { 
  getUserData, 
  requestUserLogout,
  updateReplayPage
} from '../state/actions/actions';
import { connect } from 'react-redux';

import Navigation from './Navigation';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Replay from './Replay';

import NotFound from './NotFound';

import store from '../state/store';

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        store.getState().auth.loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

class Main extends React.Component {
  
  componentDidMount(){
    this.props.getUserData();
  }

  render() {

    return (
      <main>
        <Navigation auth={this.props.auth} logout={this.props.requestUserLogout} />
        <Switch>
          <Route path="/login" component={() => <Login auth={this.props.auth} />} />
          <Route path="/register" component={() => <Register auth={this.props.auth} />} />
          <PrivateRoute path="/dashboard">
            <Dashboard 
              data={this.props.data}
              processModal={this.props.processModal}
            />
          </PrivateRoute>
          <PrivateRoute path="/replays">
            <Replay
              replayPage={this.props.replayPage} 
              replays={this.props.replays}
              updateReplayPage={this.props.updateReplayPage}
            />
          </PrivateRoute>
          <Route path="/" component={() => <Home auth={this.props.auth} />} />
          {/* <Route path="*" component={NotFound}></Route> */}
        </Switch>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    data: state.data,
    processModal: state.processModal,
    replayPage: state.replayPage,
    replays: state.replays
  }
}

const mapDispatchToProps = {
  getUserData,
  updateReplayPage,
  requestUserLogout
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

