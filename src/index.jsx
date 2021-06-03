import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './Auth/PrivateRoute';
import { AuthProvider } from './Auth/AuthContext';
import { Home } from './Home';
import { Profile } from './Profile';
import { Login } from './Login';
import { Collection } from './Collection';
import { Game } from './Game';
import { TopWinners } from './TopWinners';
import { UpdateProfile } from './UpdateProfile';
import { Signup } from './Signup';
import { ForgotPassword } from './ForgotPassword';
import { Topbar } from './Topbar';
import { SignupAnonymous } from './SignupAnonymous';
import { SetUser } from './SetUser';
import { CollectionItem } from './CollectionItem';
import './style.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Topbar></Topbar>
        <main className="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/set-user" component={SetUser} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/signup-anonymous" component={SignupAnonymous} />
            <Route exact path="/top-winners" component={TopWinners} />
            <PrivateRoute exact path="/game" component={Game} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute
              exact
              path="/update-profile"
              component={UpdateProfile}
            />
            <PrivateRoute exact path="/collection" component={Collection} />
            <PrivateRoute
              exact
              path="/collection-item/:level/:index"
              component={CollectionItem}
            />
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
