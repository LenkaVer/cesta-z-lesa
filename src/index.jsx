import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './Auth/PrivateRoute';
import { AuthProvider } from './Auth/AuthContext';
import { Home } from './Home';
import { Profile } from './Profile';
import { Login } from './Login';
import { Game } from './Game';
import { UpdateProfile } from './UpdateProfile';
import { Signup } from './Signup';
import { ForgotPassword } from './ForgotPassword';
import { Topbar } from './Topbar';
import { SignupAnonymous } from './SignupAnonymous';
import { SetUser } from './SetUser';
import './style.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Topbar></Topbar>
        <main className="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/game" component={Game} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/set-user" component={SetUser} />
            <Route path="/signup" component={Signup} />
            <Route path="/signup-anonymous" component={SignupAnonymous} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </main>
      </Router>
    </AuthProvider>
  );
}

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
);
