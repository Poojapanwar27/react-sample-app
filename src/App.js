import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import Header from './containers/header';
import Login from './containers/login';
import Search from './containers/search';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App" data={this.props.data}>
          <div className="wrapper">       
              <Header />
              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/search" component={Search} />
              </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
