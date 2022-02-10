
import React from 'react';
import { NativeRouter, Switch, Route, BackButton} from 'react-router-native';

import WelcomePage from './welcome_page';
import SignUp from './SignUp';
import UserPage from './UserPage';
import SignUpChef from './SignUpChef';
import ChefPage from './ChefPage';
import ChefPageUpdate from './ChefPageUpdate';
import HomePage from './HomePage';
import Search from './search';

import { View } from 'react-native';

export default class App extends React.Component {

 

  render() {
    return (
      <NativeRouter>
        <BackButton>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/SignUp' component={SignUp} />
            <Route exact path='/UserPage' component={UserPage} />
            <Route exact path='/SignUpChef' component={SignUpChef} />
            <Route exact path='/ChefPage' component={ChefPage} />
            <Route exact path='/ChefPageUpdate' component={ChefPageUpdate} />
            <Route exact path='/welcome_page' component={WelcomePage} />
            <Route exact path='/search' component={Search} />
          </Switch>
        </BackButton>
      </NativeRouter>
    );
  }
}
