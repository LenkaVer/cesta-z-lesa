import React, { useState } from 'react';
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
import { Menu } from './Menu';
import { SignupAnonymous } from './SignupAnonymous';
import { SetUser } from './SetUser';
import { Credits } from './Credits';
import { CollectionItem } from './CollectionItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './style.css';

function App() {
  const [menuActive, setMenuActive] = useState(false);
  return (
    <AuthProvider>
      <Router>
        <main className="main overflow">
          {menuActive ? (
            <Menu setMenuActive={setMenuActive} />
          ) : (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/set-user" component={SetUser} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <Route
                exact
                path="/signup-anonymous"
                component={SignupAnonymous}
              />
              <Route exact path="/top-winners" component={TopWinners} />
              <Route exact path="/credits" component={Credits} />
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
          )}
          <button
            className="btn-navigation"
            onClick={() => setMenuActive(!menuActive)}
          >
            <FontAwesomeIcon icon={faBars} size="3x" />
          </button>
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
