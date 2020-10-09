import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { 
  getUserData, 
  requestUserLogout, 
  showProcessModal, 
  showProcessEditModal, 
  updateProcessForm,
  showProcessDeleteModal,
  updateProcessDeletable,
  requestProcessDelete
} from '../state/actions/actions';
import { connect } from 'react-redux';

import Navigation from './Navigation';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

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
    // something.
    console.log("hello");
    this.props.getUserData();
  }

  render() {
    return (
      <main>
        <Navigation auth={this.props.auth} logout={this.props.requestUserLogout} />
        <Switch>
          <Route path="/" exact component={() => <Home auth={this.props.auth} />} />
          <Route path="/login" component={() => <Login auth={this.props.auth} />} />
          <Route path="/register" component={() => <Register auth={this.props.auth} />} />
          <PrivateRoute path="/dashboard">
            <Dashboard 
              data={this.props.data} 
              appStatus={this.props.appStatus}
              showProcessModal={this.props.showProcessModal}
              showProcessEditModal={this.props.showProcessEditModal}
              showProcessDeleteModal={this.props.showProcessDeleteModal}
              updateProcessForm={this.props.updateProcessForm}
              updateProcessDeletable={this.props.updateProcessDeletable}
              requestProcessDelete={this.props.requestProcessDelete}
            />
          </PrivateRoute>
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    data: state.data,
    appStatus: state.appStatus
  }
}

const mapDispatchToProps = {
  getUserData, 
  requestUserLogout, 
  showProcessModal, 
  showProcessEditModal,
  showProcessDeleteModal,
  updateProcessForm,
  updateProcessDeletable,
  requestProcessDelete
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

