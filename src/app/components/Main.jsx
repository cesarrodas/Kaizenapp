import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import { checkUserLogged, requestUserLogout } from '../state/actions/actions';
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

// export const Main = () => (
//   <main>
//     <Navigation />
//     <Switch>
//       <Route path="/" exact component={Home} />
//       <Route path="/login" component={Login} />
//       <Route path="/register" component={Register} />
//       <PrivateRoute path="/dashboard">
//             <Dashboard />
//       </PrivateRoute>
//       <Route path="*" component={NotFound}></Route>
//     </Switch>
//   </main>
// );

class Main extends React.Component {
  
  componentDidMount(){
    // something.
    console.log("hello");
    this.props.checkUserLogged();
  }

  render() {
    return (
      <main>
        <Navigation auth={this.props.auth} logout={this.props.requestUserLogout} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/dashboard">
                <Dashboard />
          </PrivateRoute>
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = { checkUserLogged, requestUserLogout }

export default connect(mapStateToProps, mapDispatchToProps)(Main);
